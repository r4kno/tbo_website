from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import ssl
import urllib3
import google.generativeai as genai
from datetime import datetime
from datetime import timedelta

# Disable SSL warnings if needed
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Gemini API
genai.configure(api_key="AIzaSyBje8mwHMl268z1ZRSBUeO2PrRpii5f53Y")
model = genai.GenerativeModel("gemini-1.5-flash")

def get_custom_session():
    """
    Create a custom requests session with more robust connection settings
    """
    session = requests.Session()
    
    # Disable SSL verification (use cautiously)
    session.verify = False
    
    # Custom adapter with extended timeout and retry strategy
    adapter = requests.adapters.HTTPAdapter(
        pool_connections=10,
        pool_maxsize=10,
        max_retries=urllib3.Retry(
            total=3,
            backoff_factor=0.1,
            status_forcelist=[500, 502, 503, 504]
        )
    )
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    
    return session


@app.route('/proxy-api', methods=['POST'])
def proxy_api():
    """
    Proxy route to handle API requests and responses with enhanced error handling
    """
    try:
        # Get data from frontend request
        frontend_data = request.json
        # print("Frontend Request Data:", json.dumps(frontend_data, indent=2))
        
        # Configuration for TBO API
        EXTERNAL_API_URL = "http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search"
        
        # Custom headers with more comprehensive settings
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
        
        # Create a custom session
        session = get_custom_session()
        
        # Make request to external API with enhanced settings
        print("Attempting to connect to TBO API...")
        external_response = session.post(
            EXTERNAL_API_URL, 
            headers=headers, 
            json=frontend_data,
            timeout=(20, 40),
            verify=False
        )
        
        # Check if request was successful
        external_response.raise_for_status()
        
        # Parse the entire response
        api_response = external_response.json()
        # print("Raw API Response:", json.dumps(api_response, indent=2))
        
        # Return the first result to frontend
        return jsonify(api_response['Response']['Results'][0][0]), 200
    
    except requests.exceptions.ConnectTimeout:
        print("Connection Timeout: Could not connect to the API")
        return jsonify({
            "error": "Connection timeout",
            "details": "Unable to establish connection with the API"
        }), 504
    
    except requests.exceptions.ReadTimeout:
        print("Read Timeout: API took too long to respond")
        return jsonify({
            "error": "Read timeout",
            "details": "API did not respond within the expected time"
        }), 504
    
    except requests.RequestException as e:
        print("Request Exception Details:", {
            "error": str(e),
            "type": type(e).__name__,
            "args": e.args
        })
        return jsonify({
            "error": "External API request failed",
            "details": str(e),
            "request_data": frontend_data
        }), 500
    
    except Exception as e:
        print("Unexpected Error:", str(e))
        return jsonify({
            "error": "Unexpected error occurred",
            "details": str(e)
        }), 500


# TBO API Configuration
TBO_API_URL = "https://SightseeingBE.tektravels.com/SightseeingService.svc/rest/Search"

def get_activities_from_tbo(search_params):
    """Make request to TBO API to get activities"""
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    try:
        response = requests.post(
            TBO_API_URL,
            headers=headers,
            json=search_params,
            verify=False
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        raise Exception(f"TBO API request failed: {str(e)}")

def extract_activity_details(activity):
    """Extract relevant details from a single activity"""
    return {
        "name": activity.get("SightseeingName", ""),
        "city": activity.get("CityName", ""),
        "duration": activity.get("DurationDescription", [{}])[0].get("TotalDuration", ""),
        "description": activity.get("TourDescription", ""),
        "price": activity.get("Price", {}).get("OfferedPriceRoundedOff", 0),
        "inclusions": [
            inc.strip() 
            for inc in activity.get("TourDescription", "").split("Inclusions:")[1].split("Exclusions:")[0].split("<br>")
            if inc.strip()
        ] if "Inclusions:" in activity.get("TourDescription", "") else []
    }



def generate_itinerary_prompt(activities, num_days, from_date):
    """
    Generate a prompt for Gemini API based on activities and include proper date formatting.
    
    Args:
        activities (list): List of activities with details.
        num_days (int): Number of days for the itinerary.
        from_date (datetime): The start date of the itinerary.
    
    Returns:
        str: A formatted prompt for the Gemini API.
    """
    # Format the start date as a string
    start_date_str = from_date.strftime("%Y-%m-%d")
    
    # Generate the activities text for the prompt
    activities_text = "\n".join([
        f"Activity: {act['name']}\n"
        f"Duration: {act['duration']}\n"
        f"Price: {act['price']} INR\n"
        f"Inclusions: {', '.join(act['inclusions'])}\n"
        for act in activities
    ])

    # Generate the prompt with proper date formatting
    return f"""
    Based on these available activities, create a {num_days}-day itinerary starting from {start_date_str}:

    {activities_text}

    Create a detailed {num_days}-day itinerary that optimizes time and experience. Make sure to spread activities across all {num_days} days. Return the response in this exact JSON format:

    {{
        "itinerary": [
            {{
                "day": 1,
                "activities": [
                    {{
                        "time": "{start_date_str}T09:00:00",  // Use ISO format for time
                        "activity": "Name of activity",
                        "duration": "Duration in hours",
                        "cost": "Cost in INR",
                        "notes": "Any special instructions or tips"
                    }},
                    // Add more activities for Day 1
                ]
            }},
            {{
                "day": 2,
                "activities": [
                    {{
                        "time": "{(from_date + timedelta(days=1)).strftime('%Y-%m-%d')}T10:00:00",  // Increment date for Day 2
                        "activity": "Name of activity",
                        "duration": "Duration in hours",
                        "cost": "Cost in INR",
                        "notes": "Any special instructions or tips"
                    }},
                    // Add more activities for Day 2
                ]
            }},
            // Add more days as needed
        ]
    }}
    """
@app.route('/create-itinerary', methods=['POST'])
def create_itinerary():

    # After getting search_params but before generating prompt
    
    try:
        # Get search parameters from frontend
        search_params = request.json
        if not search_params:
            return jsonify({"error": "No search parameters provided"}), 400
        from_date = datetime.strptime(search_params["FromDate"].split('T')[0], '%Y-%m-%d')
        to_date = datetime.strptime(search_params["ToDate"].split('T')[0], '%Y-%m-%d')
        num_days = (to_date - from_date).days + 1  # +1 to include both start and end dates

        # Validate required fields
        required_fields = ["CityId", "CountryCode", "FromDate", "ToDate"]
        missing_fields = [field for field in required_fields if field not in search_params]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

        # Get activities from TBO API
        try:
            tbo_response = get_activities_from_tbo(search_params)
        except Exception as e:
            return jsonify({"error": f"Failed to fetch activities: {str(e)}"}), 500

        # Extract activities
        activities = []
        if ("Response" in tbo_response and 
            "SightseeingSearchResults" in tbo_response["Response"]):
            for activity in tbo_response["Response"]["SightseeingSearchResults"]:
                try:
                    activity_details = extract_activity_details(activity)
                    activities.append(activity_details)
                except Exception as e:
                    print(f"Error processing activity: {str(e)}")
                    continue

        if not activities:
            return jsonify({"error": "No activities found for the given parameters"}), 404

        # Generate itinerary using Gemini
        prompt = generate_itinerary_prompt(activities, num_days, from_date)
        try:
            response = model.generate_content(prompt)
            
            # Try to parse the response as JSON
            try:
                itinerary = json.loads(response.text)
            except json.JSONDecodeError:
                # If that fails, try to find and parse just the JSON part
                json_start = response.text.find('{')
                json_end = response.text.rfind('}') + 1
                if json_start >= 0 and json_end > json_start:
                    json_str = response.text[json_start:json_end]
                    itinerary = json.loads(json_str)
                else:
                    raise ValueError("Could not find valid JSON in response")

            return jsonify(itinerary), 200

        except Exception as e:
            return jsonify({
                "error": "Failed to generate itinerary",
                "details": str(e)
            }), 500

    except Exception as e:
        return jsonify({
            "error": "Server error",
            "details": str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
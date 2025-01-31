from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import ssl
import urllib3
import google.generativeai as genai
from datetime import datetime

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

def extract_sightseeing_info(response_data):
    """Extract relevant information from the TBO API response"""
    sightseeing_data = []
    
    try:
        results = response_data["Response"]["SightseeingSearchResults"]
        for activity in results:
            sightseeing_info = {
                "name": activity.get("SightseeingName", ""),
                "city": activity.get("CityName", ""),
                "date": activity.get("FromDate", ""),
                "duration": activity["DurationDescription"][0]["TotalDuration"] if activity.get("DurationDescription") else "",
                "description": activity.get("TourDescription", ""),
                "price": activity["Price"]["OfferedPriceRoundedOff"] if activity.get("Price") else 0,
                "image_urls": activity.get("ImageList", []),
                "inclusions": extract_inclusions(activity.get("TourDescription", ""))
            }
            sightseeing_data.append(sightseeing_info)
    except Exception as e:
        raise ValueError(f"Error extracting sightseeing info: {str(e)}")
    
    return sightseeing_data

def extract_inclusions(description):
    """Extract inclusions from tour description"""
    inclusions = []
    if "Inclusions:" in description:
        inclusion_text = description.split("Inclusions:")[1].split("Exclusions:")[0]
        inclusions = [inc.strip() for inc in inclusion_text.split("<br>") if inc.strip()]
    return inclusions

def create_prompt(sightseeing_data):
    """Create a structured prompt for the LLM based on sightseeing data"""
    activities_text = "\n".join([
        f"- {activity['name']}: {activity['price']} INR\n  Duration: {activity['duration']}\n  Includes: {', '.join(activity['inclusions'])}"
        for activity in sightseeing_data
    ])
    
    prompt = f"""
    Based on the following available activities in {sightseeing_data[0]['city']}:
    
    {activities_text}
    
    Create a detailed itinerary that:
    1. Organizes these activities in a logical sequence
    2. Suggests additional complementary activities and dining options
    3. Considers travel time between locations
    
    Return the response in the following JSON format:
    {{
        "destination": "{sightseeing_data[0]['city']}",
        "activities": [
            {{
                "time": "time slot (am/pm)",
                "activity": "activity name",
                "duration": "expected duration",
                "cost": cost_in_INR,
                "notes": "additional information or tips"
            }}
        ],
        "dining_suggestions": [
            {{
                "meal": "meal type",
                "restaurant": "restaurant name",
                "cuisine": "cuisine type",
                "estimated_cost": cost_in_INR
            }}
        ],
        "total_cost": total_cost_in_INR,
        "important_notes": ["list of important notes or tips"]
    }}
    """
    return prompt

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

@app.route('/process-sightseeing', methods=['POST'])
def process_sightseeing():
    try:
        # Get input data from request
        data = request.get_json()
        # print("Received Frontend Data:", json.dumps(data, indent=2))  # Print frontend data

        # Validate response structure
        if "Response" not in data or "SightseeingSearchResults" not in data["Response"]:
            return jsonify({
                "error": "Invalid data format",
                "details": "Missing required fields in response"
            }), 400

        # Extract sightseeing information
        sightseeing_data = extract_sightseeing_info(data)
        # print("Extracted Sightseeing Data:", json.dumps(sightseeing_data, indent=2))  # Print extracted data

        if not sightseeing_data:
            return jsonify({
                "error": "No sightseeing data found",
                "details": "Could not extract activity information"
            }), 400

        # Create prompt for the LLM
        prompt = create_prompt(sightseeing_data)
        print("Generated Prompt for Gemini API:", prompt)  # Print the prompt

        # Generate itinerary using Gemini
        response = model.generate_content(prompt)
        print("Gemini API Response:", response.text)  # Print the raw response

        # Parse the response
        # try:
        #     itinerary = eval(response.text)
        #     print("Parsed Itinerary:", json.dumps(itinerary, indent=2))  # Print the parsed itinerary
        # except Exception as e:
        #     print("Error Parsing Gemini Response:", str(e))  # Print parsing errors
        #     return jsonify({
        #         "error": "Failed to parse LLM response",
        #         "details": str(e)
        #     }), 500

        # Add original activity details to response
        itinerary = response.text
        print("Final Response to Frontend:", json.dumps(itinerary, indent=2))  # Print the final response
        return jsonify(itinerary), 200

    except ValueError as e:
        return jsonify({
            "error": "Data processing error",
            "details": str(e)
        }), 400

    except Exception as e:
        return jsonify({
            "error": "Server error",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
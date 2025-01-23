from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def process_external_api_response(response):
    """
    Process and select the most appropriate response.
    
    Args:
        response (dict): Response from the TBO API
    
    Returns:
        dict: Processed response to send to frontend
    """
    print("Full API Response:", json.dumps(response, indent=2))
    
    # Check if the response contains flight results
    if not response:
        return {"error": "No flights found", "details": "Empty response from TBO API"}
    
    # Extract and process flight results
    try:
        # Adjust these keys based on the actual TBO API response structure
        flights = response.get('Results', [])
        
        if not flights:
            return {"error": "No flights available", "details": "No results in API response"}
        
        return {
            "selected_response": flights[0] if flights else None,
            "total_flights": len(flights)
        }
    
    except Exception as e:
        return {
            "error": "Error processing API response",
            "details": str(e)
        }

@app.route('/proxy-api', methods=['POST'])
def proxy_api():
    """
    Proxy route to handle API requests and responses
    """
    try:
        # Get data from frontend request
        frontend_data = request.json
        print("Frontend Request Data:", json.dumps(frontend_data, indent=2))
        
        # Configuration for TBO API
        EXTERNAL_API_URL = "https://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search"
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "TokenId": frontend_data.get('TokenId')  # Add TokenId from frontend
        }
        
        # Make request to external API
        print("Sending request to TBO API...")
        external_response = requests.post(
            EXTERNAL_API_URL, 
            headers=headers, 
            json=frontend_data,
            timeout=(5, 30),  # (connection timeout, read timeout)
            verify=False  # Only if SSL verification fails
        )
        
        # Check if request was successful
        external_response.raise_for_status()
        
        # Parse the entire response
        api_response = external_response.json()
        print("Raw API Response:", json.dumps(api_response, indent=2))
        
        # Process and select best response
        processed_response = process_external_api_response(api_response)
        
        # Return processed response to frontend
        return jsonify(processed_response), 200
    
    except requests.RequestException as e:
        # Detailed error logging for request exceptions
        print("Request Exception:", str(e))
        return jsonify({
            "error": "External API request failed",
            "details": str(e),
            "request_data": frontend_data
        }), 500
    
    except json.JSONDecodeError as e:
        # Handle JSON parsing errors
        print("JSON Decode Error:", str(e))
        return jsonify({
            "error": "Failed to parse API response",
            "details": str(e)
        }), 500
    
    except Exception as e:
        # Catch-all for unexpected errors
        print("Unexpected Error:", str(e))
        return jsonify({
            "error": "Unexpected error occurred",
            "details": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """
    Simple health check endpoint
    """
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, port=5000)
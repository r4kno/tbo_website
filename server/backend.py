from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import ssl
import urllib3

# Disable SSL warnings if needed
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_custom_session():
    """
    Create a custom requests session with more robust connection settings
    """
    session = requests.Session()
    
    # Disable SSL verification (use cautiously)
    session.verify = False
    
    # Custom adapter with extended timeout and retry strategy
    adapter = requests.adapters.HTTPAdapter(
        pool_connections=10,  # Number of connection pools
        pool_maxsize=10,      # Max connections per pool
        max_retries=urllib3.Retry(
            total=3,           # Total number of retries
            backoff_factor=0.1,# Delay between retries
            status_forcelist=[500, 502, 503, 504]  # Retry on these status codes
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
        print("Frontend Request Data:", json.dumps(frontend_data, indent=2))
        
        # Configuration for TBO API
        EXTERNAL_API_URL = "http://api.tektravels.com/BookingEngineService_Air/AirService.svc/rest/Search"
        
        # Custom headers with more comprehensive settings
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            # Add any additional headers required by TBO API
            # "Authorization": "Bearer YOUR_TOKEN_IF_NEEDED",
        }
        
        # Create a custom session
        session = get_custom_session()
        
        # Make request to external API with enhanced settings
        print("Attempting to connect to TBO API...")
        external_response = session.post(
            EXTERNAL_API_URL, 
            headers=headers, 
            json=frontend_data,
            timeout=(20, 40),  # (connect timeout, read timeout)
            # If SSL verification is an issue
            verify=False
        )
        
        # Check if request was successful
        external_response.raise_for_status()
        
        # Parse the entire response
        api_response = external_response.json()
        print("Raw API Response:", json.dumps(api_response, indent=2))
        
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
        # Detailed error logging for request exceptions
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
        # Catch-all for unexpected errors
        print("Unexpected Error:", str(e))
        return jsonify({
            "error": "Unexpected error occurred",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, port=5000)
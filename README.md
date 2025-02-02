
# 🌍 Travel Trip Planner

The **Travel Trip Planner** is a modern web application designed to simplify the process of planning your trips. Featuring a **React + Vite** frontend for an intuitive user experience and a **Node.js + Express** backend powered by AI for personalized recommendations, this app brings your dream trip to life.

---

## ✨ Features

### Frontend:
- **Interactive User Interface**:
  - Input travel details like departure, return dates, budget, and more.
  - Responsive design ensures compatibility across devices.
- **Real-Time Updates**:
  - Instant feedback on input fields.
  - Enhanced with animations and tooltips for clarity.

### Backend:
- **AI-Powered Recommendations**:
  - Suggests flights, accommodations, and activities based on user input.
  - Built with OpenAI and Hugging Face Transformers for accurate predictions.
- **Dynamic Cost Estimation**:
  - Calculates total trip costs, including flights and accommodation.
  - Displays breakdown for user transparency.
- **Robust Validation**:
  - Ensures all required fields are properly filled before processing.
  - Handles edge cases and incomplete data gracefully.

---

## 🛠️ Getting Started
---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/r4kno/tbo_website.git
   cd tbo_website/client
   ```

2. Install dependencies:
   ```bash
   cd client
   npm install
   ```

3. Start the backend server:
   ```bash
   cd server
   python3 backend.py
   ```
   The backend will run at `http://localhost:5000`.

4. Start the frontend using Vite:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

---

## 📂 Project Structure

```
travel-trip-planner/
├── server/
│   ├── backend.py           # Backend made in python with flask
├── client/
│   ├── public/             # Static assets
│   ├── src/                # React components and logic
│   │   ├── App.jsx         # Main React app file
│   │   ├── components/     # Modular components
│   │   ├── styles/         # Styling files (CSS/SCSS)
│   └── vite.config.js      # Vite configuration
├── README.md               # Project documentation
```

---

## 🚀 Usage

### Planning a Trip:
1. Open the application in your browser.
2. Fill in details such as:
   - **From/To:** e.g., "Delhi to Goa"
   - **Departure/Return Dates:** Select from a calendar picker.
   - **Travel Class:** Economy, Business, or First Class.
   - **Budget:** Input an approximate budget for your trip.
3. Submit the form to get:
   - Flight suggestions with timings and prices.
   - Hotel options near your destination.
   - Total estimated cost of the trip.

---

## 🌐 Backend API Reference

**Endpoint**: `POST /plan-tour`

- **Request Body**:
  ```json
  {
      "fromTo": "Delhi to Goa",
      "departDate": "2025-02-01",
      "returnDate": "2025-02-07",
      "passengers": 2,
      "travelClass": "Economy",
      "budget": 15000
  }
  ```

- **Sample Response**:
  ```json
  {
      "message": "Tour planned successfully",
      "flight": "Indigo Airbus A320",
      "flightPrice": 6400,
      "flightDeparture": "2 Jan, Friday 12:00 pm from Delhi (DEL)",
      "flightArrival": "2 Jan, Friday 2:28 pm in Goa (GOI)",
      "hotel": "Goa Beach Resort",
      "hotelPrice": 5000,
      "totalPrice": 11400
  }
  ```

---

## 🛡️ Troubleshooting

- **Server Not Starting**:
  - Ensure `Node.js` is installed. Verify by running:
    ```bash
    node -v
    ```
- **Frontend Issues**:
  - Check the browser console for errors.
  - Verify that the backend server is running.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🌟 Acknowledgments

- [Vite](https://vitejs.dev/) for the frontend setup.
- [Express.js](https://expressjs.com/) for the backend framework.
- [OpenAI](https://openai.com/) and [Hugging Face](https://huggingface.co/) for AI integration.

---

### 🚀 Live Demo

Access the live demo [here](https://your-live-demo-url.com).

---

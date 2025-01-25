import React, { useState } from "react";
import { ArrowRight, Plane, Send } from "lucide-react";

const TourBookingForm = ({ onNext }) => {
  const theme = {
    fieldBg: "bg-gray-50",
    containerBg: "bg-white",
    containerText: "text-black",
    primary: "bg-blue-600",
    primaryHover: "hover:bg-blue-700",
    primaryText: "text-blue-600",
  };

  const [formData, setFormData] = useState({
    from: "Delhi",
    to: "Goa",
    tripType: "return",
    departDate: "2025-01-02",
    returnDate: "2025-01-04",
    passengers: 2,
    class: "economy",
    budget: 60000,
  });

  const classOptions = [
    { value: "economy", label: "Economy" },
    { value: "premium", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    console.log("Next button clicked!", formData);
    if (onNext) onNext(formData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter key behavior
      handleNext(e); // Simulate clicking the Next button
    }
  };

  return (
    <div
      tabIndex={0} // Make the form container focusable to capture key events
      onKeyDown={handleKeyDown} // Listen for Enter key
      className={`w-full max-w-5xl p-6 ${theme.containerBg} rounded-lg shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Plane className="w-5 h-5" />
        <h2 className="text-lg font-semibold text-black">Tour Booking</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">From - To</label>
          <div className="flex items-center justify-between">
            <span className="text-black">
              {formData.from} - {formData.to}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Destination</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
          />
        </div>

        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Trip</label>
          <select
            name="tripType"
            value={formData.tripType}
            onChange={handleInputChange}
            className={`w-full bg-transparent text-black border-none p-0 focus:ring-0 ${theme.containerText}`}
          >
            <option value="return">Return</option>
            <option value="oneway">One Way</option>
          </select>
        </div>

        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Depart - Return</label>
          <div className="flex gap-2 text-black">
            <input
              type="date"
              name="departDate"
              value={formData.departDate}
              onChange={handleInputChange}
              className="w-1/2 bg-transparent border-none p-0 focus:ring-0"
            />
            {formData.tripType === "return" && (
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                className="w-1/2 bg-transparent border-none p-0 focus:ring-0"
              />
            )}
          </div>
        </div>

        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Passengers</label>
          <input
            type="number"
            name="passengers"
            min="1"
            max="9"
            value={formData.passengers}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
          />
        </div>

        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Class</label>
          <select
            name="class"
            value={formData.class}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
          >
            {classOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className={`border rounded-lg p-3 ${theme.fieldBg}`}>
          <label className="text-sm text-gray-500 block mb-1">Budget</label>
          <input
            type="number"
            name="budget"
            min="0"
            value={formData.budget}
            onChange={handleInputChange}
            className={`w-full bg-transparent border-none p-0 focus:ring-0 ${theme.containerText}`}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleNext}
          className={`${theme.primary} ${theme.primaryHover} text-white px-4 py-2 rounded-lg flex items-center gap-2`}
        >
          Next
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TourBookingForm;

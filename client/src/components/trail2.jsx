import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Send, ArrowRight, ArrowLeft } from "lucide-react";

const TourBookingWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [queryData, setQueryData] = useState({
    from: "",
    to: "",
    tripType: "return",
    departDate: "",
    returnDate: "",
    passengers: 1,
    class: "economy",
    budget: 0,
  });

  const steps = [
    {
      question: "Where would you like to go?",
      field: "to",
      type: "text",
      placeholder: "Enter destination",
    },
    {
      question: "When would you like to depart?",
      field: "departDate",
      type: "date",
    },
    {
      question: "How many passengers are traveling?",
      field: "passengers",
      type: "number",
      placeholder: "Enter number of passengers",
    },
    {
      question: "What's your budget for this trip?",
      field: "budget",
      type: "number",
      placeholder: "Enter your budget",
    },
  ];

  const handleInputChange = (value) => {
    setQueryData((prev) => ({
      ...prev,
      [steps[currentStep].field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.(queryData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission
      nextStep();
    }
  };

  useEffect(() => {
    // Add a keydown event listener for Enter key
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      // Remove the listener when the component unmounts
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Plane className="w-5 h-5" />
        <h2 className="text-lg font-semibold text-black">Plan Your Tour</h2>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-8">
        <motion.div
          className="h-full bg-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="mb-8 text-black"
        >
          <h3 className="text-xl font-medium mb-4">{steps[currentStep].question}</h3>
          <input
            type={steps[currentStep].type}
            value={queryData[steps[currentStep].field]}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={steps[currentStep].placeholder}
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            currentStep === 0 ? "invisible" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {currentStep === steps.length - 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onComplete(queryData)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Complete
            <Send className="w-4 h-4" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default TourBookingWizard;

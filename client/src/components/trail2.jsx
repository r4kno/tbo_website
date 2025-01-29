import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Send, ArrowRight, ArrowLeft } from 'lucide-react';

const TourBookingWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [queryData, setQueryData] = useState({
    from: '',
    to: '',
    destination: '',
    tripType: 'return',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy',
    budget: 0
  });

  const steps = [
    {
      question: "Where would you like to go?",
      field: "to",
      type: "select",
      options: [
        { value: "DEL", label: "Delhi" },
        { value: "BOM", label: "Mumbai" },
        { value: "BLR", label: "Bangalore" },
        { value: "HYD", label: "Hyderabad" },
        { value: "MAA", label: "Chennai" }
      ],
      placeholder: "Enter destination"
    },
    {
      question: "When would you like to depart?",
      field: "departDate",
      type: "date"
    },
    {
      question: "How many days will you spend",
      field: "returnDate",
      type: "number",
      onChange: (e) => {
        const departDate = new Date(queryData.departDate);
        const numberOfDays = parseInt(e.target.value, 10);
        const returnDate = new Date(departDate);
        returnDate.setDate(departDate.getDate() + numberOfDays);
        handleInputChange(returnDate.toISOString().split('T')[0]);
      }
    },
    {
      question: "How many passengers are traveling?",
      field: "passengers",
      type: "range",
      min: 1,
      max: 10,
      step: 1,
      render: (value) => (
        <div className="space-y-4">
          <input
            type="range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            min="1"
            max="10"
            value={value || 1}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <div className="text-center text-gray-700 font-medium">
            {value || 1} passengers
          </div>
        </div>
      )
    },
    {
      question: "What's your budget for this trip?",
      field: "budget",
      type: "range",
      min: 5000,
      max: 100000,
      step: 1000,
      render: (value) => (
        <div className="space-y-4">
          <input
            type="range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            min="5000"
            max="100000"
            step="1000"
            value={value || 5000}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <div className="text-center text-gray-700 font-medium">
            ₹{value || 5000}
          </div>
        </div>
      )
    }
  ].filter(step => step.question !== null);

  const handleInputChange = (value) => {
    setQueryData(prev => ({
      ...prev,
      [steps[currentStep].field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete?.(queryData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const inputVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const handleSubmit = (e) => {
    console.log('query data at trail2 file: ',queryData);
    onComplete(queryData);
  }

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

      {/* Step Counter */}
      {/* <div className="text-sm text-gray-500 mb-4">
        Step {currentStep + 1} of {steps.length}
      </div> */}

      {/* Question and Input Field */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={inputVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mb-8 text-black"
        >
          <h3 className="text-xl font-medium mb-4">{steps[currentStep].question}</h3>
          
          {steps[currentStep].render ? (
            steps[currentStep].render(queryData[steps[currentStep].field])
          ) : steps[currentStep].type === 'select' ? (
            <select
              value={queryData[steps[currentStep].field]}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            >
              {steps[currentStep].options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={steps[currentStep].type}
              value={queryData[steps[currentStep].field]}
              onChange={(e) => handleInputChange(e.target.value)}
              min={steps[currentStep].min}
              max={steps[currentStep].max}
              placeholder={steps[currentStep].placeholder}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            currentStep === 0 ? 'invisible' : 'bg-gray-600 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        
          {currentStep === steps.length - 1 ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                Plan my Tour
                <Send className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >     Next
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            </>
          )}
      </div>
    </div>
  );
};

export default TourBookingWizard;
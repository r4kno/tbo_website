import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Send, ArrowRight, ArrowLeft } from 'lucide-react';

const TourBookingWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [queryData, setQueryData] = useState({
    from: '',
    to: '',
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
      type: "text",
      placeholder: "Enter destination"
    },
    {
      question: "What type of trip are you planning?",
      field: "tripType",
      type: "select",
      options: [
        { value: "return", label: "Round Trip" },
        { value: "oneway", label: "One Way" }
      ]
    },
    {
      question: "When would you like to depart?",
      field: "departDate",
      type: "date"
    },
    {
      question: queryData.tripType === 'return' ? "When would you like to return?" : null,
      field: "returnDate",
      type: "date",
      conditional: queryData.tripType === 'return'
    },
    {
      question: "How many passengers are traveling?",
      field: "passengers",
      type: "number",
      min: 1,
      max: 9
    },
    {
      question: "What class would you prefer?",
      field: "class",
      type: "select",
      options: [
        { value: "economy", label: "Economy" },
        { value: "premium", label: "Premium Economy" },
        { value: "business", label: "Business" },
        { value: "first", label: "First Class" }
      ]
    },
    {
      question: "What's your budget for this trip?",
      field: "budget",
      type: "number",
      min: 0,
      placeholder: "Enter amount"
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
    console.log(queryData);
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
          
          {steps[currentStep].type === 'select' ? (
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
            currentStep === 0 ? 'invisible' : 'bg-gray-100 hover:bg-gray-200'
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
                Complete
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
import { motion } from 'framer-motion';

const steps = [
  "Initial Contact",
  "Property Details",
  "Location & Risk",
  "Wind Mitigation",
  "Loss History",
  "Coverage",
  "Rating",
  "Decision"
];

const ProgressBar = ({ currentStep }) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <div className="bg-white shadow-sm p-6 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </h2>
        <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
      </div>
      
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          />
        </div>
        
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-xs ${
                index <= currentStep ? 'text-blue-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;


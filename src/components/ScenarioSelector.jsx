import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';
import { scenarios } from '../data/scenarios';

const ScenarioSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loadScenario = useStore((state) => state.loadScenario);
  
  const handleLoadScenario = (scenarioKey) => {
    loadScenario(scenarios[scenarioKey].data);
    setIsOpen(false);
  };
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-secondary"
      >
        📚 Load Test Scenario
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Practice Scenarios</h3>
                  <p className="text-gray-600 mt-1">Load pre-built scenarios to practice underwriting</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(scenarios).map(([key, scenario]) => (
                  <div
                    key={key}
                    onClick={() => handleLoadScenario(key)}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
                  >
                    <h4 className="font-bold text-gray-900 mb-2">{scenario.name}</h4>
                    <p className="text-sm text-gray-600">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScenarioSelector;


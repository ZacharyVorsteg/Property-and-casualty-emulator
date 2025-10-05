import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import scenarioPresets from '../data/scenarioPresets';

const ScenarioLoader = ({ onLoadScenario }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors text-sm font-medium"
      >
        📚 Load Training Scenario
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Training Scenarios</h2>
                  <p className="text-gray-600 mt-1">Load pre-built scenarios to practice different underwriting situations</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(scenarioPresets).map(([key, scenario]) => (
                  <button
                    key={key}
                    onClick={() => {
                      onLoadScenario(scenario.data);
                      setIsOpen(false);
                    }}
                    className="text-left border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <h3 className="font-bold text-gray-900 mb-1">{scenario.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
                    <p className="text-xs font-semibold text-blue-600">
                      Expected: {scenario.expectedPremium}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScenarioLoader;


import { motion } from 'framer-motion';

const ProgressIndicator = ({ showSections, activeDeclines }) => {
  const sections = [
    { id: 'eligibility', label: 'Eligibility', icon: '🔑' },
    { id: 'insuranceHistory', label: 'Insurance History', icon: '📋' },
    { id: 'property', label: 'Property', icon: '🏠' },
    { id: 'systems', label: 'Systems', icon: '⚡' },
    { id: 'location', label: 'Location', icon: '📍' },
    { id: 'windMit', label: 'Wind Mitigation', icon: '🌪️' },
    { id: 'liabilityRisks', label: 'Liability', icon: '⚠️' },
    { id: 'personalFactors', label: 'Personal', icon: '👤' },
    { id: 'coverage', label: 'Coverage', icon: '💰' }
  ];
  
  const completedCount = Object.values(showSections).filter(Boolean).length;
  const totalCount = sections.length;
  const progress = (completedCount / totalCount) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-900">Progress</h3>
        <span className="text-sm font-semibold text-blue-600">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
        />
      </div>
      
      <div className="space-y-2">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className={`flex items-center gap-2 text-sm ${
              showSections[section.id]
                ? 'text-blue-600 font-semibold'
                : 'text-gray-400'
            }`}
          >
            <span className="text-lg">{section.icon}</span>
            <span className="flex-1">{section.label}</span>
            {showSections[section.id] && (
              <span className="text-green-600">✓</span>
            )}
          </div>
        ))}
      </div>
      
      {completedCount < totalCount && (
        <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-gray-700">
          <p className="font-semibold">👇 Scroll down to continue</p>
          <p className="mt-1">More sections will reveal as you complete each step</p>
        </div>
      )}
      
      {activeDeclines.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded text-xs">
          <p className="font-bold text-red-900">
            {activeDeclines.length} Critical Issue{activeDeclines.length > 1 ? 's' : ''}
          </p>
          <p className="text-red-700 mt-1">Must fix to proceed with coverage</p>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;


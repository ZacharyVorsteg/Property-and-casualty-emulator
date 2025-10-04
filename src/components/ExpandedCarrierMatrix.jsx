import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ExpandedCarrierMatrix = ({ riskProfile, premiumEstimates }) => {
  const [expandedCarrier, setExpandedCarrier] = useState(null);
  
  const carriers = [
    { name: 'Progressive', color: 'blue' },
    { name: 'Universal', color: 'green' },
    { name: 'Tower Hill', color: 'purple' },
    { name: 'FedNat', color: 'orange' },
    { name: 'Citizens', color: 'gray' }
  ];
  
  const getCarrierStatus = (carrierName) => {
    const roofAge = parseInt(riskProfile.roofAge) || 0;
    const lossCount = riskProfile.claims?.length || 0;
    const windZone = riskProfile.windZone || 'X';
    
    const rules = {
      'Progressive': { roofMax: 15, lossMax: 1, zones: ['3', 'X'], creditMin: 'Fair (640-699)' },
      'Universal': { roofMax: 18, lossMax: 2, zones: ['2', '3', 'X'], creditMin: 'Below Average (580-639)' },
      'Tower Hill': { roofMax: 20, lossMax: 2, zones: ['2', '3', 'X'], creditMin: 'Poor (under 580)' },
      'FedNat': { roofMax: 17, lossMax: 1, zones: ['2', '3', 'X'], creditMin: 'Fair (640-699)' },
      'Citizens': { roofMax: 25, lossMax: 3, zones: ['1', '2', '3', 'X'], creditMin: 'Any' }
    };
    
    const rule = rules[carrierName];
    const reasons = [];
    const checks = [];
    let isEligible = true;
    
    // Roof age
    if (roofAge > 0) {
      if (roofAge > rule.roofMax) {
        isEligible = false;
        reasons.push({
          factor: 'Roof Age',
          value: `${roofAge} years`,
          status: 'fail',
          detail: `Exceeds max ${rule.roofMax} years`
        });
      } else {
        checks.push({
          factor: 'Roof Age',
          value: `${roofAge} years`,
          status: 'pass',
          detail: `Within ${rule.roofMax}-year limit`
        });
      }
    }
    
    // Loss history
    if (lossCount > rule.lossMax) {
      isEligible = false;
      reasons.push({
        factor: 'Claims',
        value: `${lossCount} claims`,
        status: 'fail',
        detail: `Exceeds max ${rule.lossMax} claims`
      });
    } else if (riskProfile.hasClaims !== undefined) {
      checks.push({
        factor: 'Claims',
        value: `${lossCount} claims`,
        status: 'pass',
        detail: `Within ${rule.lossMax}-claim limit`
      });
    }
    
    // Wind zone
    if (windZone && !rule.zones.includes(windZone)) {
      isEligible = false;
      reasons.push({
        factor: 'Wind Zone',
        value: windZone,
        status: 'fail',
        detail: `Not accepted (accepts: ${rule.zones.join(', ')})`
      });
    } else if (windZone) {
      checks.push({
        factor: 'Wind Zone',
        value: windZone,
        status: 'pass',
        detail: 'Acceptable'
      });
    }
    
    // System issues
    if (riskProfile.plumbingType === 'Polybutylene') {
      isEligible = false;
      reasons.push({
        factor: 'Plumbing',
        value: 'Polybutylene',
        status: 'fail',
        detail: 'Uninsurable - must replace'
      });
    }
    
    if (riskProfile.electricalPanel === 'Federal Pacific (FPE)' || 
        riskProfile.electricalPanel === 'Zinsco/Sylvania') {
      isEligible = false;
      reasons.push({
        factor: 'Electrical',
        value: riskProfile.electricalPanel,
        status: 'fail',
        detail: 'Fire hazard - must replace'
      });
    }
    
    // Pool fence
    if (riskProfile.hasPool && riskProfile.poolFence === 'None') {
      isEligible = false;
      reasons.push({
        factor: 'Pool Safety',
        value: 'Unfenced',
        status: 'fail',
        detail: 'Must install 4-ft fence'
      });
    }
    
    // Dog breed
    if (riskProfile.hasDogs && riskProfile.dogBreeds?.includes('Pit Bull')) {
      if (carrierName !== 'Citizens') {
        isEligible = false;
        reasons.push({
          factor: 'Dog Breed',
          value: 'Restricted',
          status: 'fail',
          detail: 'Pit Bull not accepted'
        });
      }
    }
    
    return {
      isEligible,
      reasons: isEligible ? checks : reasons,
      premium: isEligible ? premiumEstimates[carrierName] : null
    };
  };
  
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 shadow-lg">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="text-xl">🏢</span>
          <span>Live Carrier Matrix</span>
        </h3>
        <p className="text-xs text-gray-600 mt-1">Updates in real-time as you fill the form</p>
      </div>
      
      <div className="p-4 space-y-2">
        <AnimatePresence mode="popLayout">
          {carriers.map((carrier, index) => {
            const result = getCarrierStatus(carrier.name);
            
            return (
              <motion.div
                key={carrier.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setExpandedCarrier(expandedCarrier === carrier.name ? null : carrier.name)}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    result.isEligible
                      ? 'border-green-300 bg-green-50 hover:bg-green-100'
                      : 'border-red-300 bg-red-50 hover:bg-red-100 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {result.isEligible ? (
                        <span className="text-green-600 text-xl">✅</span>
                      ) : (
                        <span className="text-red-600 text-xl">❌</span>
                      )}
                      <span className={`font-semibold ${
                        result.isEligible ? 'text-gray-900' : 'line-through text-gray-500'
                      }`}>
                        {carrier.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {expandedCarrier === carrier.name ? '▼' : '▶'}
                      </span>
                    </div>
                    
                    {result.premium && (
                      <div className="text-right">
                        <p className="font-bold text-green-700 text-sm">
                          ${result.premium.toLocaleString()}/yr
                        </p>
                        <p className="text-xs text-gray-600">
                          ${Math.round(result.premium / 12)}/mo
                        </p>
                      </div>
                    )}
                  </div>
                </button>
                
                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedCarrier === carrier.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 mr-3 mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="font-semibold text-xs text-gray-700 mb-2">
                          {result.isEligible ? 'Eligibility Checks:' : 'Decline Reasons:'}
                        </p>
                        <div className="space-y-1">
                          {result.reasons.map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs">
                              {reason.status === 'pass' ? (
                                <span className="text-green-600">✓</span>
                              ) : (
                                <span className="text-red-600">✗</span>
                              )}
                              <div className="flex-1">
                                <p className={reason.status === 'pass' ? 'text-gray-700' : 'text-red-700'}>
                                  <strong>{reason.factor}:</strong> {reason.value}
                                </p>
                                <p className="text-gray-600 text-xs">{reason.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {result.isEligible && result.premium && (
                          <div className="mt-3 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600">Estimated Annual Premium</p>
                            <p className="text-lg font-bold text-blue-600">
                              ${result.premium.toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <div className="px-4 pb-4">
        <div className="bg-gray-50 rounded p-2 text-xs text-gray-600">
          <p className="font-semibold mb-1">Live Updates:</p>
          <p>Carriers update as each factor is entered. Click to see detailed reasons.</p>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCarrierMatrix;


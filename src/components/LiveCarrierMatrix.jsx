import { motion, AnimatePresence } from 'framer-motion';

const LiveCarrierMatrix = ({ riskProfile, premiumEstimates }) => {
  const carriers = [
    { name: 'Progressive', status: 'checking' },
    { name: 'Universal', status: 'checking' },
    { name: 'Tower Hill', status: 'checking' },
    { name: 'FedNat', status: 'checking' },
    { name: 'Citizens', status: 'eligible' }
  ];
  
  const getCarrierStatus = (carrier) => {
    if (!riskProfile.roofAge) return 'pending';
    
    const roofAge = parseInt(riskProfile.roofAge);
    const lossCount = riskProfile.losses?.length || 0;
    const windZone = riskProfile.windZone || 'X';
    
    // Carrier-specific rules
    const rules = {
      'Progressive': { roofMax: 15, lossMax: 1, zones: ['3', 'X'] },
      'Universal': { roofMax: 18, lossMax: 2, zones: ['2', '3', 'X'] },
      'Tower Hill': { roofMax: 20, lossMax: 2, zones: ['2', '3', 'X'] },
      'FedNat': { roofMax: 17, lossMax: 1, zones: ['2', '3', 'X'] },
      'Citizens': { roofMax: 25, lossMax: 3, zones: ['1', '2', '3', 'X'] }
    };
    
    const rule = rules[carrier.name];
    if (!rule) return 'pending';
    
    // Check eligibility with detailed reasons
    const reasons = [];
    let isEligible = true;
    
    if (roofAge > rule.roofMax) {
      isEligible = false;
      reasons.push(`Roof age ${roofAge} exceeds maximum ${rule.roofMax} years`);
    }
    if (lossCount > rule.lossMax) {
      isEligible = false;
      reasons.push(`${lossCount} claim${lossCount > 1 ? 's' : ''} exceeds maximum ${rule.lossMax}`);
    }
    if (!rule.zones.includes(windZone) && windZone) {
      isEligible = false;
      reasons.push(`Wind Zone ${windZone} not accepted (accepts: ${rule.zones.join(', ')})`);
    }
    
    if (!isEligible) {
      return { status: 'declined', reasons };
    }
    
    // Add positive reasons for eligible carriers
    const positiveReasons = [];
    if (roofAge <= rule.roofMax) {
      positiveReasons.push(`✓ Roof age ${roofAge} within limits`);
    }
    if (lossCount <= rule.lossMax) {
      positiveReasons.push(`✓ Loss history acceptable`);
    }
    if (rule.zones.includes(windZone) || !windZone) {
      positiveReasons.push(`✓ Wind zone acceptable`);
    }
    
    return { 
      status: 'eligible', 
      premium: premiumEstimates[carrier.name],
      reasons: positiveReasons
    };
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-lg">🏢</span>
        <span>Carrier Eligibility</span>
      </h3>
      
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {carriers.map((carrier, index) => {
            const result = getCarrierStatus(carrier);
            
            return (
              <motion.div
                key={carrier.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border-2 transition-all ${
                  result.status === 'eligible' 
                    ? 'border-green-200 bg-green-50' 
                    : result.status === 'declined'
                    ? 'border-red-200 bg-red-50 opacity-60'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {result.status === 'eligible' ? (
                      <span className="text-green-600">✅</span>
                    ) : result.status === 'declined' ? (
                      <span className="text-red-600">❌</span>
                    ) : (
                      <span className="text-gray-400">🔄</span>
                    )}
                    <span className={`font-medium text-sm ${
                      result.status === 'declined' ? 'line-through text-gray-500' : 'text-gray-900'
                    }`}>
                      {carrier.name}
                    </span>
                  </div>
                  
                  {result.premium && (
                    <span className="text-sm font-bold text-green-700">
                      ${result.premium.toLocaleString()}/yr
                    </span>
                  )}
                </div>
                
                {result.reasons && result.reasons.length > 0 && (
                  <div className={`text-xs mt-1 ml-6 space-y-0.5 ${
                    result.status === 'declined' ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {result.reasons.map((reason, idx) => (
                      <div key={idx}>{reason}</div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          <span className="font-semibold">Real-time matching:</span> Updates as you fill the form
        </div>
      </div>
    </div>
  );
};

export default LiveCarrierMatrix;


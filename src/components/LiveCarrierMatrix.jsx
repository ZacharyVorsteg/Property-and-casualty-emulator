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
    
    // Check eligibility
    if (roofAge > rule.roofMax) {
      return { status: 'declined', reason: `Roof age ${roofAge} > max ${rule.roofMax}` };
    }
    if (lossCount > rule.lossMax) {
      return { status: 'declined', reason: `${lossCount} losses > max ${rule.lossMax}` };
    }
    if (!rule.zones.includes(windZone) && windZone) {
      return { status: 'declined', reason: `Wind zone ${windZone} not accepted` };
    }
    
    return { status: 'eligible', premium: premiumEstimates[carrier.name] };
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
                      ${result.premium.toLocaleString()}
                    </span>
                  )}
                </div>
                
                {result.reason && (
                  <div className="text-xs text-red-600 mt-1 ml-6">
                    {result.reason}
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


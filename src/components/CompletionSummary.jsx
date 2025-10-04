import { motion } from 'framer-motion';

const CompletionSummary = ({ formData, riskScore, riskFactors, premiumEstimate, premiumBreakdown, activeDeclines }) => {
  const replacementCost = parseInt(formData.squareFeet || 0) * 150;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-2xl p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2">🎓 HO3 Underwriting Complete!</h2>
        <p className="text-blue-100">You've processed all 50+ underwriting factors</p>
      </div>
      
      {/* Final Decision */}
      <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-bold mb-4">
          {activeDeclines.length > 0 ? '❌ DECLINED' : 
           riskScore > 70 ? '⚠️ REFERRAL' : 
           '✅ APPROVED'}
        </h3>
        
        {activeDeclines.length > 0 ? (
          <div className="space-y-2">
            <p className="text-lg">Policy CANNOT be issued due to:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {activeDeclines.map((decline, idx) => (
                <li key={idx}>{decline.title}: {decline.message}</li>
              ))}
            </ul>
            <p className="text-sm text-blue-200 mt-4">
              Total cost to fix all issues: ${activeDeclines.reduce((sum, d) => {
                const cost = d.cost?.match(/\$[\d,]+/)?.[0]?.replace(/[$,]/g, '');
                return sum + (parseInt(cost) || 0);
              }, 0).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-200">Annual Premium</p>
                <p className="text-3xl font-bold">${premiumEstimate.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-blue-200">Monthly Payment</p>
                <p className="text-3xl font-bold">${Math.round(premiumEstimate / 12).toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded">
              <p className="text-sm">Coverage A (Dwelling): ${replacementCost.toLocaleString()}</p>
              <p className="text-sm">Risk Classification: {
                riskScore <= 30 ? 'PREFERRED' :
                riskScore <= 50 ? 'STANDARD' :
                riskScore <= 70 ? 'SUBSTANDARD' :
                'HIGH RISK'
              }</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Risk Factor Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <h3 className="font-bold text-lg mb-3">📊 Risk Score Breakdown</h3>
          <div className="space-y-1 text-sm">
            {riskFactors.map((factor, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{factor.name}</span>
                <span className={factor.impact > 0 ? 'text-red-300' : factor.impact < 0 ? 'text-green-300' : 'text-gray-300'}>
                  {factor.impact > 0 ? '+' : ''}{factor.impact}
                </span>
              </div>
            ))}
            <div className="border-t border-white/20 pt-1 mt-1 flex justify-between font-bold">
              <span>Final Score:</span>
              <span>{riskScore}/100</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <h3 className="font-bold text-lg mb-3">💰 Premium Impact Summary</h3>
          {premiumBreakdown.adjustments && premiumBreakdown.adjustments.length > 0 ? (
            <div className="space-y-1 text-sm max-h-64 overflow-y-auto">
              <div className="flex justify-between font-semibold">
                <span>Base Rate</span>
                <span>${Math.round(premiumBreakdown.base).toLocaleString()}</span>
              </div>
              {premiumBreakdown.adjustments.slice(0, 8).map((adj, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="opacity-90">{adj.name}</span>
                  <span className={adj.amount > 0 ? 'text-red-300' : 'text-green-300'}>
                    {adj.amount > 0 ? '+' : ''}${Math.round(Math.abs(adj.amount)).toLocaleString()}
                  </span>
                </div>
              ))}
              {premiumBreakdown.adjustments.length > 8 && (
                <div className="text-xs text-blue-200">
                  + {premiumBreakdown.adjustments.length - 8} more factors...
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-blue-200">Complete all sections to see premium calculation</p>
          )}
        </div>
      </div>
      
      {/* Key Inputs Summary */}
      <div className="bg-white/10 backdrop-blur rounded-lg p-4">
        <h3 className="font-bold text-lg mb-3">📝 Key Underwriting Inputs</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-blue-200 text-xs">Occupancy</p>
            <p className="font-semibold">{formData.occupancy || 'Not entered'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Roof Age</p>
            <p className="font-semibold">{formData.roofAge || '—'} years</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Year Built</p>
            <p className="font-semibold">{formData.yearBuilt || '—'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Square Footage</p>
            <p className="font-semibold">{formData.squareFeet || '—'} sqft</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Construction</p>
            <p className="font-semibold text-xs">{formData.exteriorWalls || '—'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">County</p>
            <p className="font-semibold">{formData.county || '—'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Wind Zone</p>
            <p className="font-semibold">{formData.windZone || '—'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Claims</p>
            <p className="font-semibold">{formData.claims?.length || 0}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Electrical Panel</p>
            <p className="font-semibold text-xs">{formData.electricalPanel || '—'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Plumbing</p>
            <p className="font-semibold text-xs">{formData.plumbingType || '—'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Pool</p>
            <p className="font-semibold">{formData.hasPool ? `Yes (${formData.poolFence || 'No fence'})` : 'No'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Dogs</p>
            <p className="font-semibold text-xs">{formData.hasDogs ? `Yes (${formData.dogBreeds?.[0] || 'Unknown'})` : 'No'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Credit Score</p>
            <p className="font-semibold text-xs">{formData.creditScore || '—'}</p>
          </div>
          <div>
            <p className="text-blue-200 text-xs">Business</p>
            <p className="font-semibold text-xs">{formData.businessType || 'None'}</p>
          </div>
        </div>
      </div>
      
      {/* Learning Summary */}
      <div className="mt-6 bg-yellow-400/20 backdrop-blur rounded-lg p-4">
        <h3 className="font-bold mb-2">🎓 What You Learned:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div>✓ HO3 is owner-occupied only</div>
          <div>✓ Roof age is #1 factor (can triple premium)</div>
          <div>✓ Polybutylene plumbing = uninsurable</div>
          <div>✓ FPE/Zinsco panels = fire hazards</div>
          <div>✓ Pool must be fenced (Florida law)</div>
          <div>✓ Restricted dog breeds exist</div>
          <div>✓ Credit score: 40-80% premium impact!</div>
          <div>✓ Wind mitigation saves 15-45%</div>
          <div>✓ 3+ claims = standard market decline</div>
          <div>✓ Inspections required for older homes</div>
          <div>✓ Hurricane deductibles are percentages</div>
          <div>✓ Coastal properties pay 50% more</div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompletionSummary;


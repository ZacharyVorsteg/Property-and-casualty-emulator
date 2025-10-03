import { useState } from 'react';
import useStore from '../../store/useStore';

const Step8FinalDecision = () => {
  const { formData, resetForm } = useStore();
  const [showCertificate, setShowCertificate] = useState(false);
  
  const generateSummary = () => {
    const roofAge = parseInt(formData.roofAge) || 0;
    const lossCount = formData.losses?.length || 0;
    const yearBuilt = parseInt(formData.yearBuilt) || 2020;
    const age = 2025 - yearBuilt;
    
    const concerns = [];
    const strengths = [];
    
    // Identify concerns
    if (roofAge > 15) concerns.push('Old roof - limited markets');
    if (lossCount >= 2) concerns.push('Multiple claims history');
    if (formData.windZone === '1') concerns.push('High wind zone exposure');
    if (formData.floodZone?.startsWith('V') || formData.floodZone?.startsWith('A')) {
      concerns.push('Flood zone - separate policy required');
    }
    if (age >= 40) concerns.push('Property age requires inspection');
    
    // Identify strengths
    if (roofAge <= 10) strengths.push('New roof - RCV settlement');
    if (formData.roofShape === 'Hip') strengths.push('Hip roof - wind mitigation');
    if (formData.openingProtection === 'Impact glass') strengths.push('Impact glass - major discount');
    if (lossCount === 0) strengths.push('Claims-free - best rates');
    if (formData.exteriorWalls?.includes('Masonry')) strengths.push('CBS construction - preferred');
    
    return { concerns, strengths };
  };
  
  const { concerns, strengths } = generateSummary();
  
  const handleStartOver = () => {
    if (confirm('Are you sure you want to start a new quote? All data will be reset.')) {
      resetForm();
    }
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Underwriting Decision & Summary</h2>
        <p className="text-gray-600">Final review and training completion</p>
      </div>
      
      <div className="space-y-6">
        {/* Decision Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">📊 Final Decision</h3>
          
          {formData.selectedCarrier ? (
            <div className="space-y-2">
              <p className="text-xl">
                <strong>✅ BIND</strong> - {formData.selectedCarrier}
              </p>
              <p className="text-lg">
                Annual Premium: <strong>${formData.annualPremium?.toLocaleString() || 'N/A'}</strong>
              </p>
              <p>
                Coverage: ${formData.dwellingLimit?.toLocaleString()} Dwelling
              </p>
              <p className="text-sm opacity-90 mt-3">
                This quote is bindable subject to inspection requirements and final underwriting approval.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-bold">⚠️ REFER TO UNDERWRITER</p>
              <p className="mt-2">This risk requires management approval before binding.</p>
            </div>
          )}
        </div>
        
        {/* Risk Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <h4 className="font-bold text-red-900 mb-3">⚠️ Key Concerns ({concerns.length})</h4>
            {concerns.length > 0 ? (
              <ul className="space-y-2">
                {concerns.map((concern, idx) => (
                  <li key={idx} className="text-sm text-red-800">• {concern}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-red-800">No major concerns identified</p>
            )}
          </div>
          
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <h4 className="font-bold text-green-900 mb-3">✅ Strengths ({strengths.length})</h4>
            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map((strength, idx) => (
                  <li key={idx} className="text-sm text-green-800">• {strength}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-green-800">No significant strengths noted</p>
            )}
          </div>
        </div>
        
        {/* Coverage Summary */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Coverage Summary</h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Property Address</p>
              <p className="font-semibold">{formData.propertyAddress || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Year Built / Roof Age</p>
              <p className="font-semibold">{formData.yearBuilt} / {formData.roofAge} years</p>
            </div>
            <div>
              <p className="text-gray-600">Coverage A (Dwelling)</p>
              <p className="font-semibold">${formData.dwellingLimit?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Liability</p>
              <p className="font-semibold">${parseInt(formData.liabilityLimit).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">All Other Perils Deductible</p>
              <p className="font-semibold">${formData.allOtherPerilsDeductible}</p>
            </div>
            <div>
              <p className="text-gray-600">Hurricane Deductible</p>
              <p className="font-semibold">{formData.hurricaneDeductible}</p>
            </div>
            <div>
              <p className="text-gray-600">Wind Zone / Flood Zone</p>
              <p className="font-semibold">{formData.windZone} / {formData.floodZone?.split(' ')[0]}</p>
            </div>
            <div>
              <p className="text-gray-600">Claims History</p>
              <p className="font-semibold">{formData.losses?.length || 0} in 5 years</p>
            </div>
          </div>
        </div>
        
        {/* Key Lessons */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6">
          <h3 className="font-bold text-yellow-900 text-lg mb-3">🎓 Key Lessons from This Quote</h3>
          <ul className="space-y-2 text-sm text-yellow-900">
            <li>✓ Roof age is king in Florida - always check first</li>
            <li>✓ Wind mitigation can save clients 20-45% on premiums</li>
            <li>✓ Hurricane deductibles are PERCENTAGES, not flat amounts</li>
            <li>✓ Flood insurance is ALWAYS separate - never forget to quote it</li>
            <li>✓ Multiple water claims = major red flag</li>
            <li>✓ Building code year affects pricing significantly</li>
            <li>✓ Citizens is last resort, not first choice</li>
          </ul>
        </div>
        
        {/* Training Completion */}
        <div className="text-center py-8">
          <button
            onClick={() => setShowCertificate(true)}
            className="btn-primary text-lg px-8 py-3"
          >
            🎓 Complete Training & View Certificate
          </button>
          
          <button
            onClick={handleStartOver}
            className="btn-secondary ml-4 text-lg px-8 py-3"
          >
            🔄 Start New Quote
          </button>
        </div>
      </div>
      
      {/* Training Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                🎓 TRAINING COMPLETE!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Florida P&C Insurance Underwriting
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-blue-900 mb-4">You've Learned To Evaluate:</h3>
                <div className="grid grid-cols-2 gap-3 text-left text-sm">
                  <div>✅ Kill switches that save time</div>
                  <div>✅ Roof age impact on markets</div>
                  <div>✅ Wind zones & CAT exposure</div>
                  <div>✅ Florida-specific regulations</div>
                  <div>✅ Carrier appetite matching</div>
                  <div>✅ Pricing & deductible strategies</div>
                  <div>✅ Wind mitigation benefits</div>
                  <div>✅ Claims pattern recognition</div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <p className="font-bold text-green-900 mb-2">Remember:</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Roof age is king in Florida</li>
                  <li>• Wind mitigation = huge savings</li>
                  <li>• Citizens is last resort</li>
                  <li>• Water claims are biggest risk</li>
                  <li>• Always quote flood separately</li>
                </ul>
              </div>
              
              <button
                onClick={() => {
                  setShowCertificate(false);
                  handleStartOver();
                }}
                className="btn-primary text-lg px-8 py-3"
              >
                Start Another Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step8FinalDecision;


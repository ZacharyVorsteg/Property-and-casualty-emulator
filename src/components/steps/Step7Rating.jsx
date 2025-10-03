import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import { carrierMatrix, baseRates } from '../../data/floridaData';

const Step7Rating = () => {
  const { formData, updateFormData, addAlert, clearAlerts } = useStore();
  const [eligibleCarriers, setEligibleCarriers] = useState([]);
  const [declinedCarriers, setDeclinedCarriers] = useState([]);
  
  useEffect(() => {
    clearAlerts();
    runCarrierSelection();
  }, []);
  
  const runCarrierSelection = () => {
    const eligible = [];
    const declined = [];
    
    const roofAge = parseInt(formData.roofAge) || 0;
    const windZone = formData.windZone || 'X';
    const lossCount = formData.losses?.length || 0;
    const tiv = formData.dwellingLimit || 0;
    
    Object.entries(carrierMatrix).forEach(([carrier, appetite]) => {
      let isEligible = true;
      const reasons = [];
      
      // Roof age check
      if (roofAge > appetite.roofAge.max) {
        isEligible = false;
        reasons.push(`Roof age ${roofAge} exceeds max ${appetite.roofAge.max}`);
      }
      
      // Wind zone check
      if (!appetite.windZone.includes(windZone)) {
        isEligible = false;
        reasons.push(`Wind zone ${windZone} not acceptable`);
      }
      
      // Loss history check
      if (lossCount > appetite.lossHistory.max) {
        isEligible = false;
        reasons.push(`${lossCount} losses exceed max ${appetite.lossHistory.max}`);
      }
      
      // TIV check
      if (tiv > 0) {
        if (tiv < appetite.TIV.min) {
          isEligible = false;
          reasons.push(`TIV ${tiv.toLocaleString()} below minimum ${appetite.TIV.min.toLocaleString()}`);
        }
        if (tiv > appetite.TIV.max) {
          isEligible = false;
          reasons.push(`TIV ${tiv.toLocaleString()} exceeds maximum ${appetite.TIV.max.toLocaleString()}`);
        }
      }
      
      if (isEligible) {
        // Calculate premium
        const premium = calculatePremium(carrier);
        eligible.push({
          carrier,
          premium,
          competitiveFactors: appetite.competitiveFactors
        });
      } else {
        declined.push({
          carrier,
          reasons
        });
      }
    });
    
    // Sort by premium
    eligible.sort((a, b) => a.premium - b.premium);
    
    setEligibleCarriers(eligible);
    setDeclinedCarriers(declined);
    
    // Set selected carrier if available
    if (eligible.length > 0) {
      updateFormData({ 
        selectedCarrier: eligible[0].carrier,
        annualPremium: eligible[0].premium
      });
      
      addAlert({
        type: 'success',
        title: `✅ ${eligible.length} Carrier${eligible.length > 1 ? 's' : ''} Available`,
        message: `Best rate: ${eligible[0].carrier} at $${eligible[0].premium.toLocaleString()}/year`
      });
    } else if (declined.length >= 2) {
      addAlert({
        type: 'info',
        title: 'Citizens Eligible',
        message: '2+ declinations - Qualifies for Citizens Property Insurance'
      });
      updateFormData({ selectedCarrier: 'Citizens Property Insurance' });
    } else {
      addAlert({
        type: 'warning',
        message: 'Limited market availability - may need E&S markets'
      });
    }
  };
  
  const calculatePremium = (carrier) => {
    // Base rate calculation
    const county = formData.county || 'Orange';
    const sqftRate = baseRates[county] || baseRates.default;
    let basePremium = (formData.dwellingLimit / 100) * sqftRate;
    
    // Construction multiplier
    if (formData.exteriorWalls === "Frame") {
      basePremium *= 1.1;
    } else if (formData.exteriorWalls === "Masonry/Concrete Block (CBS)") {
      basePremium *= 0.95;
    }
    
    // Age multiplier
    const yearBuilt = parseInt(formData.yearBuilt) || 2020;
    const age = 2025 - yearBuilt;
    if (age >= 40) {
      basePremium *= 1.3;
    } else if (age >= 30) {
      basePremium *= 1.2;
    } else if (age >= 20) {
      basePremium *= 1.1;
    }
    
    // Wind zone multiplier
    const windZoneMultipliers = {
      '1': 1.5,
      '2': 1.3,
      '3': 1.1,
      'X': 1.0
    };
    basePremium *= windZoneMultipliers[formData.windZone] || 1.0;
    
    // Wind mitigation discount (calculate from form data)
    let windMitDiscount = 0;
    if (formData.roofShape === "Hip") windMitDiscount += 12;
    if (formData.openingProtection === "Impact glass") windMitDiscount += 20;
    if (formData.roofWallConnection === "Double wraps") windMitDiscount += 15;
    windMitDiscount = Math.min(windMitDiscount, 45);
    basePremium *= (1 - windMitDiscount / 100);
    
    // Deductible credit
    const deductibleCredits = {
      '500': 0,
      '1000': 0,
      '2500': 0,
      '5000': -10,
      '10000': -20
    };
    const deductibleCredit = deductibleCredits[formData.allOtherPerilsDeductible] || 0;
    basePremium *= (1 + deductibleCredit / 100);
    
    // Claims loading
    const lossCount = formData.losses?.length || 0;
    if (lossCount === 1) basePremium *= 1.1;
    if (lossCount === 2) basePremium *= 1.25;
    if (lossCount >= 3) basePremium *= 1.5;
    
    // Carrier-specific pricing
    if (carrier === "Lexington (E&S)") {
      basePremium *= 2; // E&S is much more expensive
    }
    
    // Add Florida fees
    const fees = {
      FHCF: basePremium * 0.01,
      FIGA: basePremium * 0.01,
      EMPA: basePremium * 0.004,
      policy: 25,
      inspection: age > 30 ? 150 : 0
    };
    
    const total = basePremium + Object.values(fees).reduce((a, b) => a + b, 0);
    
    return Math.round(total);
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Market Analysis & Pricing</h2>
        <p className="text-gray-600">Determine which carriers will write this risk and at what price</p>
      </div>
      
      <div className="space-y-6">
        {/* Eligible Carriers */}
        {eligibleCarriers.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ✅ Available Carriers ({eligibleCarriers.length})
            </h3>
            
            <div className="space-y-3">
              {eligibleCarriers.map((carrier, index) => (
                <div
                  key={carrier.carrier}
                  onClick={() => updateFormData({ 
                    selectedCarrier: carrier.carrier,
                    annualPremium: carrier.premium
                  })}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.selectedCarrier === carrier.carrier
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {index === 0 && '🏆 '}
                        {carrier.carrier}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {carrier.competitiveFactors?.join(' • ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        ${carrier.premium.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">per year</p>
                      <p className="text-xs text-gray-400">
                        ${Math.round(carrier.premium / 12).toLocaleString()}/month
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Declined Carriers */}
        {declinedCarriers.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ❌ Declined Carriers ({declinedCarriers.length})
            </h3>
            
            <div className="space-y-2">
              {declinedCarriers.map((carrier) => (
                <details key={carrier.carrier} className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-semibold text-gray-900 cursor-pointer">
                    {carrier.carrier}
                  </summary>
                  <ul className="mt-2 ml-4 space-y-1">
                    {carrier.reasons.map((reason, idx) => (
                      <li key={idx} className="text-sm text-red-600">• {reason}</li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
            
            {declinedCarriers.length >= 2 && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                <p className="font-semibold text-blue-900">
                  ✅ With 2+ declinations, this risk qualifies for Citizens Property Insurance (Florida's insurer of last resort)
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Premium Breakdown */}
        {formData.selectedCarrier && formData.annualPremium > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-green-900 mb-4">
              Selected: {formData.selectedCarrier}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-gray-600">Annual Premium</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${formData.annualPremium.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${Math.round(formData.annualPremium / 12).toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Cost per $1000 Coverage</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${((formData.annualPremium / formData.dwellingLimit) * 1000).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step7Rating;


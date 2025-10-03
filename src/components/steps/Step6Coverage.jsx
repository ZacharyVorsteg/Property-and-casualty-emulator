import { useEffect } from 'react';
import useStore from '../../store/useStore';
import EducationalPopup from '../EducationalPopup';
import { countyRiskProfiles, baseRates } from '../../data/floridaData';

const Step6Coverage = () => {
  const { formData, updateFormData, addAlert, clearAlerts } = useStore();
  
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);
  
  useEffect(() => {
    // Calculate replacement cost
    if (formData.squareFeet && formData.county) {
      const sqftRate = baseRates[formData.county] || baseRates.default;
      const replacementCost = parseInt(formData.squareFeet) * (sqftRate * 100);
      updateFormData({ 
        replacementCost,
        dwellingLimit: replacementCost
      });
      
      // Set default coverage B, C, D
      if (!formData.otherStructuresLimit) {
        updateFormData({ otherStructuresLimit: Math.round(replacementCost * 0.1) });
      }
      if (!formData.personalPropertyLimit) {
        updateFormData({ personalPropertyLimit: Math.round(replacementCost * 0.5) });
      }
      if (!formData.lossOfUseLimit) {
        updateFormData({ lossOfUseLimit: Math.round(replacementCost * 0.2) });
      }
    }
  }, [formData.squareFeet, formData.county]);
  
  useEffect(() => {
    // High-value home check
    if (formData.replacementCost > 750000) {
      addAlert({
        type: 'info',
        message: '💎 High-value home - consider excess liability umbrella'
      });
    }
    
    // Sinkhole coverage info
    if (formData.county && countyRiskProfiles[formData.county]?.sinkhole_risk === "EXTREME") {
      if (formData.sinkholeOption === "Full Sinkhole Coverage") {
        addAlert({
          type: 'warning',
          message: '⚠️ Full sinkhole coverage will add 15-25% to premium'
        });
      }
    }
  }, [formData.replacementCost, formData.county, formData.sinkholeOption, addAlert]);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Coverage Structure</h2>
        <p className="text-gray-600">Build appropriate coverage package</p>
      </div>
      
      <div className="space-y-6">
        {/* Dwelling Coverage */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Coverage A - Dwelling
          </h3>
          
          {formData.replacementCost > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="font-semibold text-blue-900">
                Estimated Replacement Cost: ${formData.replacementCost.toLocaleString()}
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Based on {formData.squareFeet} sq ft @ ${((baseRates[formData.county] || baseRates.default) * 100).toFixed(0)}/sq ft for {formData.county} County
              </p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dwelling Limit *
            </label>
            <input
              type="number"
              value={formData.dwellingLimit}
              onChange={(e) => updateFormData({ dwellingLimit: parseInt(e.target.value) })}
              className="input-field"
              placeholder="400000"
            />
          </div>
        </div>
        
        {/* Other Coverages */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Standard Coverages</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coverage B - Other Structures
              </label>
              <input
                type="number"
                value={formData.otherStructuresLimit}
                onChange={(e) => updateFormData({ otherStructuresLimit: parseInt(e.target.value) })}
                className="input-field"
                placeholder="40000"
              />
              <p className="text-xs text-gray-500 mt-1">Default: 10% of Coverage A</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coverage C - Personal Property
              </label>
              <input
                type="number"
                value={formData.personalPropertyLimit}
                onChange={(e) => updateFormData({ personalPropertyLimit: parseInt(e.target.value) })}
                className="input-field"
                placeholder="200000"
              />
              <p className="text-xs text-gray-500 mt-1">Default: 50% of Coverage A</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coverage D - Loss of Use
              </label>
              <input
                type="number"
                value={formData.lossOfUseLimit}
                onChange={(e) => updateFormData({ lossOfUseLimit: parseInt(e.target.value) })}
                className="input-field"
                placeholder="80000"
              />
              <p className="text-xs text-gray-500 mt-1">Default: 20% of Coverage A</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coverage E - Liability *
              </label>
              <select
                value={formData.liabilityLimit}
                onChange={(e) => updateFormData({ liabilityLimit: e.target.value })}
                className="input-field"
              >
                <option value="100000">$100,000 (minimum)</option>
                <option value="300000">$300,000 (standard)</option>
                <option value="500000">$500,000 (preferred)</option>
                <option value="1000000">$1,000,000 (high-value)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Florida-Specific Coverages */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Florida-Specific Coverages
            <EducationalPopup title="🌴 Florida Special Coverages">
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Sinkhole Coverage:</p>
                  <p className="text-sm">Optional in Florida. Adds 15-25% to premium. Required in some counties for certain lenders.</p>
                </div>
                <div>
                  <p className="font-semibold">Ordinance or Law:</p>
                  <p className="text-sm">Covers cost to bring damaged structure up to current code. Essential for older homes!</p>
                </div>
                <div>
                  <p className="font-semibold">Mold Coverage:</p>
                  <p className="text-sm">Florida's humidity makes mold common. Usually capped at $10-50k.</p>
                </div>
                <div>
                  <p className="font-semibold">Screened Enclosure:</p>
                  <p className="text-sm">Florida pools often have screen enclosures - can cost $15-25k to replace!</p>
                </div>
              </div>
            </EducationalPopup>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sinkhole Coverage
              </label>
              <select
                value={formData.sinkholeOption}
                onChange={(e) => updateFormData({ sinkholeOption: e.target.value })}
                className="input-field"
              >
                <option value="Excluded">Excluded (saves 15-20%)</option>
                <option value="Catastrophic Only">Catastrophic Ground Collapse only (default)</option>
                <option value="Full Sinkhole Coverage">Full Sinkhole Coverage (+15-25%)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordinance or Law Coverage
              </label>
              <select
                value={formData.ordinanceOrLaw}
                onChange={(e) => updateFormData({ ordinanceOrLaw: e.target.value })}
                className="input-field"
              >
                <option value="10%">10% of Coverage A</option>
                <option value="25%">25% of Coverage A (recommended)</option>
                <option value="50%">50% of Coverage A</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mold Coverage Limit
              </label>
              <select
                value={formData.moldCoverage}
                onChange={(e) => updateFormData({ moldCoverage: e.target.value })}
                className="input-field"
              >
                <option value="Excluded">Excluded</option>
                <option value="10000">$10,000 limit</option>
                <option value="25000">$25,000 limit</option>
                <option value="50000">$50,000 limit</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Deductibles */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Deductibles (Critical in Florida)
            <EducationalPopup title="💰 Florida Deductible Strategy">
              <p className="mb-3">Deductibles dramatically impact premium!</p>
              <div className="space-y-2">
                <p><strong>$1,000:</strong> Adds ~5% to premium</p>
                <p><strong>$2,500:</strong> Standard - balanced</p>
                <p><strong>$5,000:</strong> Saves ~10%</p>
                <p><strong>$10,000:</strong> Saves ~20%</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded mt-3">
                <p className="font-semibold">Hurricane Deductible is SEPARATE!</p>
                <p className="text-sm mt-1">Applied only to hurricane-related damage. Usually 2-10% of Coverage A.</p>
              </div>
            </EducationalPopup>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                All Other Perils Deductible *
              </label>
              <select
                value={formData.allOtherPerilsDeductible}
                onChange={(e) => updateFormData({ allOtherPerilsDeductible: e.target.value })}
                className="input-field"
              >
                <option value="500">$500 (rare - adds 5%)</option>
                <option value="1000">$1,000 (adds 5%)</option>
                <option value="2500">$2,500 (standard)</option>
                <option value="5000">$5,000 (10% discount)</option>
                <option value="10000">$10,000 (20% discount)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hurricane Deductible *
              </label>
              <select
                value={formData.hurricaneDeductible}
                onChange={(e) => updateFormData({ hurricaneDeductible: e.target.value })}
                className="input-field"
              >
                <option value="2%">2% of Coverage A</option>
                <option value="5%">5% of Coverage A</option>
                <option value="10%">10% of Coverage A</option>
              </select>
              
              {formData.dwellingLimit && formData.hurricaneDeductible && (
                <p className="text-sm text-gray-600 mt-2">
                  = ${(formData.dwellingLimit * parseFloat(formData.hurricaneDeductible) / 100).toLocaleString()} out of pocket for hurricane damage
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6Coverage;


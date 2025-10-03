import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import EducationalPopup from '../EducationalPopup';
import { windMitigationDiscounts } from '../../data/floridaData';

const Step4WindMitigation = () => {
  const { formData, updateFormData, addAlert, clearAlerts } = useStore();
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discountBreakdown, setDiscountBreakdown] = useState([]);
  
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);
  
  useEffect(() => {
    // Calculate wind mitigation discounts
    let discount = 0;
    const breakdown = [];
    
    if (formData.roofShape) {
      const shapeDiscount = windMitigationDiscounts.roofShape[formData.roofShape] || 0;
      if (shapeDiscount > 0) {
        discount += shapeDiscount;
        breakdown.push(`Roof Shape (${formData.roofShape}): ${shapeDiscount}%`);
      }
    }
    
    if (formData.roofDeckAttachment) {
      const deckDiscount = windMitigationDiscounts.roofDeck[formData.roofDeckAttachment] || 0;
      if (deckDiscount > 0) {
        discount += deckDiscount;
        breakdown.push(`Roof Deck Attachment: ${deckDiscount}%`);
      }
    }
    
    if (formData.roofWallConnection) {
      const connectionDiscount = windMitigationDiscounts.roofWallConnection[formData.roofWallConnection] || 0;
      if (connectionDiscount > 0) {
        discount += connectionDiscount;
        breakdown.push(`Roof to Wall Connection: ${connectionDiscount}%`);
      }
    }
    
    if (formData.secondaryWaterResistance) {
      const swrDiscount = windMitigationDiscounts.secondaryWater[formData.secondaryWaterResistance] || 0;
      if (swrDiscount > 0) {
        discount += swrDiscount;
        breakdown.push(`Secondary Water Resistance: ${swrDiscount}%`);
      }
    }
    
    if (formData.openingProtection) {
      const openingDiscount = windMitigationDiscounts.openingProtection[formData.openingProtection] || 0;
      if (openingDiscount > 0) {
        discount += openingDiscount;
        breakdown.push(`Opening Protection: ${openingDiscount}%`);
      }
    }
    
    // Cap at 45% maximum
    const cappedDiscount = Math.min(discount, 45);
    setTotalDiscount(cappedDiscount);
    setDiscountBreakdown(breakdown);
    
    if (cappedDiscount > 0) {
      addAlert({
        type: 'success',
        title: `💰 Wind Mitigation Savings: ${cappedDiscount}%`,
        message: `Total discount: ${cappedDiscount}% - Inspection cost ($150-200) pays for itself!`
      });
    }
  }, [
    formData.roofShape,
    formData.roofDeckAttachment,
    formData.roofWallConnection,
    formData.secondaryWaterResistance,
    formData.openingProtection,
    addAlert
  ]);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hurricane Protection Features</h2>
        <p className="text-gray-600">Calculate mandatory discounts per Florida law</p>
      </div>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">💰</span>
          <div>
            <h3 className="font-bold text-green-900 mb-2">WIND MITIGATION = MASSIVE SAVINGS</h3>
            <p className="text-green-800 text-sm">
              Example: $3,000 annual premium with full wind mitigation can save $1,200+/year!
              Inspection costs $150-200 but pays for itself in 2-3 months.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Building Code */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Building Code
            <EducationalPopup title="🏗️ Building Code Evolution">
              <p className="mb-3">Florida's building codes evolved after major hurricanes:</p>
              <div className="space-y-2">
                <p><strong>Pre-1994:</strong> Minimal wind resistance requirements</p>
                <p><strong>SFBC-94:</strong> South Florida strengthened after Hurricane Andrew (1992)</p>
                <p><strong>FBC 2001:</strong> Statewide Florida Building Code - major upgrade</p>
                <p><strong>Post-2001:</strong> Regular updates for stronger construction</p>
              </div>
              <p className="mt-3 text-sm bg-blue-50 p-2 rounded">
                Homes built to newer codes get better rates because they're more wind-resistant!
              </p>
            </EducationalPopup>
          </h3>
          
          <select
            value={formData.buildingCode}
            onChange={(e) => updateFormData({ buildingCode: e.target.value })}
            className="input-field"
          >
            <option value="">Select Building Code...</option>
            <option value="2001 Florida Building Code (FBC 2001)">2001 Florida Building Code (FBC 2001)</option>
            <option value="1994 South Florida Building Code (SFBC-94)">1994 South Florida Building Code (SFBC-94)</option>
            <option value="Pre-1994">Pre-1994</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        
        {/* Roof Deck Attachment */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Roof Deck Attachment
            <EducationalPopup title="🔨 How Plywood is Attached Matters!">
              <p className="mb-3">This measures how the roof decking (plywood) is attached to the trusses:</p>
              <div className="space-y-2 text-sm">
                <p><strong>A: 6d nails @ 6"/12":</strong> Minimal - 0% discount</p>
                <p><strong>B: 8d nails @ 6"/12":</strong> Better - 3% discount</p>
                <p><strong>C: 8d nails @ 6"/6":</strong> Good - 7% discount</p>
                <p><strong>D: Structural screws:</strong> Best - 9% discount</p>
              </div>
              <p className="mt-3 bg-yellow-50 p-2 rounded text-sm">
                Requires inspection - can't tell from outside. Worth checking!
              </p>
            </EducationalPopup>
          </h3>
          
          <select
            value={formData.roofDeckAttachment}
            onChange={(e) => updateFormData({ roofDeckAttachment: e.target.value })}
            className="input-field"
          >
            <option value="">Select...</option>
            <option value='A: 6d nails @ 6"/12"'>A: 6d nails @ 6"/12" (weakest)</option>
            <option value='B: 8d nails @ 6"/12"'>B: 8d nails @ 6"/12"</option>
            <option value='C: 8d nails @ 6"/6"'>C: 8d nails @ 6"/6" (stronger)</option>
            <option value="D: Structural screws">D: Structural screws (strongest)</option>
            <option value="Unknown/Other">Unknown/Other</option>
          </select>
        </div>
        
        {/* Roof to Wall Attachment */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Roof to Wall Connection
            <EducationalPopup title="🔗 Roof Straps Prevent Roof Loss">
              <p className="mb-3">This is how the roof structure is attached to the walls - critical in hurricanes!</p>
              <div className="space-y-2 text-sm">
                <p><strong>Toe nails:</strong> Basic - 0% discount</p>
                <p><strong>Clips:</strong> Better - 9% discount</p>
                <p><strong>Single wraps:</strong> Good - 12% discount</p>
                <p><strong>Double wraps:</strong> Best - 15% discount</p>
              </div>
              <p className="mt-3 bg-green-50 p-2 rounded text-sm">
                Metal straps/clips keep roof from blowing off. Huge difference in hurricane performance!
              </p>
            </EducationalPopup>
          </h3>
          
          <select
            value={formData.roofWallConnection}
            onChange={(e) => updateFormData({ roofWallConnection: e.target.value })}
            className="input-field"
          >
            <option value="">Select...</option>
            <option value="Toe nails">Toe nails (minimal protection)</option>
            <option value="Clips">Clips (single wrap)</option>
            <option value="Single wraps">Single wraps</option>
            <option value="Double wraps">Double wraps (best)</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        
        {/* Secondary Water Resistance */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Secondary Water Resistance (SWR)
            <EducationalPopup title="💧 Backup Protection Layer">
              <p className="mb-3">SWR is a backup water barrier under the shingles/tiles.</p>
              <p className="text-sm">If the roof covering blows off in a hurricane, SWR prevents water from pouring into the home.</p>
              <p className="mt-3 text-sm bg-blue-50 p-2 rounded">
                Required on most new construction since 2001. Worth 5% discount!
              </p>
            </EducationalPopup>
          </h3>
          
          <select
            value={formData.secondaryWaterResistance}
            onChange={(e) => updateFormData({ secondaryWaterResistance: e.target.value })}
            className="input-field"
          >
            <option value="">Select...</option>
            <option value="Yes">Yes - SWR applied</option>
            <option value="No">No SWR</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        
        {/* Opening Protection */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Opening Protection (Windows/Doors)
            <EducationalPopup title="🪟 Impact Glass is Gold in Florida">
              <p className="mb-3">Protecting windows and doors from flying debris is crucial!</p>
              <div className="space-y-2 text-sm">
                <p><strong>None:</strong> 0% discount - high risk</p>
                <p><strong>Basic shutters:</strong> 8% discount</p>
                <p><strong>Hurricane shutters (all openings):</strong> 15% discount</p>
                <p><strong>Impact glass (all openings):</strong> 20% discount</p>
              </div>
              <p className="mt-3 bg-green-50 p-2 rounded text-sm">
                Impact glass is expensive but adds huge value: insurance savings + no need to board up before storms!
              </p>
            </EducationalPopup>
          </h3>
          
          <select
            value={formData.openingProtection}
            onChange={(e) => updateFormData({ openingProtection: e.target.value })}
            className="input-field"
          >
            <option value="">Select...</option>
            <option value="None">None</option>
            <option value="Basic">Basic (non-impact shutters)</option>
            <option value="Hurricane shutters">Hurricane shutters all openings</option>
            <option value="Impact glass">Impact glass all openings (best)</option>
            <option value="Mixed">Mixed protection</option>
          </select>
        </div>
        
        {/* Discount Summary */}
        {totalDiscount > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-green-900 mb-4">
              💰 Total Wind Mitigation Discount: {totalDiscount}%
            </h3>
            
            <div className="space-y-2 mb-4">
              {discountBreakdown.map((item, index) => (
                <div key={index} className="flex items-center text-green-800">
                  <span className="mr-2">✓</span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-4 rounded border-2 border-green-300">
              <p className="font-semibold text-gray-900 mb-2">Estimated Annual Savings:</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-600">On $2,000 premium</p>
                  <p className="text-xl font-bold text-green-700">${(2000 * totalDiscount / 100).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">On $3,000 premium</p>
                  <p className="text-xl font-bold text-green-700">${(3000 * totalDiscount / 100).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">On $5,000 premium</p>
                  <p className="text-xl font-bold text-green-700">${(5000 * totalDiscount / 100).toFixed(0)}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3 text-center">
                Inspection cost: $150-200 (pays for itself in months!)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step4WindMitigation;


import { useEffect } from 'react';
import useStore from '../../store/useStore';
import EducationalPopup from '../EducationalPopup';

const Step2PropertyDetails = () => {
  const { formData, updateFormData, addAlert, clearAlerts } = useStore();
  
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);
  
  useEffect(() => {
    if (formData.yearBuilt) {
      const currentYear = 2025;
      const age = currentYear - parseInt(formData.yearBuilt);
      
      if (age >= 40) {
        addAlert({
          type: 'info',
          title: '🔍 4-Point Inspection Required',
          message: 'Inspector must check: Roof, Electrical, Plumbing, HVAC'
        });
      }
      
      if (age >= 30) {
        addAlert({
          type: 'warning',
          message: '⚠️ Limited carrier options for 30+ year homes'
        });
      }
      
      if (parseInt(formData.yearBuilt) < 1970) {
        addAlert({
          type: 'warning',
          message: '🏚️ Pre-building code era. Expect higher premiums'
        });
      } else if (parseInt(formData.yearBuilt) >= 2002) {
        addAlert({
          type: 'success',
          message: '✅ Meets modern Florida Building Code - premium credit available!'
        });
      }
    }
  }, [formData.yearBuilt, addAlert]);
  
  useEffect(() => {
    // Roof evaluation
    if (formData.roofAge) {
      const age = parseInt(formData.roofAge);
      
      if (age <= 5) {
        addAlert({
          type: 'success',
          title: 'PREFERRED ROOF',
          message: 'Replacement Cost Value (RCV) settlement - All carriers competitive'
        });
      } else if (age <= 10) {
        addAlert({
          type: 'info',
          title: 'STANDARD ROOF',
          message: 'RCV settlement available - Most admitted carriers will write'
        });
      } else if (age <= 15) {
        addAlert({
          type: 'warning',
          title: 'SUBSTANDARD ROOF',
          message: 'ACV settlement only - Limited carriers (Tower Hill, Universal)'
        });
      }
    }
    
    // Roof shape bonus
    if (formData.roofShape === "Hip") {
      addAlert({
        type: 'success',
        message: '✅ Hip roof qualifies for wind mitigation discount (~8%)!'
      });
    }
    
    // Pool fence check
    if (formData.pool !== 'None' && formData.poolFence === 'No fence') {
      addAlert({
        type: 'critical',
        title: '❌ STOP: Unfenced Pool',
        message: 'Unfenced pool = automatic decline. Pool must have 4ft fence with self-closing gate.'
      });
    }
  }, [formData.roofAge, formData.roofShape, formData.pool, formData.poolFence, addAlert]);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Property Characteristics</h2>
        <p className="text-gray-600">Gather all physical details that impact risk and pricing</p>
      </div>
      
      <div className="space-y-6">
        {/* Basic Property Information */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Basic Property Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Property Address *
              </label>
              <input
                type="text"
                value={formData.propertyAddress}
                onChange={(e) => updateFormData({ propertyAddress: e.target.value })}
                className="input-field"
                placeholder="123 Main Street, City, FL 32801"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built *
                </label>
                <input
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => updateFormData({ yearBuilt: e.target.value })}
                  className="input-field"
                  min="1900"
                  max="2025"
                  placeholder="2010"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Living Square Footage *
                </label>
                <input
                  type="number"
                  value={formData.squareFeet}
                  onChange={(e) => updateFormData({ squareFeet: e.target.value })}
                  className="input-field"
                  placeholder="2000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Stories *
                </label>
                <select
                  value={formData.stories}
                  onChange={(e) => updateFormData({ stories: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4+">4+</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Style *
              </label>
              <select
                value={formData.propertyStyle}
                onChange={(e) => updateFormData({ propertyStyle: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Single Family">Single Family</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Condo">Condo</option>
                <option value="Mobile/Manufactured">Mobile/Manufactured</option>
                <option value="Duplex">Duplex</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Construction Details - CRITICAL FOR FLORIDA */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Construction Details (Critical for Florida)
            <EducationalPopup title="🏗️ Why Construction Matters in Florida">
              <p className="font-semibold mb-3">Florida's hurricane exposure makes construction quality crucial!</p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">CBS (Concrete Block):</p>
                  <p className="text-sm">Best - Wind resistant, preferred by all carriers</p>
                </div>
                <div>
                  <p className="font-semibold">Frame:</p>
                  <p className="text-sm">Standard but higher wind vulnerability</p>
                </div>
                <div>
                  <p className="font-semibold">Superior Construction:</p>
                  <p className="text-sm">Poured concrete - Premium credit available</p>
                </div>
              </div>
            </EducationalPopup>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exterior Wall Construction *
              </label>
              <select
                value={formData.exteriorWalls}
                onChange={(e) => updateFormData({ exteriorWalls: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Masonry/Concrete Block (CBS)">Masonry/Concrete Block (CBS)</option>
                <option value="Frame">Frame</option>
                <option value="Frame with Brick Veneer">Frame with Brick Veneer</option>
                <option value="Superior Construction">Superior Construction</option>
                <option value="Mixed/Other">Mixed/Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foundation Type *
              </label>
              <select
                value={formData.foundationType}
                onChange={(e) => updateFormData({ foundationType: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Slab">Slab</option>
                <option value="Crawl Space">Crawl Space</option>
                <option value="Basement">Basement</option>
                <option value="Pilings/Stilts">Pilings/Stilts</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Roof Details - MOST CRITICAL */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Roof Details - MOST CRITICAL
            <EducationalPopup title="🎓 ROOF AGE IS EVERYTHING IN FLORIDA">
              <p className="font-semibold text-lg mb-3">Insurance companies care more about roof age than almost any other factor!</p>
              <div className="space-y-3 bg-yellow-50 p-4 rounded">
                <p>• After 2022 reforms, insurers can pay <strong>Actual Cash Value</strong> (depreciated) instead of full replacement on roofs 10+ years old</p>
                <p>• Many carriers have a hard stop at 15 years</p>
                <p>• If roof is 20+ years, prepare client for <strong>Citizens or roof replacement</strong></p>
              </div>
              <div className="mt-4 space-y-2">
                <p><strong>0-5 years:</strong> Perfect - RCV, best rates</p>
                <p><strong>6-10 years:</strong> Standard - RCV possible</p>
                <p><strong>11-15 years:</strong> Limited - ACV only</p>
                <p><strong>16-20 years:</strong> E&S markets only</p>
                <p><strong>20+ years:</strong> Replace or Citizens</p>
              </div>
            </EducationalPopup>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Roof Shape *
              </label>
              <select
                value={formData.roofShape}
                onChange={(e) => updateFormData({ roofShape: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Hip">Hip (Best - all sides slope)</option>
                <option value="Gable">Gable (triangular ends)</option>
                <option value="Flat">Flat</option>
                <option value="Gambrel">Gambrel</option>
                <option value="Complex/Mixed">Complex/Mixed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roof Covering Material *
              </label>
              <select
                value={formData.roofMaterial}
                onChange={(e) => updateFormData({ roofMaterial: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Architectural Shingle">Architectural Shingle</option>
                <option value="3-Tab Shingle">3-Tab Shingle</option>
                <option value="Tile">Tile (Premium)</option>
                <option value="Metal">Metal (Premium)</option>
                <option value="Built-up/Tar & Gravel">Built-up/Tar & Gravel</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roof Age (exact) *
              </label>
              <input
                type="number"
                value={formData.roofAge}
                onChange={(e) => updateFormData({ roofAge: e.target.value })}
                className="input-field"
                placeholder="12"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Roof Replacement Date
              </label>
              <input
                type="date"
                value={formData.roofReplacementDate}
                onChange={(e) => updateFormData({ roofReplacementDate: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
        </div>
        
        {/* Additional Features */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Structure Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pool/Spa
              </label>
              <select
                value={formData.pool}
                onChange={(e) => updateFormData({ pool: e.target.value })}
                className="input-field"
              >
                <option value="None">None</option>
                <option value="Pool">Pool</option>
                <option value="Spa">Spa</option>
                <option value="Both">Both</option>
              </select>
            </div>
            
            {formData.pool !== 'None' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pool Fence *
                </label>
                <select
                  value={formData.poolFence}
                  onChange={(e) => updateFormData({ poolFence: e.target.value })}
                  className="input-field"
                >
                  <option value="N/A">N/A</option>
                  <option value="Compliant 4-ft fence">Compliant 4-ft fence</option>
                  <option value="Non-compliant">Non-compliant</option>
                  <option value="No fence">No fence</option>
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deck/Patio
              </label>
              <select
                value={formData.deck}
                onChange={(e) => updateFormData({ deck: e.target.value })}
                className="input-field"
              >
                <option value="None">None</option>
                <option value="Screened">Screened</option>
                <option value="Open">Open</option>
                <option value="Both">Both</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Garage
              </label>
              <select
                value={formData.garage}
                onChange={(e) => updateFormData({ garage: e.target.value })}
                className="input-field"
              >
                <option value="None">None</option>
                <option value="1-Car">1-Car</option>
                <option value="2-Car">2-Car</option>
                <option value="3+ Car">3+ Car</option>
                <option value="Carport">Carport</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2PropertyDetails;


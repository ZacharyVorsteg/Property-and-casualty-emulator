import { useEffect } from 'react';
import useStore from '../../store/useStore';
import EducationalPopup from '../EducationalPopup';
import { floridaCounties, countyRiskProfiles, highRiskZips } from '../../data/floridaData';

const Step3LocationRisk = () => {
  const { formData, updateFormData, addAlert, clearAlerts } = useStore();
  
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);
  
  useEffect(() => {
    // Check high-risk ZIP codes
    if (formData.zipCode && highRiskZips[formData.zipCode]) {
      addAlert({
        type: 'warning',
        title: `⚠️ High-Risk ZIP Code`,
        message: highRiskZips[formData.zipCode] + ' - Limited market availability'
      });
    }
  }, [formData.zipCode, addAlert]);
  
  useEffect(() => {
    // Wind zone determination
    if (formData.distanceToCoast !== undefined && formData.distanceToCoast !== '') {
      const distance = parseFloat(formData.distanceToCoast);
      let zone, deductibleMsg, marketMsg;
      
      if (formData.barrierIsland) {
        zone = "1";
        deductibleMsg = "10% of Coverage A mandatory";
        marketMsg = "Citizens or E&S only";
        updateFormData({ windZone: zone });
        addAlert({
          type: 'critical',
          title: '🏝️ Barrier Island = Maximum Wind Exposure',
          message: `${deductibleMsg} - ${marketMsg}`
        });
      } else if (distance <= 1) {
        zone = "1";
        deductibleMsg = "5-10% of Coverage A";
        marketMsg = "Very limited - 3-4 carriers max";
        updateFormData({ windZone: zone });
        addAlert({
          type: 'warning',
          title: `Wind Zone ${zone}`,
          message: `${deductibleMsg} - ${marketMsg}`
        });
      } else if (distance <= 2.5) {
        zone = "2";
        deductibleMsg = "2-5% of Coverage A";
        marketMsg = "Limited - regional carriers";
        updateFormData({ windZone: zone });
        addAlert({
          type: 'info',
          title: `Wind Zone ${zone}`,
          message: `${deductibleMsg} - ${marketMsg}`
        });
      } else if (distance <= 5) {
        zone = "3";
        deductibleMsg = "2% minimum";
        marketMsg = "Moderate - most regionals";
        updateFormData({ windZone: zone });
      } else {
        zone = "X";
        deductibleMsg = "2% or $2,500 flat option";
        marketMsg = "Good - all carriers";
        updateFormData({ windZone: zone });
        addAlert({
          type: 'success',
          message: '✅ Inland location - good carrier availability'
        });
      }
    }
  }, [formData.distanceToCoast, formData.barrierIsland, updateFormData, addAlert]);
  
  useEffect(() => {
    // Flood zone analysis
    if (formData.floodZone) {
      if (formData.floodZone.startsWith("VE")) {
        addAlert({
          type: 'critical',
          title: '🌊 VE Zone = Wave Action Zone',
          message: 'Many carriers won\'t write. Flood insurance MANDATORY if mortgaged.'
        });
      } else if (formData.floodZone.startsWith("AE") || formData.floodZone.startsWith("A")) {
        addAlert({
          type: 'warning',
          title: 'High Flood Risk Area',
          message: '⚠️ Flood insurance required if mortgaged. Separate NFIP or private flood policy needed.'
        });
      } else if (formData.floodZone.startsWith("X")) {
        addAlert({
          type: 'info',
          message: '✅ Low flood risk - optional coverage ~$400-600/year'
        });
      }
    }
  }, [formData.floodZone, addAlert]);
  
  useEffect(() => {
    // County risk assessment
    if (formData.county && countyRiskProfiles[formData.county]) {
      const profile = countyRiskProfiles[formData.county];
      
      if (profile.hurricane_risk === "EXTREME") {
        addAlert({
          type: 'warning',
          title: `${formData.county} County Risk`,
          message: profile.market_notes
        });
      }
      
      if (profile.sinkhole_risk === "EXTREME") {
        addAlert({
          type: 'info',
          title: '⚠️ HIGH SINKHOLE AREA',
          message: 'Sinkhole coverage optional but adds 15-25% to premium. Many carriers exclude it.'
        });
      }
    }
  }, [formData.county, addAlert]);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Florida Risk Zones</h2>
        <p className="text-gray-600">Determine catastrophic exposure based on precise location</p>
      </div>
      
      <div className="space-y-6">
        {/* County Selection */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">County Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              County *
            </label>
            <select
              value={formData.county}
              onChange={(e) => updateFormData({ county: e.target.value })}
              className="input-field"
            >
              <option value="">Select County...</option>
              {floridaCounties.map(county => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>
          
          {formData.county && countyRiskProfiles[formData.county] && (
            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2">{formData.county} County Risk Profile</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-semibold">Hurricane Risk:</span>{' '}
                  <span className={
                    countyRiskProfiles[formData.county].hurricane_risk === 'EXTREME' ? 'text-red-600' :
                    countyRiskProfiles[formData.county].hurricane_risk === 'HIGH' ? 'text-orange-600' :
                    'text-yellow-600'
                  }>
                    {countyRiskProfiles[formData.county].hurricane_risk}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Sinkhole Risk:</span>{' '}
                  <span className={
                    countyRiskProfiles[formData.county].sinkhole_risk === 'EXTREME' ? 'text-red-600' :
                    countyRiskProfiles[formData.county].sinkhole_risk === 'HIGH' ? 'text-orange-600' :
                    'text-green-600'
                  }>
                    {countyRiskProfiles[formData.county].sinkhole_risk}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Wind Zone Determination */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Wind Zone Determination
            <EducationalPopup title="📚 UNDERSTANDING HURRICANE DEDUCTIBLES">
              <p className="font-semibold mb-3">Unlike normal deductibles ($1,000), hurricane deductibles are a PERCENTAGE.</p>
              <div className="bg-yellow-50 p-4 rounded">
                <p className="font-semibold">Example:</p>
                <p className="mt-2">$400,000 home with 5% hurricane deductible</p>
                <p className="text-2xl font-bold text-red-600 my-2">= $20,000 out of pocket!</p>
                <p className="text-sm mt-2">This surprises many homeowners. Always explain clearly.</p>
              </div>
              <div className="mt-4 space-y-2">
                <p><strong>Zone 1 (0-1 mile):</strong> 5-10% deductible</p>
                <p><strong>Zone 2 (1-2.5 miles):</strong> 2-5% deductible</p>
                <p><strong>Zone 3 (2.5-5 miles):</strong> 2% minimum</p>
                <p><strong>Zone X (5+ miles):</strong> 2% or $2,500 flat</p>
              </div>
            </EducationalPopup>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance to Coast (miles) *
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.distanceToCoast}
                onChange={(e) => updateFormData({ distanceToCoast: e.target.value })}
                className="input-field"
                placeholder="5.0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Barrier Island?
              </label>
              <select
                value={formData.barrierIsland}
                onChange={(e) => updateFormData({ barrierIsland: e.target.value === 'true' })}
                className="input-field"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          
          {formData.windZone && (
            <div className="mt-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="font-bold text-blue-900">Wind Zone: {formData.windZone}</p>
            </div>
          )}
        </div>
        
        {/* Flood Zone Analysis */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Flood Zone Analysis
            <EducationalPopup title="💡 FLOOD INSURANCE IS SEPARATE!">
              <div className="space-y-3">
                <p className="font-semibold text-lg">Critical Facts:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Homeowners insurance NEVER covers flood</li>
                  <li>Must write separate NFIP or private flood policy</li>
                  <li>If in A/V zone and mortgaged, it's MANDATORY</li>
                  <li>Common mistake: Forgetting to quote flood = lost client</li>
                </ul>
                <div className="bg-red-50 p-3 rounded mt-3">
                  <p className="font-semibold">Always quote flood separately!</p>
                  <p className="text-sm mt-1">Even if not required, it's a good cross-sell opportunity</p>
                </div>
              </div>
            </EducationalPopup>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                FEMA Flood Zone *
              </label>
              <select
                value={formData.floodZone}
                onChange={(e) => updateFormData({ floodZone: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="VE (Coastal High Velocity)">VE (Coastal High Velocity)</option>
                <option value="AE (100-year flood)">AE (100-year flood)</option>
                <option value="A (No base elevation)">A (No base elevation)</option>
                <option value="X (Preferred)">X (Preferred - Low Risk)</option>
                <option value="X500 (Moderate)">X500 (Moderate Risk)</option>
                <option value="Unknown">Unknown - Order Determination</option>
              </select>
            </div>
            
            {(formData.floodZone?.startsWith("AE") || formData.floodZone?.startsWith("VE")) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Flood Elevation (BFE)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.baseFloodElevation}
                    onChange={(e) => updateFormData({ baseFloodElevation: e.target.value })}
                    className="input-field"
                    placeholder="10.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Finished Floor Elevation (FFE)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.finishedFloorElevation}
                    onChange={(e) => updateFormData({ finishedFloorElevation: e.target.value })}
                    className="input-field"
                    placeholder="12.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Elevation Certificate Available?
                  </label>
                  <select
                    value={formData.elevationCertificate}
                    onChange={(e) => updateFormData({ elevationCertificate: e.target.value === 'true' })}
                    className="input-field"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3LocationRisk;


import { motion } from 'framer-motion';
import { floridaCounties } from '../data/floridaData';
import { restrictedDogBreeds } from '../data/underwritingRules';

const ComprehensiveHO3Form = ({ formData, updateField, showSections, revealSection, setCurrentField }) => {
  
  return (
    <div className="space-y-6">
      
      {/* SECTION 1: HO3 ELIGIBILITY - Always Visible */}
      <motion.section
        id="eligibility"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🔑</span>
          <div>
            <h2 className="text-2xl font-bold">HO3 Eligibility</h2>
            <p className="text-sm text-gray-600">Quick knockout questions</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Occupancy Status * <span className="text-xs text-gray-500">(HO3 is owner-occupied only)</span>
            </label>
            <select
              value={formData.occupancy}
              onChange={(e) => {
                updateField('occupancy', e.target.value);
                if (e.target.value === 'owner_occupied') {
                  revealSection('insuranceHistory');
                }
              }}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
            >
              <option value="">Select...</option>
              <option value="owner_occupied">Owner-occupied primary residence</option>
              <option value="rental">Rental property</option>
              <option value="seasonal">Seasonal/Vacation home</option>
              <option value="vacant">Vacant property</option>
            </select>
            
            {formData.occupancy === 'rental' && (
              <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                <p className="font-bold text-red-900">❌ STOP: Rental properties need DP3, not HO3</p>
              </div>
            )}
            
            {formData.occupancy === 'owner_occupied' && (
              <div className="mt-2 p-3 bg-green-50 border-l-4 border-green-500">
                <p className="font-bold text-green-900">✅ Perfect for HO3!</p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Roof Age (years) * <span className="text-red-600">← MOST CRITICAL FACTOR</span>
            </label>
            <input
              type="number"
              value={formData.roofAge}
              onChange={(e) => {
                updateField('roofAge', e.target.value);
                if (e.target.value && parseInt(e.target.value) <= 25 && formData.occupancy === 'owner_occupied') {
                  revealSection('insuranceHistory');
                }
              }}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              placeholder="Enter roof age"
            />
            
            {formData.roofAge && parseInt(formData.roofAge) > 25 && (
              <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                <p className="font-bold text-red-900">❌ Roof too old - uninsurable</p>
                <p className="text-xs">Must replace roof or apply to Citizens</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>
      
      {/* SECTION 2: INSURANCE HISTORY (CLUE REPORT) */}
      {showSections.insuranceHistory && (
        <motion.section
          id="insuranceHistory"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📋</span>
            <div>
              <h2 className="text-2xl font-bold">Insurance & Claims History</h2>
              <p className="text-sm text-gray-600">CLUE report review - past 5 years</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Insurance Status *
              </label>
              <select
                value={formData.priorInsuranceStatus}
                onChange={(e) => updateField('priorInsuranceStatus', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Currently Insured">Currently Insured</option>
                <option value="Cancelled - Non-payment">Cancelled - Non-payment</option>
                <option value="Cancelled - Underwriting">Cancelled - Underwriting Reasons</option>
                <option value="Non-renewed">Non-renewed by Carrier</option>
                <option value="Lapsed">Lapsed Coverage</option>
                <option value="First-time Buyer">First-time Homebuyer</option>
              </select>
              
              {formData.priorInsuranceStatus === 'Cancelled - Non-payment' && (
                <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                  <p className="font-bold text-red-900">❌ DECLINE: Cancellation for non-payment</p>
                  <p className="text-xs">Indicates financial instability - major red flag</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Any insurance claims in past 5 years? *
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    updateField('hasClaims', false);
                    updateField('claims', []);
                    revealSection('property');
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                    formData.hasClaims === false
                      ? 'border-green-500 bg-green-50 font-bold'
                      : 'border-gray-300'
                  }`}
                >
                  ✅ No Claims
                </button>
                <button
                  onClick={() => {
                    updateField('hasClaims', true);
                    revealSection('property');
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                    formData.hasClaims === true
                      ? 'border-orange-500 bg-orange-50 font-bold'
                      : 'border-gray-300'
                  }`}
                >
                  ⚠️ Has Claims
                </button>
              </div>
              
              {formData.hasClaims === false && (
                <div className="mt-2 p-3 bg-green-50 border-l-4 border-green-500">
                  <p className="font-bold text-green-900">✅ Claims-Free Discount: 5%</p>
                  <p className="text-xs">Can save $100-300/year</p>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}
      
      {/* SECTION 3: PROPERTY BASICS */}
      {showSections.property && (
        <motion.section
          id="property"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🏠</span>
            <h2 className="text-2xl font-bold">Property Basics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Property Address *</label>
              <input
                type="text"
                value={formData.propertyAddress}
                onChange={(e) => updateField('propertyAddress', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="123 Main St, City, FL 32801"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Year Built *</label>
              <input
                type="number"
                value={formData.yearBuilt}
                onChange={(e) => {
                  updateField('yearBuilt', e.target.value);
                  if (e.target.value) {
                    revealSection('systems');
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="2010"
              />
              
              {formData.yearBuilt && (2025 - parseInt(formData.yearBuilt)) >= 40 && (
                <p className="text-xs text-blue-600 mt-1">
                  🔍 4-Point Inspection Required (home is {2025 - parseInt(formData.yearBuilt)} years old)
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Living Square Footage *</label>
              <input
                type="number"
                value={formData.squareFeet}
                onChange={(e) => updateField('squareFeet', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="2000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Exterior Walls *</label>
              <select
                value={formData.exteriorWalls}
                onChange={(e) => updateField('exteriorWalls', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Masonry/Concrete Block (CBS)">CBS (Best - 10% discount)</option>
                <option value="Frame">Wood Frame (+15% surcharge)</option>
                <option value="Superior Construction">Superior Concrete (-15% discount)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Roof Shape *</label>
              <select
                value={formData.roofShape}
                onChange={(e) => updateField('roofShape', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Hip">Hip (Best - 12% wind discount)</option>
                <option value="Gable">Gable (Standard)</option>
                <option value="Flat">Flat</option>
              </select>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* SECTION 4: SYSTEMS (ELECTRICAL, PLUMBING, HVAC) */}
      {showSections.systems && (
        <motion.section
          id="systems"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚡</span>
            <div>
              <h2 className="text-2xl font-bold">Home Systems</h2>
              <p className="text-sm text-gray-600">Electrical, Plumbing, HVAC - Can cause instant declines!</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Electrical */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">🔌 Electrical System</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Electrical Panel Type * <span className="text-red-600">← FPE/Zinsco = instant decline!</span>
                  </label>
                  <select
                    value={formData.electricalPanel}
                    onChange={(e) => updateField('electricalPanel', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="">Select...</option>
                    <option value="Modern Breaker Panel">Modern Breaker Panel ✅</option>
                    <option value="Federal Pacific (FPE)">Federal Pacific (FPE) ❌ FIRE HAZARD</option>
                    <option value="Zinsco/Sylvania">Zinsco/Sylvania ❌ FIRE HAZARD</option>
                    <option value="Challenger">Challenger ❌ DEFECTIVE</option>
                    <option value="Fuses (screw-in)">Fuses (screw-in) ⚠️ OBSOLETE</option>
                  </select>
                  
                  {(formData.electricalPanel === 'Federal Pacific (FPE)' || formData.electricalPanel === 'Zinsco/Sylvania') && (
                    <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                      <p className="font-bold text-red-900">❌ AUTOMATIC DECLINE - Fire Hazard Panel</p>
                      <p className="text-xs">Breakers fail to trip during overload. Documented fire risk.</p>
                      <p className="text-xs mt-1 text-blue-700"><strong>Must replace:</strong> $1,500-3,000 for new panel</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Amperage *</label>
                  <select
                    value={formData.electricalAmperage}
                    onChange={(e) => updateField('electricalAmperage', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select...</option>
                    <option value="200">200 Amp (Modern)</option>
                    <option value="150">150 Amp (Adequate)</option>
                    <option value="100">100 Amp (Minimum)</option>
                    <option value="60">60 Amp or less (Inadequate)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Wiring Type *</label>
                  <select
                    value={formData.wiringType}
                    onChange={(e) => updateField('wiringType', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select...</option>
                    <option value="Copper (Romex)">Copper Romex ✅</option>
                    <option value="Aluminum (branch circuits)">Aluminum Branch Circuits ⚠️</option>
                    <option value="Knob & Tube">Knob & Tube ❌ FIRE HAZARD</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Plumbing */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">🚰 Plumbing System</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Plumbing Type * <span className="text-red-600">← Polybutylene = instant decline!</span>
                  </label>
                  <select
                    value={formData.plumbingType}
                    onChange={(e) => updateField('plumbingType', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="">Select...</option>
                    <option value="Copper">Copper ✅ (50+ year life)</option>
                    <option value="PEX">PEX ✅ (Modern, flexible)</option>
                    <option value="CPVC">CPVC ✅ (Common in FL)</option>
                    <option value="Polybutylene">Polybutylene ❌ UNINSURABLE</option>
                    <option value="Galvanized Steel">Galvanized Steel ⚠️ (Corrodes)</option>
                  </select>
                  
                  {formData.plumbingType === 'Polybutylene' && (
                    <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                      <p className="font-bold text-red-900">❌ UNINSURABLE - Must Re-pipe Entire Home</p>
                      <p className="text-xs">Installed 1978-1995. Reacts with chlorine, sudden failures.</p>
                      <p className="text-xs mt-1">Class-action lawsuits. ALL carriers decline.</p>
                      <p className="text-xs mt-1 text-blue-700"><strong>Cost to fix:</strong> $8,000-15,000</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Water Heater Age</label>
                  <input
                    type="number"
                    value={formData.waterHeaterAge}
                    onChange={(e) => {
                      updateField('waterHeaterAge', e.target.value);
                      revealSection('location');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Years"
                  />
                  {formData.waterHeaterAge && parseInt(formData.waterHeaterAge) > 10 && (
                    <p className="text-xs text-yellow-600 mt-1">⚠️ Over 10 years old - consider replacement</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* HVAC */}
            <div>
              <h3 className="font-bold text-lg mb-3">❄️ HVAC System</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">HVAC Age</label>
                  <input
                    type="number"
                    value={formData.hvacAge}
                    onChange={(e) => {
                      updateField('hvacAge', e.target.value);
                      revealSection('location');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Years"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* SECTION 5: LOCATION & FIRE PROTECTION */}
      {showSections.location && (
        <motion.section
          id="location"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📍</span>
            <h2 className="text-2xl font-bold">Location & Fire Protection</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">County *</label>
              <select
                value={formData.county}
                onChange={(e) => {
                  updateField('county', e.target.value);
                  revealSection('windMit');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                {floridaCounties.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Distance to Coast (miles) *</label>
              <input
                type="number"
                step="0.1"
                value={formData.distanceToCoast}
                onChange={(e) => {
                  updateField('distanceToCoast', e.target.value);
                  const dist = parseFloat(e.target.value);
                  let zone;
                  if (dist <= 1) zone = '1';
                  else if (dist <= 2.5) zone = '2';
                  else if (dist <= 5) zone = '3';
                  else zone = 'X';
                  updateField('windZone', zone);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="10.0"
              />
              
              {formData.windZone && (
                <p className="text-xs mt-1">
                  Wind Zone: <strong>{formData.windZone}</strong> {' '}
                  {formData.windZone === '1' && '(Coastal high-risk, 50% higher premium)'}
                  {formData.windZone === 'X' && '(Inland, standard rates)'}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Distance to Fire Hydrant (feet) *</label>
              <input
                type="number"
                value={formData.distanceToFireHydrant}
                onChange={(e) => updateField('distanceToFireHydrant', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="500"
              />
              {formData.distanceToFireHydrant && parseInt(formData.distanceToFireHydrant) > 1000 && (
                <p className="text-xs text-orange-600 mt-1">⚠️ Over 1,000 ft = Poor fire protection (+15% premium)</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Distance to Fire Station (miles) *</label>
              <input
                type="number"
                step="0.1"
                value={formData.distanceToFireStation}
                onChange={(e) => updateField('distanceToFireStation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="2.5"
              />
              {formData.distanceToFireStation && parseFloat(formData.distanceToFireStation) > 5 && (
                <p className="text-xs text-orange-600 mt-1">⚠️ Over 5 miles = Protection Class 9-10 (limited carriers)</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Flood Zone *</label>
              <select
                value={formData.floodZone}
                onChange={(e) => updateField('floodZone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="X">X (Preferred - Low Risk)</option>
                <option value="AE">AE (100-year flood - Separate flood policy required)</option>
                <option value="VE">VE (Velocity Zone - Very limited carriers)</option>
              </select>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* SECTION 6: WIND MITIGATION */}
      {showSections.windMit && (
        <motion.section
          id="windMit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🌪️</span>
            <h2 className="text-2xl font-bold">Wind Mitigation Features</h2>
            <p className="text-sm text-gray-600">Discounts up to 45%!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Opening Protection (Windows/Doors)</label>
              <select
                value={formData.openingProtection}
                onChange={(e) => {
                  updateField('openingProtection', e.target.value);
                  revealSection('liabilityRisks');
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="None">None (0%)</option>
                <option value="Impact glass">Impact Glass All Openings (20% discount)</option>
                <option value="Hurricane shutters">Hurricane Shutters (15% discount)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Roof-to-Wall Connection</label>
              <select
                value={formData.roofWallConnection}
                onChange={(e) => updateField('roofWallConnection', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Toe nails">Toe Nails (0%)</option>
                <option value="Clips">Hurricane Clips (9%)</option>
                <option value="Single wraps">Single Wraps (12%)</option>
                <option value="Double wraps">Double Wraps (15%)</option>
              </select>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* SECTION 7: LIABILITY RISKS */}
      {showSections.liabilityRisks && (
        <motion.section
          id="liabilityRisks"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-2xl font-bold">Liability Exposures</h2>
          </div>
          
          <div className="space-y-6">
            {/* Pool */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">🏊 Swimming Pool</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Pool or Spa?</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => updateField('hasPool', false)}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                      formData.hasPool === false ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    No Pool
                  </button>
                  <button
                    onClick={() => updateField('hasPool', true)}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                      formData.hasPool === true ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    Has Pool/Spa
                  </button>
                </div>
              </div>
              
              {formData.hasPool && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Pool Fence Status * <span className="text-red-600">← NO FENCE = DECLINE!</span>
                  </label>
                  <select
                    value={formData.poolFence}
                    onChange={(e) => updateField('poolFence', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="">Select...</option>
                    <option value="4-ft fence, self-closing gate">4-ft Fence, Self-Closing Gate ✅</option>
                    <option value="Fence but non-compliant">Fence but Non-Compliant ⚠️</option>
                    <option value="None">No Fence ❌</option>
                  </select>
                  
                  {formData.poolFence === 'None' && (
                    <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                      <p className="font-bold text-red-900">❌ AUTOMATIC DECLINE - Pool Must Be Fenced</p>
                      <p className="text-xs">Florida law requires 4-ft barrier. Child drowning liability.</p>
                      <p className="text-xs mt-1 text-blue-700"><strong>Cost:</strong> $2,000-8,000 for fence</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Dogs */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">🐕 Pets/Dogs</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Any dogs?</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      updateField('hasDogs', false);
                      updateField('dogBreeds', []);
                      revealSection('personalFactors');
                    }}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                      formData.hasDogs === false ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}
                  >
                    No Dogs
                  </button>
                  <button
                    onClick={() => updateField('hasDogs', true)}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 ${
                      formData.hasDogs === true ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                    }`}
                  >
                    Has Dogs
                  </button>
                </div>
              </div>
              
              {formData.hasDogs && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Dog Breed * <span className="text-red-600">← Pit Bull/Rottweiler = decline!</span>
                  </label>
                  <select
                    value={formData.dogBreeds?.[0] || ''}
                    onChange={(e) => {
                      updateField('dogBreeds', [e.target.value]);
                      revealSection('personalFactors');
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="">Select breed...</option>
                    <option value="Labrador">Labrador/Golden Retriever ✅</option>
                    <option value="Small Breed">Small Breed (under 20 lbs) ✅</option>
                    <option value="Beagle">Beagle/Hound ✅</option>
                    <option value="German Shepherd">German Shepherd ⚠️</option>
                    <option value="Pit Bull">Pit Bull ❌ RESTRICTED</option>
                    <option value="Rottweiler">Rottweiler ❌ RESTRICTED</option>
                    <option value="Doberman">Doberman ❌ RESTRICTED</option>
                    <option value="Chow">Chow Chow ❌ RESTRICTED</option>
                    <option value="Akita">Akita ❌ RESTRICTED</option>
                  </select>
                  
                  {formData.dogBreeds?.some(b => restrictedDogBreeds.includes(b)) && (
                    <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                      <p className="font-bold text-red-900">❌ Restricted Breed - Most Carriers Decline</p>
                      <p className="text-xs">Florida is #2 for dog bite claims ($56M in 2023).</p>
                      <p className="text-xs mt-1">These breeds have documented higher bite frequency/severity.</p>
                      <p className="text-xs mt-1 text-blue-700"><strong>Options:</strong> Sign liability exclusion or try Citizens</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Business */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">💼 Business Operations</h3>
              <div>
                <label className="block text-sm font-medium mb-2">Business from home?</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => {
                    updateField('businessType', e.target.value);
                    revealSection('personalFactors');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="None">None ✅</option>
                  <option value="Home Office Only">Home Office Only ✅</option>
                  <option value="Client Visits">Clients Visit Home ⚠️</option>
                  <option value="Daycare/Childcare">Daycare/Childcare ❌</option>
                  <option value="Airbnb/Short-term Rental">Airbnb/Short-term ❌</option>
                </select>
                
                {formData.businessType === 'Daycare/Childcare' && (
                  <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                    <p className="font-bold text-red-900">❌ DECLINE: Daycare requires commercial policy</p>
                    <p className="text-xs">Child liability too high for HO3. Need CGL (Commercial General Liability).</p>
                  </div>
                )}
                
                {formData.businessType === 'Airbnb/Short-term Rental' && (
                  <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                    <p className="font-bold text-red-900">❌ STOP: Airbnb needs DP3 or STR policy</p>
                    <p className="text-xs">HO3 doesn't cover commercial short-term rentals.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Trampoline */}
            <div>
              <h3 className="font-bold text-lg mb-3">🤸 Other Hazards</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.hasTrampoline}
                  onChange={(e) => {
                    updateField('hasTrampoline', e.target.checked);
                    revealSection('personalFactors');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm">Trampoline on property</span>
              </label>
              
              {formData.hasTrampoline && (
                <div className="mt-2 p-3 bg-orange-50 border-l-4 border-orange-500">
                  <p className="font-bold text-orange-900">⚠️ Trampoline = High Injury Risk</p>
                  <p className="text-xs">Many carriers exclude liability or decline. May need to remove.</p>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      )}
      
      {/* SECTION 8: PERSONAL FACTORS */}
      {showSections.personalFactors && (
        <motion.section
          id="personalFactors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">👤</span>
            <div>
              <h2 className="text-2xl font-bold">Personal Factors</h2>
              <p className="text-sm text-gray-600">Credit score can cause 40-80% premium variance!</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Insurance Credit Score * <span className="text-red-600">← 40-80% premium impact!</span>
              </label>
              <select
                value={formData.creditScore}
                onChange={(e) => {
                  updateField('creditScore', e.target.value);
                  revealSection('coverage');
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Excellent (760+)">Excellent (760+) - Save 30%</option>
                <option value="Good (700-759)">Good (700-759) - Save 15%</option>
                <option value="Fair (640-699)">Fair (640-699) - Standard</option>
                <option value="Below Average (580-639)">Below Average (580-639) - Pay 40% More</option>
                <option value="Poor (under 580)">Poor (under 580) - Pay 80% More</option>
              </select>
              
              {formData.creditScore === 'Excellent (760+)' && (
                <div className="mt-2 p-3 bg-green-50 border-l-4 border-green-500">
                  <p className="font-bold text-green-900">✅ Excellent Credit Saves 30%!</p>
                  <p className="text-xs">Can save $600-1,200/year vs average credit.</p>
                </div>
              )}
              
              {formData.creditScore === 'Poor (under 580)' && (
                <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-500">
                  <p className="font-bold text-red-900">⚠️ Low Credit = REFER + 80% Higher Premium</p>
                  <p className="text-xs">Very limited carriers. Premium could be $5,000+ instead of $2,500.</p>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Marital Status</label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => updateField('maritalStatus', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select...</option>
                <option value="Married">Married (5% discount)</option>
                <option value="Single">Single</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Primary Insured Age</label>
              <input
                type="number"
                value={formData.primaryInsuredAge}
                onChange={(e) => updateField('primaryInsuredAge', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="45"
              />
              {formData.primaryInsuredAge && parseInt(formData.primaryInsuredAge) >= 55 && (
                <p className="text-xs text-green-600 mt-1">✅ Age 55+ = Senior discount (5%)</p>
              )}
            </div>
          </div>
        </motion.section>
      )}
      
      {/* SECTION 9: COVERAGE & DEDUCTIBLES */}
      {showSections.coverage && formData.squareFeet && (
        <motion.section
          id="coverage"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">💰</span>
            <h2 className="text-2xl font-bold">Coverage Selection</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold mb-1">Calculated Replacement Cost:</p>
              <p className="text-2xl font-bold text-blue-600">
                ${(parseInt(formData.squareFeet) * 150).toLocaleString()}
              </p>
              <p className="text-xs text-gray-600">{formData.squareFeet} sqft × $150/sqft</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">All Other Perils Deductible *</label>
                <select
                  value={formData.allOtherPerilsDeductible}
                  onChange={(e) => updateField('allOtherPerilsDeductible', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="1000">$1,000</option>
                  <option value="2500">$2,500 (Standard)</option>
                  <option value="5000">$5,000 (10% discount)</option>
                  <option value="10000">$10,000 (20% discount)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Hurricane Deductible *</label>
                <select
                  value={formData.hurricaneDeductible}
                  onChange={(e) => updateField('hurricaneDeductible', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="2%">2%</option>
                  <option value="5%">5%</option>
                  <option value="10%">10%</option>
                </select>
              </div>
            </div>
            
            {/* Optional Coverages */}
            <div className="border-t pt-4">
              <h3 className="font-bold mb-3">Optional Coverages (Check what you want)</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.waterBackup}
                    onChange={(e) => updateField('waterBackup', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Water Backup/Sump Overflow Coverage (+$75/year)</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.equipmentBreakdown}
                    onChange={(e) => updateField('equipmentBreakdown', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Equipment Breakdown Coverage (+$40/year)</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.serviceLine}
                    onChange={(e) => updateField('serviceLine', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Service Line Coverage (+$35/year)</span>
                </label>
              </div>
            </div>
          </div>
        </motion.section>
      )}
      
      {/* SECTION 10: COMPLETION SUMMARY */}
      {showSections.coverage && formData.creditScore && (
        <motion.section
          id="summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold mb-2">🎓 HO3 Underwriting Complete!</h2>
              <p className="text-blue-100">You've processed all 50+ underwriting factors</p>
            </div>
            
            {/* Final Decision */}
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4">
                Final Decision
              </h3>
              
              {formData.plumbingType === 'Polybutylene' || 
               formData.electricalPanel === 'Federal Pacific (FPE)' ||
               formData.electricalPanel === 'Zinsco/Sylvania' ||
               (formData.hasPool && formData.poolFence === 'None') ||
               (formData.hasDogs && formData.dogBreeds?.some(b => ['Pit Bull', 'Rottweiler', 'Doberman'].includes(b))) ||
               parseInt(formData.roofAge) > 25 ? (
                <div>
                  <p className="text-2xl font-bold text-red-300 mb-2">❌ DECLINED</p>
                  <p className="text-sm text-blue-100">Policy cannot be issued - critical issues must be resolved</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-bold text-green-300 mb-2">✅ APPROVED</p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white/10 rounded p-3">
                      <p className="text-sm text-blue-200">Annual Premium</p>
                      <p className="text-3xl font-bold">${(formData.squareFeet ? Math.round(parseInt(formData.squareFeet) * 150 * 0.008 * 1.2) : 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-white/10 rounded p-3">
                      <p className="text-sm text-blue-200">Monthly Payment</p>
                      <p className="text-3xl font-bold">${(formData.squareFeet ? Math.round(parseInt(formData.squareFeet) * 150 * 0.008 * 1.2 / 12) : 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Key Learning Points */}
            <div className="bg-yellow-400/20 backdrop-blur rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">🎯 What You Learned:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>✓ HO3 requires owner-occupancy</div>
                <div>✓ Roof age can triple premium</div>
                <div>✓ Polybutylene = uninsurable</div>
                <div>✓ FPE/Zinsco = fire hazards</div>
                <div>✓ Pool must be fenced</div>
                <div>✓ Dog breeds matter</div>
                <div>✓ Credit: 40-80% impact!</div>
                <div>✓ Wind mitigation saves 15-45%</div>
                <div>✓ 3+ claims = decline</div>
                <div>✓ Inspections cost $125-425</div>
                <div>✓ Hurricane deductible = percentage</div>
                <div>✓ Coastal pays 50% more</div>
              </div>
            </div>
          </div>
        </motion.section>
      )}
      
    </div>
  );
};

export default ComprehensiveHO3Form;

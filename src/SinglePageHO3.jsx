import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RiskMeter from './components/RiskMeter';
import LiveCarrierMatrix from './components/LiveCarrierMatrix';
import EducationalSidebar from './components/EducationalSidebar';
import { floridaCounties, countyRiskProfiles, baseRates, windMitigationDiscounts } from './data/floridaData';

const SinglePageHO3 = () => {
  const [currentField, setCurrentField] = useState('default');
  const [riskScore, setRiskScore] = useState(30);
  const [premiumEstimate, setPremiumEstimate] = useState(0);
  const [premiumEstimates, setPremiumEstimates] = useState({});
  const [showSections, setShowSections] = useState({
    eligibility: true,
    property: false,
    location: false,
    windMit: false,
    losses: false,
    coverage: false
  });
  
  const [formData, setFormData] = useState({
    // HO3 Eligibility
    occupancy: '',
    propertyType: '',
    roofAge: '',
    
    // Property Details
    propertyAddress: '',
    zipCode: '',
    yearBuilt: '',
    squareFeet: '',
    stories: '1',
    exteriorWalls: '',
    roofShape: '',
    roofMaterial: '',
    
    // Location
    county: '',
    distanceToCoast: '',
    barrierIsland: false,
    windZone: '',
    floodZone: '',
    
    // Wind Mitigation
    roofDeckAttachment: '',
    roofWallConnection: '',
    secondaryWaterResistance: '',
    openingProtection: '',
    
    // Losses
    hasLosses: false,
    losses: [],
    
    // Coverage
    dwellingLimit: 0,
    liabilityLimit: '300000',
    allOtherPerilsDeductible: '2500',
    hurricaneDeductible: '2%'
  });
  
  // Calculate risk score based on multiple factors
  useEffect(() => {
    let score = 30; // Start at "Standard"
    
    // Roof age impact (highest weight)
    if (formData.roofAge) {
      const age = parseInt(formData.roofAge);
      if (age <= 10) score -= 10;
      else if (age <= 15) score += 10;
      else if (age <= 20) score += 25;
      else score += 40;
    }
    
    // Wind zone impact
    if (formData.windZone === '1') score += 20;
    else if (formData.windZone === '2') score += 10;
    else if (formData.windZone === 'X') score -= 10;
    
    // Claims impact
    const lossCount = formData.losses?.length || 0;
    score += lossCount * 15;
    
    // Building age
    if (formData.yearBuilt) {
      const age = 2025 - parseInt(formData.yearBuilt);
      if (age > 40) score += 15;
      else if (age > 30) score += 10;
      else if (age < 10) score -= 10;
    }
    
    // Wind mitigation credits
    if (formData.roofShape === 'Hip') score -= 5;
    if (formData.openingProtection === 'Impact glass') score -= 10;
    
    // Cap between 0-100
    score = Math.max(0, Math.min(100, score));
    setRiskScore(score);
  }, [formData]);
  
  // Calculate premium estimate
  useEffect(() => {
    if (!formData.dwellingLimit || formData.dwellingLimit === 0) return;
    
    const dwelling = parseInt(formData.dwellingLimit);
    const county = formData.county || 'Orange';
    const sqftRate = baseRates[county] || baseRates.default;
    
    // Base premium
    let premium = (dwelling / 100) * sqftRate;
    
    // Construction multiplier
    if (formData.exteriorWalls === 'Frame') premium *= 1.1;
    else if (formData.exteriorWalls === 'Masonry/Concrete Block (CBS)') premium *= 0.95;
    
    // Age multiplier
    if (formData.yearBuilt) {
      const age = 2025 - parseInt(formData.yearBuilt);
      if (age >= 40) premium *= 1.3;
      else if (age >= 30) premium *= 1.2;
      else if (age >= 20) premium *= 1.1;
    }
    
    // Wind zone multiplier
    const windMultipliers = { '1': 1.5, '2': 1.3, '3': 1.1, 'X': 1.0 };
    premium *= windMultipliers[formData.windZone] || 1.0;
    
    // Roof age multiplier
    if (formData.roofAge) {
      const age = parseInt(formData.roofAge);
      if (age <= 5) premium *= 0.9;
      else if (age <= 15) premium *= 1.15;
      else if (age <= 20) premium *= 1.35;
    }
    
    // Wind mitigation discounts
    let windDiscount = 0;
    if (formData.roofShape === 'Hip') windDiscount += 12;
    if (formData.openingProtection === 'Impact glass') windDiscount += 20;
    if (formData.roofWallConnection === 'Double wraps') windDiscount += 15;
    windDiscount = Math.min(windDiscount, 45);
    premium *= (1 - windDiscount / 100);
    
    // Claims loading
    const lossCount = formData.losses?.length || 0;
    if (lossCount === 0) premium *= 0.95;
    else if (lossCount === 1) premium *= 1.10;
    else if (lossCount === 2) premium *= 1.25;
    else premium *= 1.50;
    
    // Deductible credits
    if (formData.allOtherPerilsDeductible === '5000') premium *= 0.90;
    else if (formData.allOtherPerilsDeductible === '10000') premium *= 0.80;
    
    // Add fees
    const fees = {
      FHCF: premium * 0.01,
      FIGA: premium * 0.01,
      EMPA: premium * 0.004,
      policy: 25
    };
    
    const total = premium + Object.values(fees).reduce((a, b) => a + b, 0);
    
    setPremiumEstimate(Math.round(total));
    
    // Calculate carrier-specific estimates
    setPremiumEstimates({
      'Progressive': Math.round(total * 0.95),
      'Universal': Math.round(total * 1.0),
      'Tower Hill': Math.round(total * 1.10),
      'FedNat': Math.round(total * 1.05),
      'Citizens': Math.round(total * 1.08)
    });
  }, [formData]);
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const revealSection = (section) => {
    setShowSections(prev => ({ ...prev, [section]: true }));
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HO3 Homeowners Underwriting Trainer</h1>
              <p className="text-sm text-gray-600 mt-1">
                Learning Standard Homeowners Insurance for Owner-Occupied Homes
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <RiskMeter score={riskScore} />
              
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Estimated Premium</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${premiumEstimate > 0 ? premiumEstimate.toLocaleString() : '---'}
                </div>
                <div className="text-xs text-gray-500">
                  ${premiumEstimate > 0 ? Math.round(premiumEstimate / 12).toLocaleString() : '---'}/month
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Section 1: HO3 Eligibility Check */}
            <motion.section
              id="eligibility"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔑</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">HO3 Eligibility Quick Check</h2>
                  <p className="text-sm text-gray-600">HO3 is for owner-occupied homes only - let's verify this qualifies</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you live in this home? *
                  </label>
                  <select
                    value={formData.occupancy}
                    onChange={(e) => {
                      updateField('occupancy', e.target.value);
                      setCurrentField('occupancy');
                      if (e.target.value === 'owner_occupied') {
                        revealSection('property');
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="owner_occupied">Yes - This is my primary residence</option>
                    <option value="rental">No - This is a rental property</option>
                    <option value="seasonal">Seasonal/Vacation home</option>
                    <option value="inherited">Inherited/Family property</option>
                  </select>
                  
                  {formData.occupancy === 'rental' && (
                    <div className="mt-3 p-4 bg-red-50 border-l-4 border-red-500 rounded-r">
                      <p className="font-bold text-red-900">❌ STOP: Rental properties need DP3, not HO3</p>
                      <p className="text-sm text-red-800 mt-1">
                        DP3 (Dwelling Fire) is designed for rental/investment properties. HO3 is owner-occupied only.
                      </p>
                    </div>
                  )}
                  
                  {formData.occupancy === 'seasonal' && (
                    <div className="mt-3 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r">
                      <p className="font-bold text-yellow-900">⚠️ Seasonal Home Considerations</p>
                      <p className="text-sm text-yellow-800 mt-1">
                        May need seasonal/secondary home endorsement. Some carriers restrict coverage.
                      </p>
                    </div>
                  )}
                  
                  {formData.occupancy === 'owner_occupied' && (
                    <div className="mt-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
                      <p className="font-bold text-green-900">✅ Perfect for HO3!</p>
                      <p className="text-sm text-green-800 mt-1">
                        Owner-occupied homes qualify for standard HO3 homeowners insurance.
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roof Age (years) * <span className="text-red-600">← MOST IMPORTANT!</span>
                  </label>
                  <input
                    type="number"
                    value={formData.roofAge}
                    onChange={(e) => {
                      updateField('roofAge', e.target.value);
                      setCurrentField('roofAge');
                      if (e.target.value && formData.occupancy === 'owner_occupied') {
                        revealSection('property');
                      }
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter roof age"
                    min="0"
                    max="100"
                  />
                  
                  {formData.roofAge && (
                    <>
                      {parseInt(formData.roofAge) <= 10 && (
                        <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                          <p className="text-sm font-bold text-green-900">✅ Excellent for HO3!</p>
                          <p className="text-xs text-green-800">All carriers will compete. RCV settlement available.</p>
                        </div>
                      )}
                      
                      {parseInt(formData.roofAge) > 10 && parseInt(formData.roofAge) <= 15 && (
                        <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r">
                          <p className="text-sm font-bold text-yellow-900">⚠️ Limited HO3 carriers</p>
                          <p className="text-xs text-yellow-800">Some carriers decline. May require ACV settlement.</p>
                        </div>
                      )}
                      
                      {parseInt(formData.roofAge) > 15 && parseInt(formData.roofAge) <= 20 && (
                        <div className="mt-3 p-3 bg-orange-50 border-l-4 border-orange-500 rounded-r">
                          <p className="text-sm font-bold text-orange-900">⚠️ Very Limited Options</p>
                          <p className="text-xs text-orange-800">Most HO3 carriers decline. E&S markets may be needed.</p>
                        </div>
                      )}
                      
                      {parseInt(formData.roofAge) > 20 && (
                        <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                          <p className="text-sm font-bold text-red-900">❌ Too Old for Standard HO3</p>
                          <p className="text-xs text-red-800">Options: Citizens Property Insurance or roof replacement required.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.section>
            
            {/* Section 2: Property Details */}
            {showSections.property && (
              <motion.section
                id="property"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🏠</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Property Details</h2>
                    <p className="text-sm text-gray-600">Tell us about this HO3-insured home</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      value={formData.propertyAddress}
                      onChange={(e) => updateField('propertyAddress', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="123 Main Street, City, FL 32801"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year Built *
                    </label>
                    <input
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => {
                        updateField('yearBuilt', e.target.value);
                        if (e.target.value && formData.squareFeet && formData.county) {
                          const sqftRate = (baseRates[formData.county] || baseRates.default) * 100;
                          const replacementCost = parseInt(formData.squareFeet) * sqftRate;
                          updateField('dwellingLimit', replacementCost);
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                      onChange={(e) => {
                        updateField('squareFeet', e.target.value);
                        setCurrentField('coverage');
                        if (e.target.value && formData.county) {
                          const sqftRate = (baseRates[formData.county] || baseRates.default) * 100;
                          const replacementCost = parseInt(e.target.value) * sqftRate;
                          updateField('dwellingLimit', replacementCost);
                          revealSection('location');
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="2000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exterior Walls *
                    </label>
                    <select
                      value={formData.exteriorWalls}
                      onChange={(e) => updateField('exteriorWalls', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="Masonry/Concrete Block (CBS)">Masonry/CBS (Best)</option>
                      <option value="Frame">Wood Frame</option>
                      <option value="Frame with Brick Veneer">Frame with Brick</option>
                      <option value="Superior Construction">Superior (Concrete)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roof Shape *
                    </label>
                    <select
                      value={formData.roofShape}
                      onChange={(e) => {
                        updateField('roofShape', e.target.value);
                        setCurrentField('windMit');
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="Hip">Hip (Best - 12% discount)</option>
                      <option value="Gable">Gable (Standard)</option>
                      <option value="Flat">Flat</option>
                      <option value="Complex/Mixed">Complex/Mixed</option>
                    </select>
                  </div>
                </div>
              </motion.section>
            )}
            
            {/* Section 3: Location & Catastrophe Risk */}
            {showSections.location && (
              <motion.section
                id="location"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Florida Location & Risk</h2>
                    <p className="text-sm text-gray-600">Hurricane and flood exposure for HO3 rating</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      County *
                    </label>
                    <select
                      value={formData.county}
                      onChange={(e) => {
                        updateField('county', e.target.value);
                        if (formData.squareFeet) {
                          const sqftRate = (baseRates[e.target.value] || baseRates.default) * 100;
                          const replacementCost = parseInt(formData.squareFeet) * sqftRate;
                          updateField('dwellingLimit', replacementCost);
                        }
                        revealSection('windMit');
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select County...</option>
                      {floridaCounties.map(county => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Distance to Coast (miles) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.distanceToCoast}
                      onChange={(e) => {
                        updateField('distanceToCoast', e.target.value);
                        setCurrentField('windZone');
                        
                        const distance = parseFloat(e.target.value);
                        let zone;
                        if (distance <= 1) zone = '1';
                        else if (distance <= 2.5) zone = '2';
                        else if (distance <= 5) zone = '3';
                        else zone = 'X';
                        
                        updateField('windZone', zone);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="5.0"
                    />
                  </div>
                  
                  {formData.windZone && (
                    <div className="md:col-span-2">
                      <div className={`p-4 rounded-lg border-2 ${
                        formData.windZone === '1' ? 'bg-red-50 border-red-300' :
                        formData.windZone === '2' ? 'bg-orange-50 border-orange-300' :
                        formData.windZone === '3' ? 'bg-yellow-50 border-yellow-300' :
                        'bg-green-50 border-green-300'
                      }`}>
                        <p className="font-bold">Wind Zone: {formData.windZone}</p>
                        <p className="text-sm mt-1">
                          {formData.windZone === '1' && 'Very limited HO3 carriers. 5-10% hurricane deductible mandatory.'}
                          {formData.windZone === '2' && 'Limited carriers. 2-5% hurricane deductible.'}
                          {formData.windZone === '3' && 'Most carriers available. 2% minimum deductible.'}
                          {formData.windZone === 'X' && 'All carriers compete. Flat $2,500 deductible option available.'}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Flood Zone *
                    </label>
                    <select
                      value={formData.floodZone}
                      onChange={(e) => {
                        updateField('floodZone', e.target.value);
                        revealSection('losses');
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="VE">VE (Coastal High Velocity)</option>
                      <option value="AE">AE (100-year flood)</option>
                      <option value="A">A (Flood zone)</option>
                      <option value="X">X (Preferred - Low Risk)</option>
                    </select>
                  </div>
                </div>
              </motion.section>
            )}
            
            {/* Section 4: Wind Mitigation */}
            {showSections.windMit && (
              <motion.section
                id="windMit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🌪️</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Wind Mitigation Features</h2>
                    <p className="text-sm text-gray-600">HO3 discounts mandated by Florida law - up to 45%!</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Protection (Windows/Doors)
                    </label>
                    <select
                      value={formData.openingProtection}
                      onChange={(e) => updateField('openingProtection', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="None">None (0%)</option>
                      <option value="Basic">Basic shutters (8%)</option>
                      <option value="Hurricane shutters">Hurricane shutters (15%)</option>
                      <option value="Impact glass">Impact glass all openings (20%)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Roof to Wall Connection
                    </label>
                    <select
                      value={formData.roofWallConnection}
                      onChange={(e) => updateField('roofWallConnection', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="Toe nails">Toe nails (0%)</option>
                      <option value="Clips">Hurricane clips (9%)</option>
                      <option value="Single wraps">Single wraps (12%)</option>
                      <option value="Double wraps">Double wraps (15%)</option>
                    </select>
                  </div>
                </div>
                
                {(formData.openingProtection || formData.roofWallConnection || formData.roofShape === 'Hip') && (
                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                    <p className="font-bold text-green-900 mb-2">💰 Wind Mitigation Savings</p>
                    <div className="text-sm text-green-800 space-y-1">
                      {formData.roofShape === 'Hip' && <p>• Hip roof: 12% discount</p>}
                      {formData.openingProtection === 'Impact glass' && <p>• Impact glass: 20% discount</p>}
                      {formData.roofWallConnection === 'Double wraps' && <p>• Roof straps: 15% discount</p>}
                      <p className="font-bold mt-2">
                        These discounts can save $500-1,500/year on HO3 premiums!
                      </p>
                    </div>
                  </div>
                )}
              </motion.section>
            )}
            
            {/* Section 5: Loss History */}
            {showSections.losses && (
              <motion.section
                id="losses"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">📋</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Claims History</h2>
                    <p className="text-sm text-gray-600">HO3 claims in past 5 years</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any insurance claims in past 5 years? *
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        updateField('hasLosses', false);
                        updateField('losses', []);
                        revealSection('coverage');
                      }}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                        formData.hasLosses === false
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      ✅ No Claims
                    </button>
                    <button
                      onClick={() => {
                        updateField('hasLosses', true);
                        revealSection('coverage');
                      }}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                        formData.hasLosses === true
                          ? 'border-orange-500 bg-orange-50 text-orange-900'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      ⚠️ Yes - Has Claims
                    </button>
                  </div>
                  
                  {formData.hasLosses === false && (
                    <div className="mt-3 p-4 bg-green-50 border-l-4 border-green-500 rounded-r">
                      <p className="font-bold text-green-900">✅ Claims-Free Discount!</p>
                      <p className="text-sm text-green-800">HO3 policies with no claims qualify for 5-10% discount.</p>
                    </div>
                  )}
                </div>
              </motion.section>
            )}
            
            {/* Section 6: Coverage & Quote */}
            {showSections.coverage && formData.dwellingLimit > 0 && (
              <motion.section
                id="coverage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">💰</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">HO3 Coverage Structure</h2>
                    <p className="text-sm text-gray-600">Standard homeowners coverage package</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Calculated Replacement Cost:</p>
                    <p className="text-3xl font-bold text-blue-600">${formData.dwellingLimit.toLocaleString()}</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Based on {formData.squareFeet} sq ft in {formData.county} County
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <p className="font-semibold">Coverage A - Dwelling</p>
                      <p className="text-gray-600">${formData.dwellingLimit.toLocaleString()}</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="font-semibold">Coverage B - Other Structures</p>
                      <p className="text-gray-600">${Math.round(formData.dwellingLimit * 0.1).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">10% of Coverage A</p>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-3">
                      <p className="font-semibold">Coverage C - Personal Property</p>
                      <p className="text-gray-600">${Math.round(formData.dwellingLimit * 0.5).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">50% of Coverage A</p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-3">
                      <p className="font-semibold">Coverage D - Loss of Use</p>
                      <p className="text-gray-600">${Math.round(formData.dwellingLimit * 0.2).toLocaleString()}</p>
                      <p className="text-xs text-gray-500">20% of Coverage A</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coverage E - Liability *
                    </label>
                    <select
                      value={formData.liabilityLimit}
                      onChange={(e) => updateField('liabilityLimit', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="100000">$100,000 (minimum)</option>
                      <option value="300000">$300,000 (standard)</option>
                      <option value="500000">$500,000 (recommended)</option>
                      <option value="1000000">$1,000,000 (high coverage)</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        All Other Perils Deductible *
                      </label>
                      <select
                        value={formData.allOtherPerilsDeductible}
                        onChange={(e) => updateField('allOtherPerilsDeductible', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="1000">$1,000</option>
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
                        onChange={(e) => updateField('hurricaneDeductible', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="2%">2% of Coverage A</option>
                        <option value="5%">5% of Coverage A</option>
                        <option value="10%">10% of Coverage A</option>
                      </select>
                      {formData.hurricaneDeductible && (
                        <p className="text-xs text-gray-600 mt-1">
                          = ${(formData.dwellingLimit * parseFloat(formData.hurricaneDeductible) / 100).toLocaleString()} out of pocket
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
            
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1 space-y-6">
            <EducationalSidebar currentField={currentField} riskProfile={formData} />
            <LiveCarrierMatrix riskProfile={formData} premiumEstimates={premiumEstimates} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePageHO3;


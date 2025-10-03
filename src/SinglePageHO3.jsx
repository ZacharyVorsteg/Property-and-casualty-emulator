import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RiskMeter from './components/RiskMeter';
import LiveCarrierMatrix from './components/LiveCarrierMatrix';
import EducationalSidebar from './components/EducationalSidebar';
import { floridaCounties, countyRiskProfiles, baseRates, windMitigationDiscounts } from './data/floridaData';

const SinglePageHO3 = () => {
  const [currentField, setCurrentField] = useState('default');
  const [riskScore, setRiskScore] = useState(40);
  const [riskFactors, setRiskFactors] = useState([
    { name: 'Base Score', impact: 40 }
  ]);
  const [premiumEstimate, setPremiumEstimate] = useState(0);
  const [premiumBreakdown, setPremiumBreakdown] = useState({});
  const [premiumEstimates, setPremiumEstimates] = useState({});
  const [showSections, setShowSections] = useState({
    eligibility: true,
    property: false,
    location: false,
    windMit: false,
    losses: false,
    coverage: false
  });
  const [roofAgeFeedback, setRoofAgeFeedback] = useState(null);
  
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
  
  // Calculate risk score with detailed breakdown
  useEffect(() => {
    let score = 40; // Base score
    const factors = [{ name: 'Base Score', impact: 40 }];
    
    // Roof age impact (highest weight)
    if (formData.roofAge) {
      const age = parseInt(formData.roofAge);
      let roofImpact = 0;
      if (age <= 5) {
        roofImpact = -20;
        factors.push({ name: `Roof Age (${age}y - Excellent)`, impact: -20 });
      } else if (age <= 10) {
        roofImpact = -10;
        factors.push({ name: `Roof Age (${age}y - Good)`, impact: -10 });
      } else if (age <= 15) {
        roofImpact = +10;
        factors.push({ name: `Roof Age (${age}y - Older)`, impact: +10 });
      } else if (age <= 20) {
        roofImpact = +25;
        factors.push({ name: `Roof Age (${age}y - Very Old)`, impact: +25 });
      } else {
        roofImpact = +40;
        factors.push({ name: `Roof Age (${age}y - Critical)`, impact: +40 });
      }
      score += roofImpact;
    }
    
    // Building age impact
    if (formData.yearBuilt) {
      const age = 2025 - parseInt(formData.yearBuilt);
      if (age > 40) {
        score += 15;
        factors.push({ name: `Building Age (${age}y - Inspection Needed)`, impact: +15 });
      } else if (age > 30) {
        score += 10;
        factors.push({ name: `Building Age (${age}y - Older)`, impact: +10 });
      } else if (age < 10) {
        score -= 10;
        factors.push({ name: `Building Age (${age}y - New)`, impact: -10 });
      }
    }
    
    // Wind zone impact
    if (formData.windZone === '1') {
      score += 20;
      factors.push({ name: 'Wind Zone 1 (High Exposure)', impact: +20 });
    } else if (formData.windZone === '2') {
      score += 10;
      factors.push({ name: 'Wind Zone 2 (Moderate)', impact: +10 });
    } else if (formData.windZone === 'X') {
      score -= 10;
      factors.push({ name: 'Wind Zone X (Inland)', impact: -10 });
    }
    
    // Claims impact
    const lossCount = formData.losses?.length || 0;
    if (lossCount > 0) {
      const claimsImpact = lossCount * 15;
      score += claimsImpact;
      factors.push({ name: `${lossCount} Claim${lossCount > 1 ? 's' : ''}`, impact: claimsImpact });
    } else if (formData.hasLosses === false) {
      score -= 5;
      factors.push({ name: 'Claims-Free History', impact: -5 });
    }
    
    // Wind mitigation credits
    if (formData.roofShape === 'Hip') {
      score -= 5;
      factors.push({ name: 'Hip Roof Discount', impact: -5 });
    }
    if (formData.openingProtection === 'Impact glass') {
      score -= 10;
      factors.push({ name: 'Impact Glass Discount', impact: -10 });
    }
    if (formData.exteriorWalls === 'Masonry/Concrete Block (CBS)') {
      score -= 5;
      factors.push({ name: 'CBS Construction', impact: -5 });
    }
    
    // Cap between 0-100
    score = Math.max(0, Math.min(100, score));
    setRiskScore(score);
    setRiskFactors(factors);
  }, [formData]);
  
  // Calculate premium estimate with breakdown
  useEffect(() => {
    // Start calculating once we have basic info
    if (!formData.squareFeet) return;
    
    const sqft = parseInt(formData.squareFeet) || 0;
    const county = formData.county || 'Orange';
    const sqftRate = baseRates[county] || baseRates.default;
    
    // Base rate calculation
    const baseRate = sqft * (sqftRate * 100);
    let premium = baseRate;
    
    const breakdown = {
      base: baseRate,
      adjustments: []
    };
    
    // Construction multiplier
    if (formData.exteriorWalls) {
      if (formData.exteriorWalls === 'Frame') {
        const adjustment = premium * 0.1;
        premium *= 1.1;
        breakdown.adjustments.push({ name: 'Frame Construction', amount: adjustment });
      } else if (formData.exteriorWalls === 'Masonry/Concrete Block (CBS)') {
        const adjustment = premium * -0.05;
        premium *= 0.95;
        breakdown.adjustments.push({ name: 'CBS Construction (Credit)', amount: adjustment });
      }
    }
    
    // Roof age multiplier (biggest impact!)
    if (formData.roofAge) {
      const age = parseInt(formData.roofAge);
      let multiplier = 1.0;
      if (age <= 5) {
        multiplier = 0.9;
        const adjustment = baseRate * -0.1;
        breakdown.adjustments.push({ name: 'New Roof Discount', amount: adjustment });
      } else if (age <= 10) {
        multiplier = 1.0;
      } else if (age <= 15) {
        multiplier = 1.15;
        const adjustment = baseRate * 0.15;
        breakdown.adjustments.push({ name: 'Older Roof Surcharge', amount: adjustment });
      } else if (age <= 20) {
        multiplier = 1.35;
        const adjustment = baseRate * 0.35;
        breakdown.adjustments.push({ name: 'Very Old Roof Surcharge', amount: adjustment });
      } else {
        multiplier = 1.8;
        const adjustment = baseRate * 0.8;
        breakdown.adjustments.push({ name: 'Critical Roof Age Surcharge', amount: adjustment });
      }
      premium *= multiplier;
    }
    
    // Building age
    if (formData.yearBuilt) {
      const age = 2025 - parseInt(formData.yearBuilt);
      if (age >= 40) {
        const adjustment = premium * 0.3;
        premium *= 1.3;
        breakdown.adjustments.push({ name: 'Building Age (40+ years)', amount: adjustment });
      } else if (age >= 30) {
        const adjustment = premium * 0.2;
        premium *= 1.2;
        breakdown.adjustments.push({ name: 'Building Age (30+ years)', amount: adjustment });
      }
    }
    
    // Wind zone multiplier
    if (formData.windZone) {
      const windMultipliers = { '1': 1.5, '2': 1.3, '3': 1.1, 'X': 1.0 };
      const multiplier = windMultipliers[formData.windZone];
      if (multiplier !== 1.0) {
        const adjustment = premium * (multiplier - 1.0);
        premium *= multiplier;
        breakdown.adjustments.push({ name: `Wind Zone ${formData.windZone}`, amount: adjustment });
      }
    }
    
    // Wind mitigation discounts
    let windDiscount = 0;
    if (formData.roofShape === 'Hip') windDiscount += 12;
    if (formData.openingProtection === 'Impact glass') windDiscount += 20;
    if (formData.roofWallConnection === 'Double wraps') windDiscount += 15;
    if (windDiscount > 0) {
      windDiscount = Math.min(windDiscount, 45);
      const adjustment = premium * -(windDiscount / 100);
      premium *= (1 - windDiscount / 100);
      breakdown.adjustments.push({ name: `Wind Mitigation (${windDiscount}%)`, amount: adjustment });
    }
    
    // Claims loading
    const lossCount = formData.losses?.length || 0;
    if (formData.hasLosses === false && lossCount === 0) {
      const adjustment = premium * -0.05;
      premium *= 0.95;
      breakdown.adjustments.push({ name: 'Claims-Free Discount', amount: adjustment });
    } else if (lossCount > 0) {
      const loadPct = lossCount === 1 ? 0.10 : lossCount === 2 ? 0.25 : 0.50;
      const adjustment = premium * loadPct;
      premium *= (1 + loadPct);
      breakdown.adjustments.push({ name: `${lossCount} Claims Surcharge`, amount: adjustment });
    }
    
    // Deductible credits
    if (formData.allOtherPerilsDeductible === '5000') {
      const adjustment = premium * -0.10;
      premium *= 0.90;
      breakdown.adjustments.push({ name: '$5,000 Deductible Credit', amount: adjustment });
    } else if (formData.allOtherPerilsDeductible === '10000') {
      const adjustment = premium * -0.20;
      premium *= 0.80;
      breakdown.adjustments.push({ name: '$10,000 Deductible Credit', amount: adjustment });
    }
    
    // Add fees
    const fees = {
      FHCF: premium * 0.01,
      FIGA: premium * 0.01,
      EMPA: premium * 0.004,
      policy: 25
    };
    
    breakdown.fees = fees;
    const total = premium + Object.values(fees).reduce((a, b) => a + b, 0);
    breakdown.total = total;
    
    setPremiumEstimate(Math.round(total));
    setPremiumBreakdown(breakdown);
    
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
              <RiskMeter score={riskScore} factors={riskFactors} />
              
              <div className="relative group">
                <div className="text-right">
                  <div className="text-xs text-gray-500 uppercase tracking-wide">Estimated Premium</div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${premiumEstimate > 0 ? premiumEstimate.toLocaleString() : '---'}
                  </div>
                  <div className="text-xs text-gray-500">
                    ${premiumEstimate > 0 ? Math.round(premiumEstimate / 12).toLocaleString() : '---'}/month
                  </div>
                </div>
                
                {/* Premium breakdown on hover */}
                {premiumEstimate > 0 && premiumBreakdown.adjustments && (
                  <div className="invisible group-hover:visible absolute top-full right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg p-3 shadow-xl z-50 w-72">
                    <div className="font-bold text-sm mb-2">Premium Breakdown:</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Base Rate</span>
                        <span className="font-semibold">${Math.round(premiumBreakdown.base).toLocaleString()}</span>
                      </div>
                      {premiumBreakdown.adjustments.map((adj, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-gray-600">{adj.name}</span>
                          <span className={`font-semibold ${adj.amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {adj.amount > 0 ? '+' : ''}${Math.round(adj.amount).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t pt-1 mt-1 flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${premiumEstimate.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
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
                      const age = e.target.value;
                      updateField('roofAge', age);
                      setCurrentField('roofAge');
                      
                      // Generate immediate feedback
                      if (age) {
                        const ageNum = parseInt(age);
                        let feedback = null;
                        
                        if (ageNum <= 5) {
                          feedback = {
                            type: 'excellent',
                            title: '🎉 Excellent! New roof = best rates',
                            details: `• ALL carriers will compete for this\n• Replacement Cost coverage (no depreciation)\n• Expected premium: $2,000-2,500/year\n• You just saved ~$1,500/year vs a 15-year roof!`,
                            impact: 'Premium Impact: -$1,500/year vs older roof',
                            carriers: {
                              'Progressive': '✅ Eager to quote - best rates',
                              'Universal': '✅ Very competitive',
                              'Tower Hill': '✅ Will offer RCV settlement'
                            }
                          };
                        } else if (ageNum <= 10) {
                          feedback = {
                            type: 'good',
                            title: '✅ Good - Full market availability',
                            details: `• Most carriers will quote\n• Replacement Cost coverage available\n• Expected premium: $2,500-3,000/year\n• Standard rates for HO3`,
                            impact: 'Premium Impact: Standard market rates',
                            carriers: {
                              'Progressive': '✅ Will quote',
                              'Universal': '✅ Competitive rates',
                              'Tower Hill': '✅ RCV available'
                            }
                          };
                        } else if (ageNum <= 15) {
                          feedback = {
                            type: 'warning',
                            title: '⚠️ Caution - Limited options',
                            details: `• Only 5-8 carriers remain\n• Actual Cash Value settlement only (depreciation applies)\n• Expected premium: $3,500-4,500/year\n• Consider roof replacement for better rates`,
                            impact: 'Premium Impact: +$1,000/year (25% higher)',
                            carriers: {
                              'Progressive': '❌ Declined - exceeds 15-year limit',
                              'Universal': '⚠️ Will quote with ACV only',
                              'Citizens': '✅ Available as backup'
                            }
                          };
                        } else if (ageNum <= 20) {
                          feedback = {
                            type: 'danger',
                            title: '🚨 Critical - E&S Markets Only',
                            details: `• Standard markets won't write\n• Excess & Surplus lines only\n• Expected premium: $5,000-7,000/year\n• STRONG recommendation: Replace roof first`,
                            impact: 'Premium DOUBLES vs new roof (+$2,500/year)',
                            carriers: {
                              'Progressive': '❌ Declined',
                              'Universal': '❌ Declined',
                              'Citizens': '✅ Last resort option only'
                            }
                          };
                        } else {
                          feedback = {
                            type: 'critical',
                            title: '❌ STOP - Uninsurable Without Roof Replacement',
                            details: `• No standard market will write\n• Citizens may be only option\n• Premium: $7,000+ if accepted\n• MUST replace roof to get normal coverage`,
                            impact: 'Must replace roof before binding HO3',
                            carriers: {
                              'Progressive': '❌ Automatic decline',
                              'Universal': '❌ Automatic decline',
                              'Citizens': '⚠️ May accept at very high rate'
                            }
                          };
                        }
                        
                        setRoofAgeFeedback(feedback);
                        
                        // Auto-reveal property section if passes
                        if (ageNum <= 25 && formData.occupancy === 'owner_occupied') {
                          setTimeout(() => revealSection('property'), 300);
                        }
                      } else {
                        setRoofAgeFeedback(null);
                      }
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all ${
                      roofAgeFeedback?.type === 'excellent' ? 'border-green-500 bg-green-50' :
                      roofAgeFeedback?.type === 'good' ? 'border-green-400 bg-green-50' :
                      roofAgeFeedback?.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                      roofAgeFeedback?.type === 'danger' ? 'border-red-500 bg-red-50' :
                      roofAgeFeedback?.type === 'critical' ? 'border-red-700 bg-red-100' :
                      'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter roof age"
                    min="0"
                    max="100"
                  />
                  
                  {roofAgeFeedback && (
                    <div className={`mt-3 p-4 rounded-lg border-l-4 animate-slideIn ${
                      roofAgeFeedback.type === 'excellent' ? 'bg-green-50 border-green-500' :
                      roofAgeFeedback.type === 'good' ? 'bg-green-50 border-green-400' :
                      roofAgeFeedback.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                      roofAgeFeedback.type === 'danger' ? 'bg-red-50 border-red-500' :
                      'bg-red-100 border-red-700'
                    }`}>
                      <h4 className="font-bold text-base mb-2">{roofAgeFeedback.title}</h4>
                      <p className="text-sm whitespace-pre-line mb-2">{roofAgeFeedback.details}</p>
                      
                      {roofAgeFeedback.impact && (
                        <div className="mt-3 p-2 bg-white/50 rounded font-bold text-sm">
                          💰 {roofAgeFeedback.impact}
                        </div>
                      )}
                      
                      {roofAgeFeedback.carriers && (
                        <div className="mt-3 p-2 bg-white/50 rounded">
                          <p className="font-semibold text-sm mb-1">Carrier Impact:</p>
                          <div className="space-y-1">
                            {Object.entries(roofAgeFeedback.carriers).map(([carrier, status]) => (
                              <div key={carrier} className="text-xs">
                                <strong>{carrier}:</strong> {status}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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


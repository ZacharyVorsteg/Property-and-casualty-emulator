import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RiskMeter from './components/RiskMeter';
import ExpandedCarrierMatrix from './components/ExpandedCarrierMatrix';
import EducationalSidebar from './components/EducationalSidebar';
import ComprehensiveHO3Form from './components/ComprehensiveHO3Form';
import ProgressIndicator from './components/ProgressIndicator';
import CompletionSummary from './components/CompletionSummary';
import { floridaCounties } from './data/floridaData';
import { 
  immediateDeclineReasons, 
  restrictedDogBreeds,
  electricalPanels,
  plumbingTypes,
  claimTypeSeverity
} from './data/underwritingRules';

const ComprehensiveHO3 = () => {
  const [currentField, setCurrentField] = useState('default');
  const [riskScore, setRiskScore] = useState(40);
  const [riskFactors, setRiskFactors] = useState([{ name: 'Base Score', impact: 40 }]);
  const [premiumEstimate, setPremiumEstimate] = useState(0);
  const [premiumBreakdown, setPremiumBreakdown] = useState({});
  const [premiumEstimates, setPremiumEstimates] = useState({});
  const [activeDeclines, setActiveDeclines] = useState([]);
  const [activeReferrals, setActiveReferrals] = useState([]);
  const [requiredInspections, setRequiredInspections] = useState([]);
  
  // Progressive disclosure state
  const [showSections, setShowSections] = useState({
    eligibility: true,      // Always visible
    insuranceHistory: false,// After eligibility passes
    property: false,        // After insurance history
    systems: false,         // After property basics
    location: false,        // After systems
    windMit: false,         // After location
    liabilityRisks: false,  // After wind mit
    personalFactors: false, // After liability
    coverage: false,        // After personal factors
    finalQuote: false       // After coverage
  });
  
  const [formData, setFormData] = useState({
    // === SECTION 1: HO3 ELIGIBILITY ===
    occupancy: '',
    roofAge: '',
    
    // === SECTION 2: INSURANCE HISTORY (CLUE) ===
    priorCarrier: '',
    yearsWithPriorCarrier: '',
    priorInsuranceStatus: '',
    coverageLapseDays: 0,
    hasClaims: false,
    claimCount: 0,
    claims: [],
    
    // === SECTION 3: PROPERTY BASICS ===
    propertyAddress: '',
    zipCode: '',
    yearBuilt: '',
    squareFeet: '',
    stories: '1',
    foundationType: '',
    
    // === SECTION 4: CONSTRUCTION & SYSTEMS ===
    exteriorWalls: '',
    roofShape: '',
    roofMaterial: '',
    lastRoofReplacement: '',
    
    // Electrical System
    electricalPanel: '',
    electricalAmperage: '',
    electricalUpdateYear: '',
    wiringType: '',
    
    // Plumbing System
    plumbingType: '',
    plumbingUpdateYear: '',
    waterHeaterType: '',
    waterHeaterAge: '',
    
    // HVAC System
    hvacType: '',
    hvacAge: '',
    heatingType: '',
    
    // === SECTION 5: LOCATION & CATASTROPHE ===
    county: '',
    distanceToCoast: '',
    barrierIsland: false,
    windZone: '',
    floodZone: '',
    distanceToFireHydrant: '',
    distanceToFireStation: '',
    
    // === SECTION 6: WIND MITIGATION ===
    roofDeckAttachment: '',
    roofWallConnection: '',
    secondaryWaterResistance: '',
    openingProtection: '',
    
    // === SECTION 7: LIABILITY RISKS ===
    // Pool
    hasPool: false,
    poolType: '',
    poolFence: '',
    hasDivingBoard: false,
    hasSlide: false,
    hasPoolHouse: false,
    screenEnclosure: false,
    
    // Pets/Animals
    hasDogs: false,
    dogBreeds: [],
    dogBiteHistory: false,
    numberOfDogs: 0,
    
    // Other Hazards
    hasTrampoline: false,
    trampolineNetted: false,
    
    // Business Operations
    businessType: 'None',
    businessDescription: '',
    clientsVisit: false,
    
    // === SECTION 8: PERSONAL FACTORS ===
    creditScore: '',
    primaryInsuredAge: '',
    maritalStatus: '',
    yearsAtAddress: '',
    
    // === SECTION 9: COVERAGE SELECTION ===
    dwellingLimit: 0,
    otherStructuresLimit: 0,
    personalPropertyLimit: 0,
    personalPropertyType: 'Replacement Cost',
    lossOfUseLimit: 0,
    liabilityLimit: '300000',
    medicalPayments: '5000',
    
    // Deductibles
    allOtherPerilsDeductible: '2500',
    hurricaneDeductible: '2%',
    
    // Optional Coverages
    waterBackup: false,
    equipmentBreakdown: false,
    serviceLine: false,
    identityTheft: false,
    sinkholeOption: 'Catastrophic Only',
    ordinanceOrLaw: '25%',
    moldCoverage: '10000'
  });
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const revealSection = (section) => {
    setShowSections(prev => ({ ...prev, [section]: true }));
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  const resetForm = () => {
    if (confirm('Reset all data and start over? This cannot be undone.')) {
      window.location.reload();
    }
  };
  
  const saveScenario = () => {
    const scenario = {
      name: prompt('Name this scenario:') || `Scenario ${Date.now()}`,
      data: formData,
      premium: premiumEstimate,
      riskScore,
      timestamp: new Date().toISOString()
    };
    
    const saved = JSON.parse(localStorage.getItem('savedScenarios') || '[]');
    saved.push(scenario);
    localStorage.setItem('savedScenarios', JSON.stringify(saved));
    alert(`Scenario "${scenario.name}" saved! You can compare scenarios later.`);
  };
  
  const loadScenario = () => {
    const saved = JSON.parse(localStorage.getItem('savedScenarios') || '[]');
    if (saved.length === 0) {
      alert('No saved scenarios found.');
      return;
    }
    
    const scenarioList = saved.map((s, i) => `${i + 1}. ${s.name} - $${s.premium}/yr`).join('\n');
    const choice = prompt(`Saved Scenarios:\n\n${scenarioList}\n\nEnter number to load:`);
    
    if (choice) {
      const index = parseInt(choice) - 1;
      if (saved[index]) {
        setFormData(saved[index].data);
        alert(`Loaded: ${saved[index].name}`);
      }
    }
  };
  
  // Check for immediate declines
  useEffect(() => {
    const declines = [];
    
    if (formData.roofAge && parseInt(formData.roofAge) > 25) {
      declines.push({
        title: 'Roof Too Old',
        message: 'Roof age ' + formData.roofAge + ' years exceeds 25-year maximum',
        fix: 'Replace roof or apply to Citizens Property Insurance',
        cost: '$12,000-25,000 for roof replacement'
      });
    }
    
    if (formData.plumbingType === 'Polybutylene') {
      declines.push({
        title: 'Polybutylene Plumbing',
        message: 'Polybutylene pipes are uninsurable - prone to sudden failure',
        fix: 'Complete re-piping required before coverage',
        cost: '$8,000-15,000 to re-pipe home',
        context: 'Installed 1978-1995. Class-action lawsuits. All carriers decline.'
      });
    }
    
    if (formData.electricalPanel === 'Federal Pacific (FPE)' || formData.electricalPanel === 'Zinsco/Sylvania') {
      declines.push({
        title: 'Defective Electrical Panel',
        message: formData.electricalPanel + ' panels are fire hazards - automatic decline',
        fix: 'Replace with modern breaker panel',
        cost: '$1,500-3,000 for panel replacement',
        context: 'Breakers fail to trip during overload. Documented fire risk.'
      });
    }
    
    if (formData.hasPool && formData.poolFence === 'None') {
      declines.push({
        title: 'Unfenced Pool',
        message: 'Pool without proper barrier = automatic liability decline',
        fix: 'Install 4-ft fence with self-closing, self-latching gate',
        cost: '$2,000-8,000',
        context: 'Florida law requires pool barriers. Child drowning liability.'
      });
    }
    
    if (formData.hasDogs && formData.dogBreeds?.some(breed => restrictedDogBreeds.includes(breed))) {
      declines.push({
        title: 'Restricted Dog Breed',
        message: 'Dog breed on restricted list - most carriers decline',
        fix: 'Sign animal liability exclusion or try Citizens',
        context: 'Florida is #2 for dog bite claims. High liability risk.'
      });
    }
    
    if (formData.businessType === 'Daycare/Childcare') {
      declines.push({
        title: 'In-Home Daycare',
        message: 'Daycare operations require commercial policy',
        fix: 'Obtain commercial general liability policy',
        context: 'Child liability exposure too high for homeowners policy.'
      });
    }
    
    const claimCount = formData.claims?.length || 0;
    if (claimCount >= 3) {
      declines.push({
        title: 'Excessive Claims',
        message: claimCount + ' claims in 5 years = standard market decline',
        fix: 'Wait for claims to age off (beyond 5 years) or try Citizens/E&S',
        context: 'Claims frequency indicates high-risk property.'
      });
    }
    
    setActiveDeclines(declines);
  }, [formData]);
  
  // Determine required inspections
  useEffect(() => {
    const inspections = [];
    
    if (formData.yearBuilt && (2025 - parseInt(formData.yearBuilt)) >= 40) {
      inspections.push({
        name: '4-Point Inspection',
        cost: 150,
        why: 'Home is 40+ years old',
        inspects: 'Roof, Electrical, Plumbing, HVAC',
        canDecline: 'If finds FPE panel, polybutylene, or major issues'
      });
    }
    
    if (formData.roofAge && parseInt(formData.roofAge) >= 15) {
      inspections.push({
        name: 'Roof Certification',
        cost: 125,
        why: 'Roof is 15+ years old',
        inspects: 'Roof condition and remaining lifespan',
        canDecline: 'If less than 3 years remaining life'
      });
    }
    
    if (formData.distanceToCoast && parseFloat(formData.distanceToCoast) < 10) {
      inspections.push({
        name: 'Wind Mitigation Inspection',
        cost: 150,
        why: 'Coastal location (within 10 miles)',
        inspects: 'Hurricane-resistant construction features',
        savings: 'Can save 15-45% on premium ($300-1,500/year)'
      });
    }
    
    setRequiredInspections(inspections);
  }, [formData]);
  
  // Calculate comprehensive premium
  useEffect(() => {
    if (!formData.squareFeet || !formData.yearBuilt) {
      setPremiumEstimate(0);
      return;
    }
    
    const sqft = parseInt(formData.squareFeet);
    const replacementCost = sqft * 150;
    
    // Base rate 0.8%
    let premium = replacementCost * 0.008;
    const breakdown = {
      replacementCost,
      base: premium,
      adjustments: []
    };
    
    // County multiplier
    const countyMult = {
      'Miami-Dade': 1.5, 'Monroe': 1.8, 'Broward': 1.4, 'Orange': 1.0, 'Duval': 0.85
    }[formData.county] || 1.0;
    if (countyMult !== 1.0) {
      const adj = premium * (countyMult - 1.0);
      premium *= countyMult;
      breakdown.adjustments.push({ name: `${formData.county} County (×${countyMult})`, amount: adj });
    }
    
    // Construction
    if (formData.exteriorWalls === 'Frame') {
      const adj = premium * 0.15;
      premium *= 1.15;
      breakdown.adjustments.push({ name: 'Frame Construction (+15%)', amount: adj });
    } else if (formData.exteriorWalls === 'Masonry/Concrete Block (CBS)') {
      const adj = premium * -0.10;
      premium *= 0.90;
      breakdown.adjustments.push({ name: 'CBS Construction (-10%)', amount: adj });
    }
    
    // Roof age (BIGGEST IMPACT)
    if (formData.roofAge) {
      const age = parseInt(formData.roofAge);
      let mult = 1.0;
      if (age <= 5) mult = 0.85;
      else if (age <= 10) mult = 1.0;
      else if (age <= 15) mult = 1.25;
      else if (age <= 20) mult = 1.75;
      else mult = 2.5;
      
      if (mult !== 1.0) {
        const adj = premium * (mult - 1.0);
        premium *= mult;
        const pct = Math.round((mult - 1.0) * 100);
        breakdown.adjustments.push({ name: `Roof Age ${age}y (${pct > 0 ? '+' : ''}${pct}%)`, amount: adj });
      }
    }
    
    // Building age
    const buildingAge = 2025 - parseInt(formData.yearBuilt);
    if (buildingAge >= 40) {
      const adj = premium * 0.30;
      premium *= 1.30;
      breakdown.adjustments.push({ name: 'Building Age 40+ years (+30%)', amount: adj });
    } else if (buildingAge >= 30) {
      const adj = premium * 0.15;
      premium *= 1.15;
      breakdown.adjustments.push({ name: 'Building Age 30-39 years (+15%)', amount: adj });
    }
    
    // Wind zone
    if (formData.windZone) {
      const mult = { '1': 1.5, '2': 1.3, '3': 1.1, 'X': 1.0 }[formData.windZone];
      if (mult !== 1.0) {
        const adj = premium * (mult - 1.0);
        premium *= mult;
        breakdown.adjustments.push({ name: `Wind Zone ${formData.windZone} (+${Math.round((mult-1)*100)}%)`, amount: adj });
      }
    }
    
    // Wind mitigation
    let windDiscount = 0;
    if (formData.roofShape === 'Hip') windDiscount += 12;
    if (formData.openingProtection === 'Impact glass') windDiscount += 20;
    if (formData.roofWallConnection === 'Double wraps') windDiscount += 15;
    if (windDiscount > 0) {
      const adj = premium * -(windDiscount / 100);
      premium *= (1 - windDiscount / 100);
      breakdown.adjustments.push({ name: `Wind Mitigation (-${windDiscount}%)`, amount: adj });
    }
    
    // Claims
    const claimCount = formData.claims?.length || 0;
    if (claimCount === 0 && formData.hasClaims === false) {
      const adj = premium * -0.05;
      premium *= 0.95;
      breakdown.adjustments.push({ name: 'Claims-Free (-5%)', amount: adj });
    } else if (claimCount > 0) {
      const loadPct = claimCount === 1 ? 0.10 : claimCount === 2 ? 0.25 : 0.50;
      const adj = premium * loadPct;
      premium *= (1 + loadPct);
      breakdown.adjustments.push({ name: `${claimCount} Claims (+${Math.round(loadPct*100)}%)`, amount: adj });
    }
    
    // Credit score (40-80% impact!)
    if (formData.creditScore) {
      const creditMult = {
        'Excellent (760+)': 0.70,
        'Good (700-759)': 0.85,
        'Fair (640-699)': 1.0,
        'Below Average (580-639)': 1.40,
        'Poor (under 580)': 1.80
      }[formData.creditScore] || 1.0;
      
      if (creditMult !== 1.0) {
        const adj = premium * (creditMult - 1.0);
        premium *= creditMult;
        const pct = Math.round((creditMult - 1.0) * 100);
        breakdown.adjustments.push({ name: `Credit Score (${pct > 0 ? '+' : ''}${pct}%)`, amount: adj });
      }
    }
    
    // Pool
    if (formData.hasPool) {
      const adj = 150;
      premium += adj;
      breakdown.adjustments.push({ name: 'Swimming Pool Liability', amount: adj });
    }
    
    // Dog
    if (formData.hasDogs && !formData.dogBreeds?.some(b => restrictedDogBreeds.includes(b))) {
      const adj = 75;
      premium += adj;
      breakdown.adjustments.push({ name: 'Dog Liability', amount: adj });
    }
    
    // Fire protection
    if (formData.distanceToFireHydrant && parseFloat(formData.distanceToFireHydrant) > 1000) {
      const adj = premium * 0.15;
      premium *= 1.15;
      breakdown.adjustments.push({ name: 'Poor Fire Protection (+15%)', amount: adj });
    }
    
    // Deductible credits
    if (formData.allOtherPerilsDeductible === '5000') {
      const adj = premium * -0.10;
      premium *= 0.90;
      breakdown.adjustments.push({ name: '$5,000 Deductible (-10%)', amount: adj });
    } else if (formData.allOtherPerilsDeductible === '10000') {
      const adj = premium * -0.20;
      premium *= 0.80;
      breakdown.adjustments.push({ name: '$10,000 Deductible (-20%)', amount: adj });
    }
    
    // Optional coverages
    if (formData.waterBackup) {
      premium += 75;
      breakdown.adjustments.push({ name: 'Water Backup Coverage', amount: 75 });
    }
    if (formData.equipmentBreakdown) {
      premium += 40;
      breakdown.adjustments.push({ name: 'Equipment Breakdown', amount: 40 });
    }
    if (formData.serviceLine) {
      premium += 35;
      breakdown.adjustments.push({ name: 'Service Line Coverage', amount: 35 });
    }
    
    // Florida fees
    const fees = {
      FHCF: Math.round(premium * 0.01),
      FIGA: Math.round(premium * 0.01),
      EMPA: Math.round(premium * 0.004),
      policy: 25,
      inspection: requiredInspections.reduce((sum, i) => sum + (i.cost || 0), 0)
    };
    
    breakdown.fees = fees;
    const total = premium + Object.values(fees).reduce((a, b) => a + b, 0);
    
    setPremiumEstimate(Math.round(total));
    setPremiumBreakdown(breakdown);
    
    // Carrier-specific
    setPremiumEstimates({
      'Progressive': Math.round(total * 0.95),
      'Universal': Math.round(total * 1.0),
      'Tower Hill': Math.round(total * 1.10),
      'FedNat': Math.round(total * 1.05),
      'Citizens': Math.round(total * 1.08)
    });
  }, [formData, requiredInspections]);
  
  // Calculate risk score
  useEffect(() => {
    let score = 40;
    const factors = [{ name: 'Base Score', impact: 40 }];
    
    // All risk factors...
    if (formData.roofAge) {
      const age = parseInt(formData.roofAge);
      if (age <= 5) {
        score -= 20;
        factors.push({ name: `Roof ${age}y (Excellent)`, impact: -20 });
      } else if (age <= 10) {
        score -= 10;
        factors.push({ name: `Roof ${age}y (Good)`, impact: -10 });
      } else if (age <= 15) {
        score += 10;
        factors.push({ name: `Roof ${age}y (Older)`, impact: 10 });
      } else if (age <= 20) {
        score += 25;
        factors.push({ name: `Roof ${age}y (Very Old)`, impact: 25 });
      } else {
        score += 40;
        factors.push({ name: `Roof ${age}y (Critical)`, impact: 40 });
      }
    }
    
    if (formData.claims?.length > 0) {
      const impact = formData.claims.length * 15;
      score += impact;
      factors.push({ name: `${formData.claims.length} Claims`, impact });
    }
    
    if (formData.plumbingType === 'Polybutylene') {
      score += 50;
      factors.push({ name: 'Polybutylene Plumbing', impact: 50 });
    }
    
    if (formData.electricalPanel === 'Federal Pacific (FPE)' || formData.electricalPanel === 'Zinsco/Sylvania') {
      score += 50;
      factors.push({ name: 'Defective Panel', impact: 50 });
    }
    
    if (formData.hasPool && formData.poolFence === 'None') {
      score += 50;
      factors.push({ name: 'Unfenced Pool', impact: 50 });
    }
    
    score = Math.max(0, Math.min(100, score));
    setRiskScore(score);
    setRiskFactors(factors);
  }, [formData]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Complete HO3 Underwriting Simulator</h1>
              <p className="text-sm text-gray-600">50+ Real-World Underwriting Factors - Florida Homeowners Insurance</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={resetForm}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  title="Reset all data"
                >
                  🔄 Reset
                </button>
                <button
                  onClick={saveScenario}
                  className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                  title="Save this scenario"
                >
                  💾 Save
                </button>
                <button
                  onClick={loadScenario}
                  className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                  title="Load saved scenario"
                >
                  📂 Load
                </button>
              </div>
              
              <RiskMeter score={riskScore} factors={riskFactors} />
              
              <div className="relative group">
                <div className="text-right">
                  <div className="text-xs text-gray-500 uppercase">Premium</div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${premiumEstimate > 0 ? premiumEstimate.toLocaleString() : '---'}
                  </div>
                  <div className="text-xs text-gray-500">
                    ${premiumEstimate > 0 ? Math.round(premiumEstimate / 12).toLocaleString() : '---'}/mo
                  </div>
                </div>
                
                {premiumEstimate > 0 && premiumBreakdown.adjustments && (
                  <div className="invisible group-hover:visible absolute top-full right-0 mt-2 bg-white border-2 border-blue-300 rounded-lg p-4 shadow-xl z-50 w-96">
                    <div className="font-bold mb-2">Premium Breakdown:</div>
                    <div className="space-y-1 text-xs max-h-96 overflow-y-auto">
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="flex justify-between font-semibold">
                          <span>Replacement Cost:</span>
                          <span>${replacementCost.toLocaleString()}</span>
                        </div>
                        <div className="text-gray-600">{formData.squareFeet} sqft × $150</div>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Base Rate (0.8%)</span>
                        <span className="font-semibold">${Math.round(premiumBreakdown.base).toLocaleString()}</span>
                      </div>
                      
                      {premiumBreakdown.adjustments.map((adj, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-gray-600">{adj.name}</span>
                          <span className={`font-semibold ${adj.amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {adj.amount > 0 ? '+' : ''}${Math.round(Math.abs(adj.amount)).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      
                      <div className="border-t pt-1 flex justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600">${premiumEstimate.toLocaleString()}</span>
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Decline/Referral Alerts */}
            <AnimatePresence>
              {activeDeclines.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-500 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold text-red-900 mb-3">
                    ❌ CANNOT ISSUE POLICY - Critical Issues Found
                  </h3>
                  <div className="space-y-3">
                    {activeDeclines.map((decline, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4">
                        <p className="font-bold text-red-800 text-lg">{decline.title}</p>
                        <p className="text-sm text-gray-800 mt-1">{decline.message}</p>
                        {decline.context && (
                          <p className="text-xs text-gray-600 mt-2"><strong>Why:</strong> {decline.context}</p>
                        )}
                        <p className="text-sm text-blue-700 mt-2"><strong>Fix:</strong> {decline.fix}</p>
                        {decline.cost && (
                          <p className="text-xs text-gray-600 mt-1"><strong>Cost:</strong> {decline.cost}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Required Inspections Alert */}
            <AnimatePresence>
              {requiredInspections.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4"
                >
                  <h3 className="text-lg font-bold text-blue-900 mb-2">
                    🔍 Required Inspections Before Binding
                  </h3>
                  <div className="space-y-2">
                    {requiredInspections.map((insp, idx) => (
                      <div key={idx} className="bg-white rounded p-3 text-sm">
                        <div className="flex justify-between">
                          <span className="font-bold">{insp.name}</span>
                          <span className="text-blue-700">${insp.cost}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1"><strong>Why:</strong> {insp.why}</p>
                        <p className="text-xs text-gray-600"><strong>Inspects:</strong> {insp.inspects}</p>
                        {insp.savings && (
                          <p className="text-xs text-green-700 mt-1">💰 {insp.savings}</p>
                        )}
                        {insp.canDecline && (
                          <p className="text-xs text-red-700 mt-1">⚠️ Can decline if: {insp.canDecline}</p>
                        )}
                      </div>
                    ))}
                    <div className="bg-yellow-50 p-2 rounded mt-2">
                      <p className="text-sm font-bold">
                        Total: ${requiredInspections.reduce((sum, i) => sum + i.cost, 0)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Rest of the comprehensive form continues... */}
            <ComprehensiveHO3Form
              formData={formData}
              updateField={updateField}
              showSections={showSections}
              revealSection={revealSection}
              setCurrentField={setCurrentField}
            />
            
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProgressIndicator showSections={showSections} activeDeclines={activeDeclines} />
            <ExpandedCarrierMatrix riskProfile={formData} premiumEstimates={premiumEstimates} />
            <EducationalSidebar currentField={currentField} riskProfile={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveHO3;


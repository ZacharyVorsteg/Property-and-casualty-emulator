// Comprehensive HO3 Underwriting Rules for Florida

// Critical Decline Factors (Automatic Rejection)
export const immediateDeclineReasons = {
  // Roof Issues
  roofTooOld: {
    check: (roofAge) => roofAge > 25,
    message: 'Roof age exceeds 25 years - uninsurable without replacement',
    alternative: 'Replace roof or try Citizens Property Insurance',
    severity: 'CRITICAL'
  },
  
  // Plumbing Issues
  polybutylenePlumbing: {
    check: (plumbingType) => plumbingType === 'Polybutylene',
    message: 'Polybutylene plumbing is uninsurable - prone to failure and leaks',
    alternative: 'Must re-pipe entire home before coverage available',
    severity: 'CRITICAL',
    cost: '$8,000-15,000 to replace',
    context: 'Installed 1978-1995, fails catastrophically. All carriers decline.'
  },
  
  // Electrical Panel Issues
  federalPacificPanel: {
    check: (panelType) => panelType === 'Federal Pacific (FPE)',
    message: 'FPE Stab-Lok panels are fire hazards - automatic decline',
    alternative: 'Replace panel with modern breaker box ($1,500-3,000)',
    severity: 'CRITICAL',
    context: 'FPE panels fail to trip during overload. Documented fire risk.'
  },
  
  zinscoPanel: {
    check: (panelType) => panelType === 'Zinsco/Sylvania',
    message: 'Zinsco panels are defective - automatic decline',
    alternative: 'Replace with approved panel',
    severity: 'CRITICAL',
    context: 'Known to overheat and cause fires. All carriers decline.'
  },
  
  fusePanel: {
    check: (panelType) => panelType === 'Fuses (screw-in)',
    message: 'Fuse panels obsolete - must upgrade to breakers',
    alternative: 'Upgrade to 100-200 amp breaker panel',
    severity: 'HIGH',
    context: 'Pre-1960s technology. Fire risk and inadequate capacity.'
  },
  
  // Wiring Issues
  knobAndTube: {
    check: (wiringType) => wiringType === 'Knob & Tube',
    message: 'Knob & tube wiring uninsurable - extreme fire hazard',
    alternative: 'Complete rewiring required',
    severity: 'CRITICAL',
    cost: '$10,000-25,000',
    context: 'Pre-1930s wiring. No ground wire, cloth insulation degrades.'
  },
  
  aluminumWiring: {
    check: (wiringType) => wiringType === 'Aluminum (branch circuits)',
    message: 'Aluminum wiring decline unless remediated',
    alternative: 'Install COPALUM connectors or rewire ($2,000-5,000)',
    severity: 'HIGH',
    context: '1960s-70s wiring. Connections overheat. Require licensed repair.'
  },
  
  // Pool Safety
  unfencedPool: {
    check: (hasPool, poolFence) => hasPool && poolFence === 'None',
    message: 'Unfenced pool = automatic liability decline',
    alternative: 'Install 4-ft fence with self-closing, self-latching gate',
    severity: 'CRITICAL',
    cost: '$2,000-8,000',
    context: 'Florida law requires pool barriers. Child drowning liability too high.'
  },
  
  // Dog Breeds
  restrictedDogBreed: {
    check: (hasDogs, dogBreeds) => {
      const restricted = ['Pit Bull', 'Rottweiler', 'Doberman', 'Chow', 'Akita', 'Wolf Hybrid', 'Mastiff', 'Presa Canario', 'Alaskan Malamute', 'Siberian Husky'];
      return hasDogs && dogBreeds?.some(breed => restricted.includes(breed));
    },
    message: 'Restricted dog breed - most carriers decline',
    alternative: 'Sign animal liability exclusion or try Citizens',
    severity: 'HIGH',
    context: 'Florida is #2 for dog bite claims. These breeds have higher liability.'
  },
  
  dogBiteHistory: {
    check: (hasDogs, dogBiteHistory) => hasDogs && dogBiteHistory === true,
    message: 'Previous dog bite incident - automatic decline',
    alternative: 'Remove dog or find specialty market',
    severity: 'CRITICAL',
    context: 'Any dog with bite history is uninsurable by standard carriers.'
  },
  
  // Trampoline
  trampoline: {
    check: (hasTrampoline) => hasTrampoline === true,
    message: 'Trampoline = high injury risk - many carriers decline',
    alternative: 'Remove trampoline or sign exclusion',
    severity: 'MODERATE',
    context: 'Attractive nuisance. Neck/spine injury liability. Most exclude coverage.'
  },
  
  // Business Operations
  daycare: {
    check: (businessType) => businessType === 'Daycare/Childcare',
    message: 'In-home daycare requires commercial policy',
    alternative: 'Obtain commercial general liability policy',
    severity: 'CRITICAL',
    context: 'Child liability exposure too high for homeowners policy.'
  },
  
  // Claims History
  excessiveClaims: {
    check: (claimCount) => claimCount >= 3,
    message: '3+ claims in 5 years = standard market decline',
    alternative: 'Wait for claims to age off or try Citizens/E&S markets',
    severity: 'HIGH',
    context: 'Claims frequency indicates high-risk property or poor maintenance.'
  },
  
  openClaim: {
    check: (hasOpenClaim) => hasOpenClaim === true,
    message: 'Cannot bind with open/pending claim',
    alternative: 'Wait until claim closes, then reapply',
    severity: 'CRITICAL',
    context: 'Open claim indicates ongoing loss. Uninsurable until resolved.'
  },
  
  // Insurance History
  cancelledNonPayment: {
    check: (priorInsurance) => priorInsurance === 'Cancelled - Non-payment',
    message: 'Prior cancellation for non-payment = decline',
    alternative: 'Explain circumstances to underwriter (unlikely to help)',
    severity: 'CRITICAL',
    context: 'Indicates financial instability. Major red flag.'
  },
  
  lapsedCoverage: {
    check: (coverageLapse) => coverageLapse > 30,
    message: 'Coverage lapse >30 days = decline or surcharge',
    alternative: 'Explain reason for gap to underwriter',
    severity: 'HIGH',
    context: 'Insurance lapse suggests adverse selection or financial issues.'
  },
  
  // Occupancy
  notOwnerOccupied: {
    check: (occupancy) => occupancy !== 'Owner-occupied',
    message: 'HO3 requires owner-occupied primary residence',
    alternative: 'Rental = DP3, Seasonal = HO3 with endorsement, Vacant = Vacant policy',
    severity: 'CRITICAL',
    context: 'HO3 is specifically for homes where owner lives full-time.'
  },
  
  // Location
  floodVelocityZone: {
    check: (floodZone) => floodZone?.startsWith('V'),
    message: 'Velocity flood zone - very limited carriers',
    alternative: 'Citizens or specialty coastal market',
    severity: 'HIGH',
    context: 'Wave action zones. Many carriers won\'t write coastal high-velocity.'
  }
};

// Referral to Underwriter Triggers
export const referralReasons = {
  twoRecentClaims: {
    check: (claimCount) => claimCount === 2,
    message: '2 claims in 5 years requires underwriter review',
    context: 'May be acceptable if claims were small or CAT events'
  },
  
  lowCreditScore: {
    check: (creditScore) => creditScore < 600,
    message: 'Below-average credit requires review',
    context: 'Will result in higher premium tier (40-80% increase)'
  },
  
  businessUse: {
    check: (businessType) => businessType && businessType !== 'None' && businessType !== 'Home Office Only',
    message: 'Business use requires underwriter approval',
    context: 'May need endorsement or exclusion'
  },
  
  oldHomeNoUpdates: {
    check: (yearBuilt, electricalYear, plumbingYear) => {
      const age = 2025 - yearBuilt;
      return age > 50 && (!electricalYear || yearBuilt - electricalYear > 40);
    },
    message: 'Very old home without updates needs review',
    context: 'Require proof of updates or detailed inspection'
  },
  
  priorNonRenewal: {
    check: (priorInsurance) => priorInsurance === 'Non-renewed by carrier',
    message: 'Prior non-renewal needs explanation',
    context: 'Need to understand why previous carrier dropped coverage'
  },
  
  highValueHome: {
    check: (dwellingLimit) => dwellingLimit > 750000,
    message: 'High-value home requires special underwriting',
    context: 'May need high-value homeowners program or Chubb/AIG/PURE'
  },
  
  mixedUseProperty: {
    check: (businessType) => businessType === 'Client Visits',
    message: 'Mixed business/personal use needs review',
    context: 'May require business liability endorsement'
  }
};

// Inspection Requirements
export const inspectionRequirements = {
  fourPoint: {
    trigger: (yearBuilt) => (2025 - yearBuilt) >= 40,
    name: '4-Point Inspection',
    cost: 150,
    validity: '2 years',
    inspects: ['Roof', 'Electrical', 'Plumbing', 'HVAC'],
    description: 'Required for homes 40+ years old. Verifies main systems are functional and updated.',
    canDecline: true,
    declineReasons: [
      'Roof in poor condition',
      'FPE/Zinsco panel found',
      'Polybutylene plumbing found',
      'HVAC non-functional',
      'Active leaks or damage'
    ]
  },
  
  windMitigation: {
    trigger: (distanceToCoast) => distanceToCoast < 10,
    name: 'Wind Mitigation Inspection',
    cost: 150,
    validity: '5 years',
    inspects: ['Roof shape', 'Roof deck attachment', 'Roof-to-wall connection', 'Opening protection', 'Secondary water resistance'],
    description: 'Documents hurricane-resistant features. Can save 15-45% on premium.',
    savings: '15-45% annually',
    required: false,
    recommended: true
  },
  
  roofCertification: {
    trigger: (roofAge) => roofAge >= 15,
    name: 'Roof Certification',
    cost: 125,
    validity: '1 year',
    inspects: ['Roof condition', 'Remaining lifespan'],
    description: 'Required for roofs 15+ years old. Must certify 3-5 years remaining life.',
    canDecline: true,
    declineReasons: [
      'Less than 3 years remaining life',
      'Visible damage or wear',
      'Missing shingles',
      'Granule loss >30%',
      'Flashing deteriorated'
    ]
  }
};

// Credit Score Impact (40-80% premium variance)
export const creditScoreImpact = {
  'Excellent (760+)': { multiplier: 0.70, description: 'Best rates - 30% discount from average' },
  'Good (700-759)': { multiplier: 0.85, description: 'Good rates - 15% discount' },
  'Fair (640-699)': { multiplier: 1.0, description: 'Standard rates - baseline' },
  'Below Average (580-639)': { multiplier: 1.40, description: 'Higher rates - 40% surcharge' },
  'Poor (<580)': { multiplier: 1.80, description: 'Highest rates - 80% surcharge, limited carriers' }
};

// Restricted Dog Breeds (Florida carriers)
export const restrictedDogBreeds = [
  'Pit Bull',
  'American Staffordshire Terrier',
  'Rottweiler',
  'Doberman Pinscher',
  'Chow Chow',
  'Akita',
  'Wolf Hybrid',
  'Mastiff',
  'Presa Canario',
  'Alaskan Malamute',
  'Siberian Husky',
  'German Shepherd (sometimes)',
  'Great Dane (sometimes)'
];

// Electrical Panel Types
export const electricalPanels = {
  'Modern Breaker Panel': { acceptable: true, note: 'Standard - no issues' },
  'Federal Pacific (FPE)': { acceptable: false, mustReplace: true, hazard: 'Fire risk - breakers fail to trip' },
  'Zinsco/Sylvania': { acceptable: false, mustReplace: true, hazard: 'Overheating and fire risk' },
  'Challenger': { acceptable: false, mustReplace: true, hazard: 'Known defects' },
  'Fuses (screw-in)': { acceptable: false, mustUpgrade: true, hazard: 'Obsolete, inadequate capacity' },
  'Pushmatic': { acceptable: 'conditional', note: 'Some carriers decline, others allow' },
  'Split-Bus Panel': { acceptable: 'conditional', note: 'Older but may be acceptable if functional' }
};

// Plumbing Types
export const plumbingTypes = {
  'Copper': { acceptable: true, lifespan: '50+ years', note: 'Excellent - industry standard' },
  'PEX': { acceptable: true, lifespan: '40+ years', note: 'Modern, flexible, good' },
  'CPVC': { acceptable: true, lifespan: '40+ years', note: 'Common in Florida' },
  'PVC (drains only)': { acceptable: true, note: 'Standard for drain lines' },
  'Polybutylene': { 
    acceptable: false, 
    lifespan: 'Failures common after 15 years',
    note: 'UNINSURABLE - must replace',
    installedWhen: '1978-1995',
    problem: 'Reacts with chlorine, sudden failures, class-action lawsuits'
  },
  'Galvanized Steel': { 
    acceptable: 'conditional', 
    lifespan: '40-50 years but corrodes',
    note: 'If original and 60+ years old, may require replacement',
    problem: 'Internal corrosion, low pressure, leaks'
  },
  'Lead Pipes': { acceptable: false, note: 'Health hazard - must replace' }
};

// Wiring Types
export const wiringTypes = {
  'Copper (Romex)': { acceptable: true, note: 'Standard modern wiring' },
  'Aluminum (branch circuits)': { 
    acceptable: 'conditional',
    note: 'Require COPALUM connectors or rewire',
    problem: 'Connections overheat, fire risk',
    remedy: 'Licensed electrician certification required'
  },
  'Knob & Tube': { 
    acceptable: false,
    note: 'Pre-1930s wiring - complete rewire required',
    problem: 'No ground, cloth insulation, fire hazard'
  },
  'Mixed (updated)': { acceptable: true, note: 'Verify all circuits updated' }
};

// Business Types (Home-Based)
export const businessTypes = {
  'None': { acceptable: true, impact: 0 },
  'Home Office Only': { acceptable: true, impact: 0, note: 'No client visits, computer work' },
  'Online Sales (no inventory)': { acceptable: true, impact: 50, note: 'May need business property endorsement if inventory' },
  'Client Visits': { acceptable: 'refer', impact: 200, note: 'Require business liability endorsement' },
  'Tutoring (1-2 students)': { acceptable: 'conditional', impact: 75, note: 'Small scale acceptable with endorsement' },
  'Daycare/Childcare': { acceptable: false, note: 'Requires commercial policy - uninsurable on HO3' },
  'Airbnb/Short-term Rental': { acceptable: false, note: 'Need DP3 or short-term rental policy' },
  'Beauty Salon': { acceptable: false, note: 'Commercial operations - need business policy' },
  'Auto Repair': { acceptable: false, note: 'Commercial operations - major liability' }
};

// Fire Protection Classes (ISO)
export const fireProtectionImpact = {
  distanceToHydrant: {
    '<500 ft': { impact: 0, note: 'Excellent fire protection' },
    '500-1000 ft': { impact: 5, note: 'Adequate fire protection' },
    '1000-2000 ft': { impact: 15, note: 'Limited fire protection - higher rates' },
    '>2000 ft': { impact: 30, note: 'Poor fire protection - limited carriers', severity: 'HIGH' }
  },
  
  distanceToFireStation: {
    '<2 miles': { impact: 0, note: 'Excellent response time' },
    '2-5 miles': { impact: 5, note: 'Good response time' },
    '5-10 miles': { impact: 15, note: 'Slower response - higher rates' },
    '>10 miles': { impact: 35, note: 'Rural area - Protection Class 9-10', severity: 'HIGH' }
  }
};

// Coverage Lapse Severity
export const coverageLapseImpact = {
  'Current': { impact: 0, note: 'Continuous coverage - good' },
  '1-30 days': { impact: 5, note: 'Minor gap - small surcharge' },
  '31-60 days': { impact: 20, note: 'Moderate gap - requires explanation' },
  '61-90 days': { impact: 35, note: 'Major gap - limited carriers' },
  '>90 days': { impact: 50, note: 'Extended lapse - very limited carriers', severity: 'HIGH' }
};

// Years with Continuous Insurance (Loyalty)
export const continuousInsuranceCredit = {
  '5+ years': { discount: 5, note: 'Loyalty discount' },
  '3-4 years': { discount: 3, note: 'Minor loyalty discount' },
  '1-2 years': { discount: 0, note: 'Standard' },
  'First-time buyer': { discount: 0, surcharge: 10, note: 'No insurance history - higher rate' }
};

// CLUE Report Claim Types (Severity)
export const claimTypeSeverity = {
  'Hurricane/Named Storm': { severity: 'LOW', impact: 5, note: 'CAT claims less penalized - Act of God' },
  'Water - Plumbing Break': { severity: 'HIGH', impact: 25, note: 'Very common, high-cost claims' },
  'Water - Roof Leak': { severity: 'HIGH', impact: 25, note: 'Indicates roof problems' },
  'Water - Appliance': { severity: 'MODERATE', impact: 15, note: 'Common but preventable' },
  'Fire': { severity: 'SEVERE', impact: 35, note: 'Catastrophic loss - major red flag' },
  'Lightning': { severity: 'LOW', impact: 5, note: 'Act of nature' },
  'Theft/Burglary': { severity: 'MODERATE', impact: 10, note: 'Location concern' },
  'Vandalism': { severity: 'MODERATE', impact: 10, note: 'Occupancy concern' },
  'Liability/Injury': { severity: 'SEVERE', impact: 40, note: 'Lawsuit potential - huge red flag' },
  'Mold': { severity: 'MODERATE', impact: 20, note: 'Ongoing risk, expensive remediation' }
};

// Multiple Water Claims Pattern
export const waterClaimPattern = {
  check: (claims) => {
    const waterClaims = claims.filter(c => c.type?.includes('Water'));
    return waterClaims.length >= 2;
  },
  message: '2+ water claims = pattern risk - likely decline',
  context: 'Indicates chronic plumbing/roof issues or maintenance neglect',
  severity: 'CRITICAL'
};

// Public Adjuster/Attorney Involvement
export const litigationRisk = {
  publicAdjuster: {
    impact: 15,
    note: 'PA involvement = 25-50% higher claim costs',
    context: 'Florida AOB fraud epidemic. Major carrier concern.'
  },
  
  attorneyInvolved: {
    impact: 25,
    note: 'Attorney = litigation risk',
    context: 'Attorney-involved claims cost 3x more. Red flag.'
  },
  
  both: {
    impact: 50,
    note: 'PA + Attorney = fraud indicator',
    context: 'Extreme litigation risk. Most carriers decline.',
    severity: 'CRITICAL'
  }
};

export default {
  immediateDeclineReasons,
  referralReasons,
  inspectionRequirements,
  creditScoreImpact,
  restrictedDogBreeds,
  electricalPanels,
  plumbingTypes,
  wiringTypes,
  businessTypes,
  fireProtectionImpact,
  coverageLapseImpact,
  continuousInsuranceCredit,
  claimTypeSeverity,
  waterClaimPattern,
  litigationRisk
};


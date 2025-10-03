// Florida County Risk Profiles
export const countyRiskProfiles = {
  "Miami-Dade": {
    hurricane_risk: "EXTREME",
    sinkhole_risk: "LOW",
    fraud_risk: "HIGH",
    rate_multiplier: 1.4,
    special_requirements: ["Wind mitigation inspection mandatory"],
    market_notes: "Most nationals pulled out - Citizens dominant"
  },
  "Monroe": {
    hurricane_risk: "EXTREME",
    sinkhole_risk: "LOW",
    fraud_risk: "MODERATE",
    rate_multiplier: 1.6,
    special_requirements: ["Elevation certificate required"],
    market_notes: "Keys properties - only specialty markets"
  },
  "Broward": {
    hurricane_risk: "EXTREME",
    sinkhole_risk: "LOW",
    fraud_risk: "HIGH",
    rate_multiplier: 1.3,
    special_requirements: ["Wind mitigation recommended"],
    market_notes: "Coastal concentration risk"
  },
  "Palm Beach": {
    hurricane_risk: "HIGH",
    sinkhole_risk: "LOW",
    fraud_risk: "MODERATE",
    rate_multiplier: 1.25,
    special_requirements: [],
    market_notes: "Mix of coastal and inland"
  },
  "Pasco": {
    hurricane_risk: "MODERATE",
    sinkhole_risk: "EXTREME",
    fraud_risk: "LOW",
    rate_multiplier: 1.1,
    special_requirements: ["Sinkhole inspection may be required"],
    market_notes: "Many carriers exclude sinkhole coverage"
  },
  "Hernando": {
    hurricane_risk: "MODERATE",
    sinkhole_risk: "EXTREME",
    fraud_risk: "LOW",
    rate_multiplier: 1.15,
    special_requirements: ["Sinkhole inspection may be required"],
    market_notes: "Sinkhole alley - limited markets"
  },
  "Hillsborough": {
    hurricane_risk: "HIGH",
    sinkhole_risk: "HIGH",
    fraud_risk: "MODERATE",
    rate_multiplier: 1.2,
    special_requirements: [],
    market_notes: "Tampa metro - competitive market"
  },
  "Pinellas": {
    hurricane_risk: "HIGH",
    sinkhole_risk: "MODERATE",
    fraud_risk: "MODERATE",
    rate_multiplier: 1.2,
    special_requirements: [],
    market_notes: "Coastal exposure with good markets"
  },
  "Orange": {
    hurricane_risk: "MODERATE",
    sinkhole_risk: "MODERATE",
    fraud_risk: "MODERATE",
    rate_multiplier: 1.0,
    special_requirements: [],
    market_notes: "Orlando metro - good availability"
  },
  "Duval": {
    hurricane_risk: "MODERATE",
    sinkhole_risk: "LOW",
    fraud_risk: "LOW",
    rate_multiplier: 0.9,
    special_requirements: [],
    market_notes: "Jacksonville - competitive pricing"
  },
  "Lee": {
    hurricane_risk: "EXTREME",
    sinkhole_risk: "LOW",
    fraud_risk: "MODERATE",
    rate_multiplier: 1.35,
    special_requirements: ["Wind mitigation inspection mandatory"],
    market_notes: "Fort Myers area - post-Ian challenges"
  },
  "Collier": {
    hurricane_risk: "EXTREME",
    sinkhole_risk: "LOW",
    fraud_risk: "MODERATE",
    rate_multiplier: 1.4,
    special_requirements: ["Wind mitigation inspection mandatory"],
    market_notes: "Naples area - high-value homes"
  }
};

// High-risk ZIP codes
export const highRiskZips = {
  "33109": "Miami Beach - Extreme wind zone",
  "33139": "South Beach - Flood zone + wind",
  "33040": "Key West - Highest catastrophe zone",
  "33050": "Marathon - Keys exposure",
  "34229": "Osprey - High sinkhole activity",
  "34667": "Hudson - Sinkhole prone",
  "34668": "Port Richey - Sinkhole area",
  "33957": "Fort Myers Beach - Extreme wind",
  "34216": "Anna Maria - Barrier island"
};

// Florida counties (all 67)
export const floridaCounties = [
  "Alachua", "Baker", "Bay", "Bradford", "Brevard", "Broward", "Calhoun", "Charlotte",
  "Citrus", "Clay", "Collier", "Columbia", "DeSoto", "Dixie", "Duval", "Escambia",
  "Flagler", "Franklin", "Gadsden", "Gilchrist", "Glades", "Gulf", "Hamilton", "Hardee",
  "Hendry", "Hernando", "Highlands", "Hillsborough", "Holmes", "Indian River", "Jackson",
  "Jefferson", "Lafayette", "Lake", "Lee", "Leon", "Levy", "Liberty", "Madison",
  "Manatee", "Marion", "Martin", "Miami-Dade", "Monroe", "Nassau", "Okaloosa", "Okeechobee",
  "Orange", "Osceola", "Palm Beach", "Pasco", "Pinellas", "Polk", "Putnam", "St. Johns",
  "St. Lucie", "Santa Rosa", "Sarasota", "Seminole", "Sumter", "Suwannee", "Taylor",
  "Union", "Volusia", "Wakulla", "Walton", "Washington"
].sort();

// Carrier Appetite Matrix
export const carrierMatrix = {
  "Progressive": {
    roofAge: { max: 15 },
    windZone: ["3", "X"],
    minWindMit: 3,
    lossHistory: { max: 1 },
    TIV: { min: 200000, max: 750000 },
    creditScore: { min: 650 },
    competitiveFactors: ["Multi-policy", "Claims-free 5+ years"]
  },
  "Universal Property & Casualty": {
    roofAge: { max: 18 },
    windZone: ["2", "3", "X"],
    minWindMit: 2,
    lossHistory: { max: 2 },
    TIV: { min: 150000, max: 500000 },
    creditScore: { min: 600 },
    competitiveFactors: ["Florida-only carrier", "Quick binding"]
  },
  "Tower Hill": {
    roofAge: { max: 20 },
    windZone: ["2", "3", "X"],
    minWindMit: 1,
    lossHistory: { max: 2 },
    TIV: { min: 100000, max: 600000 },
    creditScore: { min: 580 },
    competitiveFactors: ["Accepts older roofs", "ACV settlement"]
  },
  "FedNat": {
    roofAge: { max: 17 },
    windZone: ["2", "3", "X"],
    minWindMit: 2,
    lossHistory: { max: 1 },
    TIV: { min: 150000, max: 400000 },
    creditScore: { min: 600 },
    competitiveFactors: ["Regional carrier"]
  },
  "Citizens Property Insurance": {
    roofAge: { max: 25 },
    windZone: ["1", "2", "3", "X"],
    minWindMit: 0,
    lossHistory: { max: 3 },
    TIV: { min: 0, max: 700000 },
    creditScore: { min: 0 },
    requirements: ["Must have 2 declinations OR be cheapest option"]
  },
  "Lexington (E&S)": {
    roofAge: { max: 30 },
    windZone: ["1", "2", "3", "X"],
    minWindMit: 0,
    lossHistory: { max: 5 },
    TIV: { min: 500000, max: 10000000 },
    creditScore: { min: 0 },
    pricing: "2x standard market minimum"
  }
};

// Wind Mitigation Discount Matrix
export const windMitigationDiscounts = {
  roofShape: {
    "Hip roof": 12,
    "Flat roof": 0,
    "Gable": 0,
    "Complex/Mixed": 5
  },
  roofDeck: {
    "A: 6d nails @ 6\"/12\"": 0,
    "B: 8d nails @ 6\"/12\"": 3,
    "C: 8d nails @ 6\"/6\"": 7,
    "D: Structural screws": 9
  },
  roofWallConnection: {
    "Toe nails": 0,
    "Clips": 9,
    "Single wraps": 12,
    "Double wraps": 15
  },
  secondaryWater: {
    "Yes": 5,
    "No": 0
  },
  openingProtection: {
    "None": 0,
    "Basic": 8,
    "Hurricane shutters": 15,
    "Impact glass": 20,
    "Mixed": 10
  }
};

// Base rates per $100 of coverage by county (simplified)
export const baseRates = {
  "Miami-Dade": 2.4,
  "Monroe": 2.8,
  "Broward": 2.2,
  "Palm Beach": 2.0,
  "Pasco": 1.5,
  "Hernando": 1.6,
  "Hillsborough": 1.7,
  "Pinellas": 1.8,
  "Orange": 1.3,
  "Duval": 1.1,
  "Lee": 2.3,
  "Collier": 2.4,
  // Default for other counties
  "default": 1.4
};


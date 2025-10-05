// Pre-built realistic scenarios for training

export const scenarioPresets = {
  perfectRisk: {
    name: "Perfect Risk - New Construction",
    description: "Brand new home, inland, no claims, excellent credit",
    expectedPremium: "$1,680/year",
    data: {
      occupancy: 'owner_occupied',
      roofAge: '2',
      priorInsuranceStatus: 'Currently Insured',
      hasClaims: false,
      claims: [],
      yearBuilt: '2023',
      squareFeet: '2000',
      exteriorWalls: 'Masonry/Concrete Block (CBS)',
      roofShape: 'Hip',
      electricalPanel: 'Modern Breaker Panel',
      electricalAmperage: '200',
      plumbingType: 'Copper',
      county: 'Orange',
      distanceToCoast: '30',
      windZone: 'X',
      distanceToFireHydrant: '400',
      distanceToFireStation: '1.5',
      openingProtection: 'Impact glass',
      roofWallConnection: 'Double wraps',
      hasPool: false,
      hasDogs: false,
      businessType: 'None',
      hasTrampoline: false,
      creditScore: 'Excellent (760+)',
      maritalStatus: 'Married',
      primaryInsuredAge: '45',
      allOtherPerilsDeductible: '2500',
      hurricaneDeductible: '2%'
    }
  },
  
  typicalRisk: {
    name: "Typical Risk - Average Florida Home",
    description: "2005 build, 12-year roof, one small claim, fair credit",
    expectedPremium: "$3,750/year",
    data: {
      occupancy: 'owner_occupied',
      roofAge: '12',
      priorInsuranceStatus: 'Currently Insured',
      hasClaims: false,
      yearBuilt: '2005',
      squareFeet: '2500',
      exteriorWalls: 'Frame',
      roofShape: 'Gable',
      electricalPanel: 'Modern Breaker Panel',
      plumbingType: 'CPVC',
      county: 'Hillsborough',
      distanceToCoast: '15',
      windZone: '3',
      distanceToFireHydrant: '600',
      distanceToFireStation: '3',
      openingProtection: 'None',
      hasPool: false,
      hasDogs: false,
      businessType: 'None',
      creditScore: 'Fair (640-699)',
      maritalStatus: 'Married',
      allOtherPerilsDeductible: '2500',
      hurricaneDeductible: '2%'
    }
  },
  
  coastalChallenge: {
    name: "Coastal Challenge - High Wind Zone",
    description: "Miami Beach location, Zone 1, older roof",
    expectedPremium: "$8,500/year",
    data: {
      occupancy: 'owner_occupied',
      roofAge: '15',
      priorInsuranceStatus: 'Currently Insured',
      hasClaims: false,
      yearBuilt: '1998',
      squareFeet: '2200',
      exteriorWalls: 'Masonry/Concrete Block (CBS)',
      roofShape: 'Gable',
      electricalPanel: 'Modern Breaker Panel',
      plumbingType: 'Copper',
      county: 'Miami-Dade',
      distanceToCoast: '0.8',
      windZone: '1',
      distanceToFireHydrant: '300',
      distanceToFireStation: '2',
      openingProtection: 'Hurricane shutters',
      roofWallConnection: 'Single wraps',
      hasPool: true,
      poolFence: '4-ft fence, self-closing gate',
      hasDogs: false,
      businessType: 'None',
      creditScore: 'Good (700-759)',
      maritalStatus: 'Married',
      allOtherPerilsDeductible: '2500',
      hurricaneDeductible: '5%'
    }
  },
  
  polybutyleneDecline: {
    name: "Polybutylene Decline Example",
    description: "Otherwise good home but has polybutylene plumbing",
    expectedPremium: "DECLINED",
    data: {
      occupancy: 'owner_occupied',
      roofAge: '8',
      priorInsuranceStatus: 'Currently Insured',
      hasClaims: false,
      yearBuilt: '1988',
      squareFeet: '1800',
      exteriorWalls: 'Frame',
      electricalPanel: 'Modern Breaker Panel',
      plumbingType: 'Polybutylene',  // ❌ Instant decline
      county: 'Orange',
      distanceToCoast: '25',
      windZone: 'X',
      hasPool: false,
      hasDogs: false,
      businessType: 'None',
      creditScore: 'Good (700-759)'
    }
  },
  
  fpePanelDecline: {
    name: "FPE Panel Decline Example",
    description: "Fire hazard electrical panel - instant decline",
    expectedPremium: "DECLINED",
    data: {
      occupancy: 'owner_occupied',
      roofAge: '10',
      priorInsuranceStatus: 'Currently Insured',
      hasClaims: false,
      yearBuilt: '1975',
      squareFeet: '1600',
      exteriorWalls: 'Frame',
      electricalPanel: 'Federal Pacific (FPE)',  // ❌ Instant decline
      plumbingType: 'Copper',
      county: 'Orange',
      distanceToCoast: '20',
      hasPool: false,
      hasDogs: false,
      businessType: 'None',
      creditScore: 'Fair (640-699)'
    }
  },
  
  restrictedDogDecline: {
    name: "Restricted Dog Breed",
    description: "Pit Bull causes most carriers to decline",
    expectedPremium: "LIMITED MARKETS",
    data: {
      occupancy: 'owner_occupied',
      roofAge: '5',
      priorInsuranceStatus: 'Currently Insured',
      hasClaims: false,
      yearBuilt: '2015',
      squareFeet: '2000',
      exteriorWalls: 'Masonry/Concrete Block (CBS)',
      electricalPanel: 'Modern Breaker Panel',
      plumbingType: 'PEX',
      county: 'Orange',
      distanceToCoast: '25',
      hasPool: false,
      hasDogs: true,
      dogBreeds: ['Pit Bull'],  // ❌ Restricted
      businessType: 'None',
      creditScore: 'Good (700-759)'
    }
  },
  
  creditScoreImpact: {
    name: "Credit Score Impact Demo",
    description: "Same house, poor vs excellent credit",
    expectedPremium: "$4,320/year (vs $1,680 with excellent credit)",
    data: {
      occupancy: 'owner_occupied',
      roofAge: '5',
      priorInsuranceStatus: 'Currently Insured',
      hasClaims: false,
      yearBuilt: '2018',
      squareFeet: '2000',
      exteriorWalls: 'Masonry/Concrete Block (CBS)',
      roofShape: 'Hip',
      electricalPanel: 'Modern Breaker Panel',
      plumbingType: 'PEX',
      county: 'Orange',
      distanceToCoast: '20',
      openingProtection: 'Impact glass',
      hasPool: false,
      hasDogs: false,
      businessType: 'None',
      creditScore: 'Poor (under 580)',  // 80% higher premium!
      maritalStatus: 'Single',
      allOtherPerilsDeductible: '2500',
      hurricaneDeductible: '2%'
    }
  }
};

export default scenarioPresets;


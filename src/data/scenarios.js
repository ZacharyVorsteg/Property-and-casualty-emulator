// Pre-built test scenarios for training
export const scenarios = {
  perfectRisk: {
    name: "Perfect Risk - Ideal Scenario",
    description: "2020 build, CBS construction, hip roof, inland location, no claims",
    data: {
      contactName: "John Perfect",
      contactEmail: "john@example.com",
      contactPhone: "(555) 123-4567",
      insuranceSituation: "Currently Insured - Shopping",
      zipCode: "32801",
      county: "Orange",
      yearBuilt: "2020",
      squareFeet: "2000",
      stories: "1",
      propertyStyle: "Single Family",
      exteriorWalls: "Masonry/Concrete Block (CBS)",
      foundationType: "Slab",
      roofShape: "Hip",
      roofMaterial: "Architectural Shingle",
      roofAge: "3",
      distanceToCoast: 30,
      barrierIsland: false,
      floodZone: "X (Preferred)",
      hasLosses: false,
      openingProtection: "Impact glass",
      roofWallConnection: "Double wraps"
    }
  },
  
  typicalRisk: {
    name: "Typical Risk - Average Florida Home",
    description: "2005 build, 12-year roof, one small claim, Zone 3",
    data: {
      contactName: "Jane Typical",
      contactEmail: "jane@example.com",
      contactPhone: "(555) 234-5678",
      insuranceSituation: "Currently Insured - Shopping",
      zipCode: "33803",
      county: "Polk",
      yearBuilt: "2005",
      squareFeet: "1800",
      stories: "1",
      propertyStyle: "Single Family",
      exteriorWalls: "Frame",
      foundationType: "Slab",
      roofShape: "Gable",
      roofMaterial: "Architectural Shingle",
      roofAge: "12",
      distanceToCoast: 40,
      barrierIsland: false,
      floodZone: "X (Preferred)",
      hasLosses: true,
      lossCount: 1,
      losses: [{
        date: "2022-08-15",
        type: "Water - Plumbing",
        amount: "3500",
        status: "Closed",
        catastrophe: "No",
        publicAdjuster: "No",
        attorney: "No"
      }]
    }
  },
  
  challengedRisk: {
    name: "Challenged Risk - Older Home, Multiple Claims",
    description: "1985 build, 18-year roof, 2 water claims",
    data: {
      contactName: "Bob Challenge",
      contactEmail: "bob@example.com",
      contactPhone: "(555) 345-6789",
      insuranceSituation: "Currently Insured - Non-renewed",
      zipCode: "33511",
      county: "Hillsborough",
      yearBuilt: "1985",
      squareFeet: "1600",
      stories: "1",
      propertyStyle: "Single Family",
      exteriorWalls: "Frame",
      foundationType: "Slab",
      roofShape: "Gable",
      roofMaterial: "3-Tab Shingle",
      roofAge: "18",
      distanceToCoast: 15,
      barrierIsland: false,
      floodZone: "X (Preferred)",
      hasLosses: true,
      lossCount: 2,
      losses: [
        {
          date: "2023-03-10",
          type: "Water - Plumbing",
          amount: "8500",
          status: "Closed",
          catastrophe: "No",
          publicAdjuster: "No",
          attorney: "No"
        },
        {
          date: "2021-09-20",
          type: "Water - Roof Leak",
          amount: "4200",
          status: "Closed",
          catastrophe: "No",
          publicAdjuster: "Yes",
          attorney: "No"
        }
      ]
    }
  },
  
  coastalHighValue: {
    name: "Coastal High-Value - Luxury Waterfront",
    description: "$1.5M home, Zone 1, impact glass throughout",
    data: {
      contactName: "Sarah Luxury",
      contactEmail: "sarah@example.com",
      contactPhone: "(555) 456-7890",
      insuranceSituation: "Currently Insured - Shopping",
      zipCode: "33139",
      county: "Miami-Dade",
      yearBuilt: "2018",
      squareFeet: "4000",
      stories: "2",
      propertyStyle: "Single Family",
      exteriorWalls: "Masonry/Concrete Block (CBS)",
      foundationType: "Slab",
      roofShape: "Hip",
      roofMaterial: "Tile",
      roofAge: "5",
      distanceToCoast: 0.5,
      barrierIsland: true,
      floodZone: "AE (100-year flood)",
      hasLosses: false,
      openingProtection: "Impact glass",
      roofWallConnection: "Double wraps",
      pool: "Pool"
    }
  },
  
  sinkholeCounty: {
    name: "Sinkhole County - Pasco Property",
    description: "Pasco county home with sinkhole activity history",
    data: {
      contactName: "Mike Sinkhole",
      contactEmail: "mike@example.com",
      contactPhone: "(555) 567-8901",
      insuranceSituation: "Currently Insured - Shopping",
      zipCode: "34667",
      county: "Pasco",
      yearBuilt: "2008",
      squareFeet: "2200",
      stories: "2",
      propertyStyle: "Single Family",
      exteriorWalls: "Frame with Brick Veneer",
      foundationType: "Slab",
      roofShape: "Gable",
      roofMaterial: "Architectural Shingle",
      roofAge: "8",
      distanceToCoast: 12,
      barrierIsland: false,
      floodZone: "X (Preferred)",
      hasLosses: false
    }
  },
  
  citizensEligible: {
    name: "Citizens Eligible - Last Resort Market",
    description: "22-year roof, Zone 2, declined by standard markets",
    data: {
      contactName: "Tom Lastresort",
      contactEmail: "tom@example.com",
      contactPhone: "(555) 678-9012",
      insuranceSituation: "Citizens Property Insurance Customer",
      zipCode: "33334",
      county: "Broward",
      yearBuilt: "1990",
      squareFeet: "1500",
      stories: "1",
      propertyStyle: "Single Family",
      exteriorWalls: "Frame",
      foundationType: "Slab",
      roofShape: "Gable",
      roofMaterial: "3-Tab Shingle",
      roofAge: "22",
      distanceToCoast: 3,
      barrierIsland: false,
      floodZone: "X (Preferred)",
      hasLosses: true,
      lossCount: 1,
      losses: [{
        date: "2020-05-15",
        type: "Hurricane/Wind",
        amount: "12000",
        status: "Closed",
        catastrophe: "Yes",
        publicAdjuster: "No",
        attorney: "No"
      }]
    }
  },
  
  fraudRedFlags: {
    name: "Fraud Red Flags - High Suspicion",
    description: "Multiple water claims, public adjusters, same contractor",
    data: {
      contactName: "Suspicious Client",
      contactEmail: "suspect@example.com",
      contactPhone: "(555) 789-0123",
      insuranceSituation: "Currently Insured - Cancelled",
      cancellationReason: "Material Misrepresentation",
      zipCode: "33012",
      county: "Miami-Dade",
      yearBuilt: "2000",
      squareFeet: "1800",
      stories: "1",
      propertyStyle: "Single Family",
      exteriorWalls: "Frame",
      roofShape: "Gable",
      roofMaterial: "Architectural Shingle",
      roofAge: "3",
      hasLosses: true,
      lossCount: 3,
      losses: [
        {
          date: "2024-01-10",
          type: "Water - Plumbing",
          amount: "15000",
          status: "Closed",
          publicAdjuster: "Yes",
          attorney: "Yes"
        },
        {
          date: "2023-06-20",
          type: "Water - Roof Leak",
          amount: "18000",
          status: "Closed",
          publicAdjuster: "Yes",
          attorney: "Yes"
        },
        {
          date: "2022-11-05",
          type: "Water - Plumbing",
          amount: "12000",
          status: "Closed",
          publicAdjuster: "Yes",
          attorney: "No"
        }
      ]
    }
  },
  
  windMitSavings: {
    name: "Wind Mitigation Savings - Maximum Discounts",
    description: "Older home with all protection features for big savings",
    data: {
      contactName: "Winnie Mitigation",
      contactEmail: "winnie@example.com",
      contactPhone: "(555) 890-1234",
      insuranceSituation: "Currently Insured - Shopping",
      zipCode: "32789",
      county: "Orange",
      yearBuilt: "1998",
      squareFeet: "2400",
      stories: "1",
      propertyStyle: "Single Family",
      exteriorWalls: "Masonry/Concrete Block (CBS)",
      roofShape: "Hip",
      roofMaterial: "Metal",
      roofAge: "4",
      distanceToCoast: 45,
      floodZone: "X (Preferred)",
      hasLosses: false,
      buildingCode: "2001 Florida Building Code (FBC 2001)",
      roofDeckAttachment: "D: Structural screws",
      roofWallConnection: "Double wraps",
      secondaryWaterResistance: "Yes",
      openingProtection: "Impact glass"
    }
  },
  
  esOnly: {
    name: "E&S Only - Excess & Surplus Lines",
    description: "Short-term rental, Zone 1, 20-year roof",
    data: {
      contactName: "Eddie Surplus",
      contactEmail: "eddie@example.com",
      contactPhone: "(555) 901-2345",
      insuranceSituation: "No Current Insurance - New Purchase",
      zipCode: "33957",
      county: "Lee",
      yearBuilt: "1995",
      squareFeet: "1400",
      stories: "1",
      propertyStyle: "Single Family",
      exteriorWalls: "Frame",
      roofShape: "Gable",
      roofMaterial: "3-Tab Shingle",
      roofAge: "20",
      distanceToCoast: 0.3,
      barrierIsland: true,
      floodZone: "VE (Coastal High Velocity)",
      hasLosses: true,
      lossCount: 2
    }
  },
  
  autoDecline: {
    name: "Auto Decline - Uninsurable",
    description: "26-year roof, 3 claims, open claim pending",
    data: {
      contactName: "Dan Decline",
      contactEmail: "dan@example.com",
      contactPhone: "(555) 012-3456",
      insuranceSituation: "Currently Insured - Cancelled",
      cancellationReason: "Too Many Claims",
      zipCode: "33065",
      county: "Broward",
      yearBuilt: "1982",
      squareFeet: "1300",
      stories: "1",
      propertyStyle: "Single Family",
      exteriorWalls: "Frame",
      roofShape: "Gable",
      roofMaterial: "3-Tab Shingle",
      roofAge: "26",
      distanceToCoast: 8,
      floodZone: "X (Preferred)",
      hasLosses: true,
      lossCount: 3,
      losses: [
        {
          date: "2024-06-01",
          type: "Water - Plumbing",
          amount: "9000",
          status: "Open"
        },
        {
          date: "2023-03-15",
          type: "Water - Roof Leak",
          amount: "11000",
          status: "Closed"
        },
        {
          date: "2022-01-20",
          type: "Fire",
          amount: "25000",
          status: "Closed"
        }
      ]
    }
  }
};


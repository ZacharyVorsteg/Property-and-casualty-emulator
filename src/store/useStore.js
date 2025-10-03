import { create } from 'zustand';

const useStore = create((set, get) => ({
      // Current step
      currentStep: 0,
      
      // Form data
      formData: {
        // Step 1: Initial Contact
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        hearAbout: '',
        insuranceSituation: '',
        cancellationReason: '',
        
        // Step 2: Property Details
        propertyAddress: '',
        zipCode: '',
        yearBuilt: '',
        squareFeet: '',
        lotSize: '',
        stories: '',
        propertyStyle: '',
        exteriorWalls: '',
        foundationType: '',
        roofShape: '',
        roofMaterial: '',
        roofAge: '',
        roofReplacementDate: '',
        pool: 'None',
        poolFence: 'N/A',
        deck: 'None',
        garage: 'None',
        otherStructures: [],
        
        // Step 3: Location & Catastrophe
        county: '',
        distanceToCoast: 0,
        barrierIsland: false,
        windZone: '',
        floodZone: '',
        baseFloodElevation: '',
        finishedFloorElevation: '',
        elevationCertificate: false,
        
        // Step 4: Wind Mitigation
        buildingCode: '',
        roofCoveringPermitDate: '',
        roofCoveringMeetsFBC: '',
        roofDeckAttachment: '',
        roofWallConnection: '',
        secondaryWaterResistance: '',
        openingProtection: '',
        
        // Step 5: Loss History
        hasLosses: false,
        lossCount: 0,
        losses: [],
        
        // Step 6: Coverage Selection
        dwellingLimit: 0,
        replacementCost: 0,
        otherStructuresLimit: 0,
        personalPropertyLimit: 0,
        lossOfUseLimit: 0,
        liabilityLimit: '300000',
        sinkholeOption: 'Catastrophic Only',
        ordinanceOrLaw: '25%',
        moldCoverage: '10000',
        allOtherPerilsDeductible: '2500',
        hurricaneDeductible: '2%',
        
        // Step 7: Rating
        selectedCarrier: '',
        annualPremium: 0,
        
        // Step 8: Final Decision
        decision: '',
        conditions: []
      },
      
      // Alerts and feedback
      alerts: [],
      
      // Risk score
      riskScore: 0,
      
      // Educational popups shown
      educationShown: [],
      
      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),
      
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      
      addAlert: (alert) => set((state) => ({
        alerts: [...state.alerts, { id: Date.now(), ...alert }]
      })),
      
      removeAlert: (id) => set((state) => ({
        alerts: state.alerts.filter(a => a.id !== id)
      })),
      
      clearAlerts: () => set({ alerts: [] }),
      
      updateRiskScore: (points) => set((state) => ({
        riskScore: state.riskScore + points
      })),
      
      markEducationShown: (key) => set((state) => ({
        educationShown: [...state.educationShown, key]
      })),
      
      resetForm: () => set({
        currentStep: 0,
        formData: {
          contactName: '',
          contactPhone: '',
          contactEmail: '',
          hearAbout: '',
          insuranceSituation: '',
          cancellationReason: '',
          propertyAddress: '',
          zipCode: '',
          yearBuilt: '',
          squareFeet: '',
          lotSize: '',
          stories: '',
          propertyStyle: '',
          exteriorWalls: '',
          foundationType: '',
          roofShape: '',
          roofMaterial: '',
          roofAge: '',
          roofReplacementDate: '',
          pool: 'None',
          poolFence: 'N/A',
          deck: 'None',
          garage: 'None',
          otherStructures: [],
          county: '',
          distanceToCoast: 0,
          barrierIsland: false,
          windZone: '',
          floodZone: '',
          baseFloodElevation: '',
          finishedFloorElevation: '',
          elevationCertificate: false,
          buildingCode: '',
          roofCoveringPermitDate: '',
          roofCoveringMeetsFBC: '',
          roofDeckAttachment: '',
          roofWallConnection: '',
          secondaryWaterResistance: '',
          openingProtection: '',
          hasLosses: false,
          lossCount: 0,
          losses: [],
          dwellingLimit: 0,
          replacementCost: 0,
          otherStructuresLimit: 0,
          personalPropertyLimit: 0,
          lossOfUseLimit: 0,
          liabilityLimit: '300000',
          sinkholeOption: 'Catastrophic Only',
          ordinanceOrLaw: '25%',
          moldCoverage: '10000',
          allOtherPerilsDeductible: '2500',
          hurricaneDeductible: '2%',
          selectedCarrier: '',
          annualPremium: 0,
          decision: '',
          conditions: []
        },
        alerts: [],
        riskScore: 0,
        educationShown: []
      }),
      
      loadScenario: (scenario) => set({
        formData: { ...get().formData, ...scenario },
        currentStep: 0,
        alerts: [],
        riskScore: 0
      })
    }));

export default useStore;


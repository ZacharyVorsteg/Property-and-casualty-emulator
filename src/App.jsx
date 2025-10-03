import { useState } from 'react';
import useStore from './store/useStore';
import AlertContainer from './components/Alert';
import ProgressBar from './components/ProgressBar';
import ScenarioSelector from './components/ScenarioSelector';
import Step1InitialContact from './components/steps/Step1InitialContact';
import Step2PropertyDetails from './components/steps/Step2PropertyDetails';
import Step3LocationRisk from './components/steps/Step3LocationRisk';
import Step4WindMitigation from './components/steps/Step4WindMitigation';
import Step5LossHistory from './components/steps/Step5LossHistory';
import Step6Coverage from './components/steps/Step6Coverage';
import Step7Rating from './components/steps/Step7Rating';
import Step8FinalDecision from './components/steps/Step8FinalDecision';

function App() {
  const { currentStep, setCurrentStep, formData } = useStore();
  
  const steps = [
    { component: Step1InitialContact, title: 'Initial Contact' },
    { component: Step2PropertyDetails, title: 'Property Details' },
    { component: Step3LocationRisk, title: 'Location & Risk' },
    { component: Step4WindMitigation, title: 'Wind Mitigation' },
    { component: Step5LossHistory, title: 'Loss History' },
    { component: Step6Coverage, title: 'Coverage' },
    { component: Step7Rating, title: 'Rating' },
    { component: Step8FinalDecision, title: 'Final Decision' }
  ];
  
  const CurrentStepComponent = steps[currentStep].component;
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      window.scrollTo(0, 0);
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      window.scrollTo(0, 0);
      setCurrentStep(currentStep - 1);
    }
  };
  
  const canProceed = () => {
    // Basic validation for each step
    switch (currentStep) {
      case 0: // Initial Contact
        return formData.contactName && formData.contactEmail && formData.insuranceSituation && formData.zipCode && formData.roofAge;
      case 1: // Property Details
        return formData.yearBuilt && formData.squareFeet && formData.propertyStyle && formData.roofShape && formData.roofMaterial;
      case 2: // Location
        return formData.county && formData.distanceToCoast !== '' && formData.floodZone;
      case 3: // Wind Mitigation
        return true; // Optional step
      case 4: // Loss History
        return formData.hasLosses !== undefined;
      case 5: // Coverage
        return formData.dwellingLimit > 0 && formData.liabilityLimit;
      case 6: // Rating
        return formData.selectedCarrier && formData.annualPremium > 0;
      case 7: // Final
        return true;
      default:
        return true;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <AlertContainer />
      
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🏠 Florida P&C Insurance Underwriting Training
              </h1>
              <p className="text-gray-600 mt-1">
                Learn property & casualty underwriting through interactive simulation
              </p>
            </div>
            <ScenarioSelector />
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProgressBar currentStep={currentStep} />
        
        <div className="mb-6">
          <CurrentStepComponent />
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn-secondary disabled:opacity-30"
          >
            ← Previous
          </button>
          
          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary disabled:opacity-50"
              title={!canProceed() ? 'Please complete required fields' : ''}
            >
              Next →
            </button>
          ) : (
            <div className="w-32"></div>
          )}
        </div>
        
        {/* Help Text */}
        {!canProceed() && currentStep < steps.length - 1 && (
          <div className="mt-4 text-center text-sm text-red-600">
            ⚠️ Please complete all required fields (marked with *) to continue
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p className="text-sm">
            🎓 <strong>Training Tool</strong> - This simulator teaches Florida-specific insurance underwriting rules and decision-making processes.
          </p>
          <p className="text-xs mt-2">
            Not actual underwriting software. For educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;


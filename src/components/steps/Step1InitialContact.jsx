import { useEffect } from 'react';
import useStore from '../../store/useStore';
import EducationalPopup from '../EducationalPopup';

const Step1InitialContact = () => {
  const { formData, updateFormData, addAlert, clearAlerts } = useStore();
  
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);
  
  useEffect(() => {
    // Check for auto-decline scenarios
    if (formData.insuranceSituation === "Currently Insured - Cancelled") {
      if (formData.cancellationReason === "Non-payment" || formData.cancellationReason === "Material Misrepresentation") {
        addAlert({
          type: 'critical',
          title: 'AUTO DECLINE',
          message: `Previous cancellation for ${formData.cancellationReason} is unacceptable to standard markets`
        });
      }
    }
    
    if (formData.insuranceSituation === "Citizens Property Insurance Customer") {
      addAlert({
        type: 'info',
        title: 'Citizens Depopulation Opportunity!',
        message: 'We may be able to offer better coverage and pricing than Citizens'
      });
    }
  }, [formData.insuranceSituation, formData.cancellationReason, addAlert]);
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">New Submission Intake</h2>
        <p className="text-gray-600">Quickly identify if we should invest time in this risk</p>
      </div>
      
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => updateFormData({ contactName: e.target.value })}
                className="input-field"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone *
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => updateFormData({ contactPhone: e.target.value })}
                className="input-field"
                placeholder="(555) 123-4567"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData({ contactEmail: e.target.value })}
                className="input-field"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you hear about us?
              </label>
              <select
                value={formData.hearAbout}
                onChange={(e) => updateFormData({ hearAbout: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Referral">Referral</option>
                <option value="Internet">Internet</option>
                <option value="Current Client">Current Client</option>
                <option value="Marketing">Marketing</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Current Insurance Situation - CRITICAL FIELD */}
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Current Insurance Situation *
            <EducationalPopup title="🎯 What to look for">
              <p className="font-semibold">This is a CRITICAL screening question!</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li><strong>Cancelled:</strong> RED FLAG - Find out why immediately</li>
                <li><strong>Non-renewed:</strong> May indicate underwriting issues</li>
                <li><strong>Citizens Customer:</strong> Great opportunity to win business</li>
                <li><strong>Shopping:</strong> Best scenario - proactive customer</li>
              </ul>
              <div className="bg-yellow-50 p-3 rounded mt-4">
                <p className="text-sm"><strong>Pro Tip:</strong> If they mention lawyer, public adjuster, or recent claim in initial conversation - investigate thoroughly!</p>
              </div>
            </EducationalPopup>
          </h3>
          
          <select
            value={formData.insuranceSituation}
            onChange={(e) => updateFormData({ insuranceSituation: e.target.value })}
            className="input-field"
          >
            <option value="">Select...</option>
            <option value="Currently Insured - Shopping">Currently Insured - Shopping</option>
            <option value="Currently Insured - Non-renewed">Currently Insured - Non-renewed</option>
            <option value="Currently Insured - Cancelled">Currently Insured - Cancelled</option>
            <option value="No Current Insurance - New Purchase">No Current Insurance - New Purchase</option>
            <option value="No Current Insurance - Lapsed">No Current Insurance - Lapsed</option>
            <option value="Citizens Property Insurance Customer">Citizens Property Insurance Customer</option>
          </select>
          
          {formData.insuranceSituation === "Currently Insured - Cancelled" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Reason *
                <EducationalPopup title="⚠️ Cancellation Reasons Matter">
                  <p><strong>Non-payment:</strong> Automatic decline - shows financial instability</p>
                  <p className="mt-2"><strong>Material Misrepresentation:</strong> Automatic decline - fraud risk</p>
                  <p className="mt-2"><strong>Too Many Claims:</strong> Check details - may be salvageable</p>
                  <p className="mt-2"><strong>Underwriting Reasons:</strong> Depends on specific issues</p>
                </EducationalPopup>
              </label>
              <select
                value={formData.cancellationReason}
                onChange={(e) => updateFormData({ cancellationReason: e.target.value })}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Non-payment">Non-payment</option>
                <option value="Material Misrepresentation">Material Misrepresentation</option>
                <option value="Too Many Claims">Too Many Claims</option>
                <option value="Underwriting Reasons">Underwriting Reasons</option>
              </select>
            </div>
          )}
        </div>
        
        {/* Quick Property Screener */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Quick Property Screener
            <EducationalPopup title="💡 Why we ask these questions first">
              <p className="font-semibold mb-3">These are 'kill switches' - if any are triggered, we stop before wasting time.</p>
              <p className="mb-2">In real underwriting, efficiency matters. You might quote 20 properties to bind 5.</p>
              <div className="bg-red-50 p-3 rounded mt-4">
                <p className="font-semibold">Immediate Disqualifiers:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Roof over 25 years old</li>
                  <li>3+ losses in 5 years</li>
                  <li>Vacant over 30 days</li>
                </ul>
              </div>
            </EducationalPopup>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property ZIP Code (Florida only) *
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => updateFormData({ zipCode: e.target.value })}
                className="input-field"
                placeholder="32801"
                maxLength="5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Roof Age (approximate) *
              </label>
              <input
                type="number"
                value={formData.roofAge}
                onChange={(e) => {
                  const age = parseInt(e.target.value) || 0;
                  updateFormData({ roofAge: e.target.value });
                  
                  if (age > 25) {
                    addAlert({
                      type: 'critical',
                      title: 'STOP - Roof Age Exceeds Maximum',
                      message: 'Roof exceeds maximum age for all carriers. Suggest Citizens or roof replacement.'
                    });
                  } else if (age > 20) {
                    addAlert({
                      type: 'warning',
                      title: 'Very Old Roof',
                      message: 'E&S markets only - expect 2x standard premium'
                    });
                  } else if (age > 15) {
                    addAlert({
                      type: 'warning',
                      title: 'Old Roof',
                      message: 'Limited carrier options - most require ACV settlement'
                    });
                  }
                }}
                className="input-field"
                placeholder="12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1InitialContact;


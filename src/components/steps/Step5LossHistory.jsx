import { useEffect } from 'react';
import useStore from '../../store/useStore';
import EducationalPopup from '../EducationalPopup';

const Step5LossHistory = () => {
  const { formData, updateFormData, addAlert, clearAlerts } = useStore();
  
  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);
  
  useEffect(() => {
    if (formData.hasLosses && formData.losses) {
      const lossCount = formData.losses.length;
      
      if (lossCount === 0) {
        addAlert({
          type: 'success',
          message: '✅ Claims-free discount available!'
        });
      } else if (lossCount === 1) {
        const loss = formData.losses[0];
        if (loss.catastrophe === "Yes") {
          addAlert({
            type: 'info',
            message: '🌪️ CAT claims less penalized - act of God'
          });
        }
        if (loss.publicAdjuster === "Yes" || loss.attorney === "Yes") {
          addAlert({
            type: 'warning',
            message: '🚩 Public adjuster/attorney involvement noted'
          });
        }
        if (loss.status === "Open") {
          addAlert({
            type: 'critical',
            title: '❌ STOP: Cannot bind with open claim',
            message: 'All claims must be closed before binding'
          });
        }
      } else if (lossCount === 2) {
        const waterClaims = formData.losses.filter(l => l.type?.includes("Water"));
        if (waterClaims.length >= 2) {
          addAlert({
            type: 'warning',
            title: '🚨 Multiple water claims - pattern risk',
            message: 'Underwriting will scrutinize closely'
          });
        }
      } else if (lossCount >= 3) {
        addAlert({
          type: 'critical',
          title: '❌ 3+ claims = standard market decline',
          message: 'E&S markets or Citizens only'
        });
      }
    }
  }, [formData.hasLosses, formData.losses, addAlert]);
  
  const addLoss = () => {
    const newLoss = {
      date: '',
      type: '',
      amount: '',
      status: 'Closed',
      catastrophe: 'No',
      publicAdjuster: 'No',
      attorney: 'No'
    };
    
    const losses = formData.losses || [];
    updateFormData({ losses: [...losses, newLoss], lossCount: losses.length + 1 });
  };
  
  const removeLoss = (index) => {
    const losses = [...formData.losses];
    losses.splice(index, 1);
    updateFormData({ losses, lossCount: losses.length });
  };
  
  const updateLoss = (index, field, value) => {
    const losses = [...formData.losses];
    losses[index][field] = value;
    updateFormData({ losses });
  };
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Claims & Loss History</h2>
        <p className="text-gray-600">Evaluate frequency/severity of past claims</p>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex items-start">
          <span className="text-2xl mr-3">📚</span>
          <div>
            <h3 className="font-bold text-blue-900 mb-2">FLORIDA CLAIMS PATTERNS</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Water claims are #1 (not hurricane!)</li>
              <li>• 2 water claims in 5 years = major red flag</li>
              <li>• Public adjusters involved in 25% of claims</li>
              <li>• Attorney involvement up 300% since 2018</li>
              <li>• "Free roof" schemes common - verify legitimacy</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            Loss History (Past 5 Years)
            <EducationalPopup title="🔍 Claims Analysis">
              <div className="space-y-3">
                <p className="font-semibold">How Claims Impact Eligibility:</p>
                <p><strong>0 claims:</strong> Preferred - claims-free discount</p>
                <p><strong>1 claim:</strong> Acceptable if CAT or small</p>
                <p><strong>2 claims:</strong> Substandard - limited markets</p>
                <p><strong>3+ claims:</strong> Decline - E&S only</p>
                
                <div className="bg-red-50 p-3 rounded mt-3">
                  <p className="font-semibold text-red-900">Red Flags:</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li>• Multiple water claims (pattern)</li>
                    <li>• Public adjuster involvement</li>
                    <li>• Attorney representation</li>
                    <li>• Open/disputed claims</li>
                    <li>• Same restoration company repeatedly</li>
                  </ul>
                </div>
              </div>
            </EducationalPopup>
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Any claims in past 5 years? *
            </label>
            <select
              value={formData.hasLosses}
              onChange={(e) => {
                const hasLosses = e.target.value === 'true';
                updateFormData({ hasLosses, losses: hasLosses ? (formData.losses || []) : [] });
              }}
              className="input-field"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>
        
        {formData.hasLosses && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Claim Details</h3>
              <button
                onClick={addLoss}
                className="btn-primary text-sm"
              >
                + Add Claim
              </button>
            </div>
            
            {formData.losses && formData.losses.length > 0 ? (
              <div className="space-y-4">
                {formData.losses.map((loss, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-900">Claim #{index + 1}</h4>
                      <button
                        onClick={() => removeLoss(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date of Loss
                        </label>
                        <input
                          type="date"
                          value={loss.date || ''}
                          onChange={(e) => updateLoss(index, 'date', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type of Loss
                        </label>
                        <select
                          value={loss.type || ''}
                          onChange={(e) => updateLoss(index, 'type', e.target.value)}
                          className="input-field"
                        >
                          <option value="">Select...</option>
                          <option value="Hurricane/Wind">Hurricane/Wind</option>
                          <option value="Water - Plumbing">Water - Plumbing</option>
                          <option value="Water - Roof Leak">Water - Roof Leak</option>
                          <option value="Theft">Theft</option>
                          <option value="Fire">Fire</option>
                          <option value="Lightning">Lightning</option>
                          <option value="Liability">Liability</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Claim Amount
                        </label>
                        <input
                          type="number"
                          value={loss.amount || ''}
                          onChange={(e) => updateLoss(index, 'amount', e.target.value)}
                          className="input-field"
                          placeholder="5000"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={loss.status || 'Closed'}
                          onChange={(e) => updateLoss(index, 'status', e.target.value)}
                          className="input-field"
                        >
                          <option value="Closed">Closed</option>
                          <option value="Open">Open</option>
                          <option value="Disputed">Disputed</option>
                          <option value="Withdrawn">Withdrawn</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Catastrophe (Named Storm)?
                        </label>
                        <select
                          value={loss.catastrophe || 'No'}
                          onChange={(e) => updateLoss(index, 'catastrophe', e.target.value)}
                          className="input-field"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes (named storm)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Public Adjuster Involved?
                        </label>
                        <select
                          value={loss.publicAdjuster || 'No'}
                          onChange={(e) => updateLoss(index, 'publicAdjuster', e.target.value)}
                          className="input-field"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Attorney Involved?
                        </label>
                        <select
                          value={loss.attorney || 'No'}
                          onChange={(e) => updateLoss(index, 'attorney', e.target.value)}
                          className="input-field"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No claims added. Click "Add Claim" to enter loss information.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Step5LossHistory;


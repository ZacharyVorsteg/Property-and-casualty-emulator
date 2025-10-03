const EducationalSidebar = ({ currentField, riskProfile }) => {
  const education = {
    roofAge: {
      title: '🏠 Why Roof Age is Critical for HO3',
      content: (
        <>
          <p className="text-sm mb-3">Roof age is THE #1 factor in HO3 underwriting in Florida.</p>
          
          <div className="space-y-2 text-sm">
            <div className="bg-green-50 p-2 rounded">
              <strong className="text-green-800">0-10 years:</strong> All HO3 carriers compete
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <strong className="text-yellow-800">11-15 years:</strong> Some carriers drop out
            </div>
            <div className="bg-orange-50 p-2 rounded">
              <strong className="text-orange-800">16-20 years:</strong> Very limited options
            </div>
            <div className="bg-red-50 p-2 rounded">
              <strong className="text-red-800">20+ years:</strong> Citizens or replacement needed
            </div>
          </div>
          
          <p className="text-xs text-gray-600 mt-3 italic">
            💡 After 2022 Florida reforms, carriers can pay depreciated value on roofs 10+ years old
          </p>
        </>
      )
    },
    
    occupancy: {
      title: '🔑 HO3 = Owner-Occupied Only',
      content: (
        <>
          <p className="text-sm font-semibold mb-2">What is HO3?</p>
          <p className="text-sm mb-3">Standard homeowners insurance for homes where the owner lives.</p>
          
          <div className="bg-blue-50 p-3 rounded text-sm space-y-2">
            <p><strong>HO3 covers:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>House structure (Coverage A)</li>
              <li>Personal belongings (Coverage C)</li>
              <li>Liability protection (Coverage E)</li>
              <li>Living expenses if displaced (Coverage D)</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded text-sm mt-3">
            <p className="font-semibold mb-1">⚠️ If it's a rental:</p>
            <p className="text-xs">You need DP3 (Dwelling Fire) policy instead</p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded text-sm mt-3">
            <p className="font-semibold mb-1">🏙️ If it's a condo:</p>
            <p className="text-xs">You need HO6 (walls-in coverage only)</p>
          </div>
        </>
      )
    },
    
    windZone: {
      title: '🌪️ Florida Wind Zones for HO3',
      content: (
        <>
          <p className="text-sm mb-3">Distance from coast determines hurricane exposure and deductibles.</p>
          
          <div className="space-y-2 text-sm">
            <div className="bg-red-50 p-2 rounded">
              <strong className="text-red-800">Zone 1 (0-1 mile):</strong>
              <p className="text-xs">5-10% deductible mandatory</p>
              <p className="text-xs">Very limited HO3 carriers</p>
            </div>
            <div className="bg-orange-50 p-2 rounded">
              <strong className="text-orange-800">Zone 2 (1-2.5 miles):</strong>
              <p className="text-xs">2-5% deductible</p>
              <p className="text-xs">Regional carriers only</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <strong className="text-yellow-800">Zone 3 (2.5-5 miles):</strong>
              <p className="text-xs">2% minimum deductible</p>
              <p className="text-xs">Most carriers available</p>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <strong className="text-green-800">Zone X (5+ miles):</strong>
              <p className="text-xs">Flat $2,500 option available</p>
              <p className="text-xs">All HO3 carriers compete</p>
            </div>
          </div>
          
          <div className="bg-red-50 p-3 rounded text-xs mt-3">
            <strong>⚠️ Hurricane Deductible Example:</strong>
            <p className="mt-1">$400,000 home × 5% = <strong>$20,000</strong> you pay out of pocket!</p>
          </div>
        </>
      )
    },
    
    coverage: {
      title: '📋 HO3 Coverage Structure',
      content: (
        <>
          <p className="text-sm mb-3">In HO3 policies, Coverage A (Dwelling) drives everything else:</p>
          
          <div className="space-y-2 text-sm">
            <div className="border-l-4 border-blue-500 pl-3">
              <strong>Coverage A - Dwelling</strong>
              <p className="text-xs text-gray-600">The main house structure</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-3">
              <strong>Coverage B - Other Structures</strong>
              <p className="text-xs text-gray-600">= 10% of Coverage A</p>
              <p className="text-xs text-gray-500 italic">Detached garage, shed, fence</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-3">
              <strong>Coverage C - Personal Property</strong>
              <p className="text-xs text-gray-600">= 50% of Coverage A</p>
              <p className="text-xs text-gray-500 italic">Your belongings</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-3">
              <strong>Coverage D - Loss of Use</strong>
              <p className="text-xs text-gray-600">= 20% of Coverage A</p>
              <p className="text-xs text-gray-500 italic">Hotel if house is unlivable</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded mt-3 text-xs">
            <strong>Example: $400,000 Coverage A</strong>
            <ul className="mt-1 space-y-1">
              <li>• Coverage B: $40,000</li>
              <li>• Coverage C: $200,000</li>
              <li>• Coverage D: $80,000</li>
            </ul>
          </div>
        </>
      )
    },
    
    default: {
      title: '🎓 HO3 Underwriting Training',
      content: (
        <>
          <p className="text-sm mb-3">You're learning to underwrite <strong>HO3 policies</strong> - Standard Homeowners Insurance.</p>
          
          <div className="bg-blue-50 p-3 rounded text-sm mb-3">
            <p className="font-semibold mb-2">What is HO3?</p>
            <p className="text-xs">The most common homeowners policy (95% of homes). For owner-occupied primary residences only.</p>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="border-l-4 border-blue-500 pl-3">
              <strong className="text-xs">HO3 is for:</strong>
              <p className="text-xs text-gray-600">Homes where owner lives</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-3">
              <strong className="text-xs">DP3 is for:</strong>
              <p className="text-xs text-gray-600">Rental properties</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-3">
              <strong className="text-xs">HO6 is for:</strong>
              <p className="text-xs text-gray-600">Condo unit owners</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded mt-3 text-xs">
            <strong>🎯 As you fill the form:</strong>
            <p className="mt-1">Watch the Risk Meter and Carrier Matrix update in real-time!</p>
          </div>
        </>
      )
    }
  };
  
  const content = education[currentField] || education.default;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
      <div className="flex items-start gap-2 mb-3">
        <span className="text-2xl">{content.title.split(' ')[0]}</span>
        <h3 className="font-bold text-gray-900 flex-1">{content.title.split(' ').slice(1).join(' ')}</h3>
      </div>
      
      <div className="text-gray-700">
        {content.content}
      </div>
      
      {riskProfile.roofAge && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-600">
            <strong>Current Risk Factors:</strong>
            <ul className="mt-2 space-y-1">
              {riskProfile.roofAge && (
                <li>• Roof: {riskProfile.roofAge} years old</li>
              )}
              {riskProfile.windZone && (
                <li>• Wind Zone: {riskProfile.windZone}</li>
              )}
              {riskProfile.losses?.length > 0 && (
                <li>• Claims: {riskProfile.losses.length}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalSidebar;


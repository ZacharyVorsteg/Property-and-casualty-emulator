import React, { useState } from 'react';

const StudyGuide = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const studySections = [
    {
      id: 'coverage-types',
      title: '🏠 HO3 Coverage Types (MUST MEMORIZE)',
      icon: '📋',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
            <h4 className="font-bold text-xl text-green-900 mb-4">Coverage A - Dwelling</h4>
            <ul className="space-y-2 text-sm">
              <li>• <strong>OPEN PERIL</strong> coverage (all risks except exclusions)</li>
              <li>• Covers the house structure, attached garage, built-in appliances</li>
              <li>• THIS IS THE MOST IMPORTANT NUMBER - everything else is based on it</li>
              <li>• Must be insured to at least 80% of replacement cost to avoid coinsurance penalty</li>
            </ul>
            <div className="mt-4 bg-white p-4 rounded-lg">
              <p className="text-xs text-green-800 font-semibold">EXAM TIP:</p>
              <p className="text-sm text-green-900">HO3 dwelling = OPEN PERIL. If it's not excluded, it's covered. Burden of proof is on INSURER.</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
            <h4 className="font-bold text-xl text-blue-900 mb-4">Coverage B - Other Structures</h4>
            <ul className="space-y-2 text-sm">
              <li>• Typically <strong>10% of Coverage A</strong></li>
              <li>• DETACHED structures: shed, detached garage, fence, pool house</li>
              <li>• Must be separated from dwelling by clear space</li>
              <li>• Attached structures are part of Coverage A</li>
            </ul>
            <div className="mt-4 bg-white p-4 rounded-lg">
              <p className="text-xs text-blue-800 font-semibold">EXAM EXAMPLE:</p>
              <p className="text-sm text-blue-900">Coverage A = $300,000 → Coverage B = $30,000 (10%)</p>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
            <h4 className="font-bold text-xl text-purple-900 mb-4">Coverage C - Personal Property</h4>
            <ul className="space-y-2 text-sm">
              <li>• Typically <strong>50-70% of Coverage A</strong></li>
              <li>• <strong>NAMED PERIL</strong> coverage only (not open peril!)</li>
              <li>• Covers furniture, clothes, electronics, movable items</li>
              <li>• Burden of proof on INSURED to show covered cause of loss</li>
              <li>• Limited coverage for jewelry, cash, guns (need scheduled endorsements)</li>
            </ul>
            <div className="mt-4 bg-white p-4 rounded-lg">
              <p className="text-xs text-purple-800 font-semibold">KEY DIFFERENCE:</p>
              <p className="text-sm text-purple-900">Unlike Coverage A, you must prove a NAMED PERIL caused the loss (fire, theft, windstorm, etc.)</p>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200">
            <h4 className="font-bold text-xl text-yellow-900 mb-4">Coverage D - Loss of Use / ALE</h4>
            <ul className="space-y-2 text-sm">
              <li>• Typically <strong>20-30% of Coverage A</strong></li>
              <li>• Pays ADDITIONAL living expenses if home is uninhabitable</li>
              <li>• Hotel, restaurant meals, storage, pet boarding</li>
              <li>• Pays the DIFFERENCE between normal and current costs</li>
              <li>• Time limit: usually 12-24 months</li>
            </ul>
            <div className="mt-4 bg-white p-4 rounded-lg">
              <p className="text-xs text-yellow-800 font-semibold">IMPORTANT:</p>
              <p className="text-sm text-yellow-900">Only pays ADDITIONAL costs. If you normally spend $100/day on food and now spend $150, it pays the extra $50.</p>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
            <h4 className="font-bold text-xl text-red-900 mb-4">Coverage E - Personal Liability</h4>
            <ul className="space-y-2 text-sm">
              <li>• Protects against lawsuits for bodily injury/property damage</li>
              <li>• Minimum $100,000, but recommend $300,000-$500,000</li>
              <li>• Covers legal defense costs even if you're NOT liable</li>
              <li>• Separate from dwelling coverage - not a percentage</li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl border-2 border-indigo-200">
            <h4 className="font-bold text-xl text-indigo-900 mb-4">Coverage F - Medical Payments to Others</h4>
            <ul className="space-y-2 text-sm">
              <li>• Typically $1,000-$5,000 per person</li>
              <li>• <strong>NO FAULT required</strong> - pays regardless of liability</li>
              <li>• <strong>NO DEDUCTIBLE</strong></li>
              <li>• Guest injured on your property = Coverage F pays</li>
              <li>• Faster than Coverage E (no lawsuit needed)</li>
            </ul>
            <div className="mt-4 bg-white p-4 rounded-lg">
              <p className="text-xs text-indigo-800 font-semibold">EXAM FAVORITE:</p>
              <p className="text-sm text-indigo-900">Guest trips on your stairs. Even if you did nothing wrong, Coverage F pays their medical bills immediately.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'florida-specific',
      title: '🌴 Florida-Specific Rules (HIGH TESTABILITY)',
      icon: '⚖️',
      content: (
        <div className="space-y-6">
          <div className="bg-red-100 p-6 rounded-xl border-2 border-red-300">
            <h4 className="font-bold text-2xl text-red-900 mb-4">🏚️ 2022 Roof Age Law (NEW!)</h4>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-green-700">✅ 0-15 years: RCV (Replacement Cost Value)</p>
                <p className="text-sm">Full replacement cost, no depreciation deducted</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-orange-700">⚠️ 16-20 years: ACV (Actual Cash Value)</p>
                <p className="text-sm">Replacement cost MINUS depreciation</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-bold text-red-700">❌ 20+ years: Replace or Citizens</p>
                <p className="text-sm">Most carriers require roof replacement or decline</p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300">
              <p className="text-sm font-bold">🔥 EXAM CRITICAL: This is NEW LAW as of 2022! Prior exams said 10 years. NOW it's 15 years!</p>
            </div>
          </div>

          <div className="bg-blue-100 p-6 rounded-xl border-2 border-blue-300">
            <h4 className="font-bold text-2xl text-blue-900 mb-4">💨 Wind Mitigation Discounts</h4>
            <p className="mb-4"><strong>MANDATORY by Florida law</strong> - carriers MUST offer these discounts:</p>
            <div className="space-y-2">
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold">Impact-Resistant Windows/Shutters</p>
                <p className="text-sm text-blue-800">Up to 20% discount</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold">Hip Roof (4-sided slope)</p>
                <p className="text-sm text-blue-800">Up to 12% discount</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold">Roof Deck Attachment (straps/clips)</p>
                <p className="text-sm text-blue-800">Up to 15% discount</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="font-semibold">Secondary Water Resistance (SWR)</p>
                <p className="text-sm text-blue-800">Up to 5% discount</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg border-2 border-green-400">
                <p className="font-bold">Maximum Combined: Up to 45% savings!</p>
              </div>
            </div>
            <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm"><strong>Required:</strong> Official Wind Mitigation Form (OIR-B1-1802) valid for 5 years</p>
            </div>
          </div>

          <div className="bg-purple-100 p-6 rounded-xl border-2 border-purple-300">
            <h4 className="font-bold text-2xl text-purple-900 mb-4">🏛️ Citizens Property Insurance</h4>
            <ul className="space-y-3">
              <li className="bg-white p-4 rounded-lg">
                <p className="font-semibold">Florida's insurer of LAST RESORT</p>
                <p className="text-sm">State-run, nonprofit, highest rates</p>
              </li>
              <li className="bg-white p-4 rounded-lg">
                <p className="font-semibold">Eligibility</p>
                <p className="text-sm">Must be DECLINED by 3+ private carriers OR have quote 15%+ higher</p>
              </li>
              <li className="bg-white p-4 rounded-lg">
                <p className="font-semibold">Assessable Policies</p>
                <p className="text-sm">After hurricanes, ALL policyholders can be assessed to pay claims</p>
              </li>
              <li className="bg-white p-4 rounded-lg">
                <p className="font-semibold">Depopulation</p>
                <p className="text-sm">Citizens tries to move policies to private market (takeouts)</p>
              </li>
            </ul>
          </div>

          <div className="bg-orange-100 p-6 rounded-xl border-2 border-orange-300">
            <h4 className="font-bold text-2xl text-orange-900 mb-4">🌊 Sinkhole Coverage</h4>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold">High-Risk Counties (Must Offer):</p>
                <p className="text-sm font-bold text-orange-700">Pasco, Hernando, Hillsborough</p>
                <p className="text-sm">(Remember: PHH = Tampa Bay area)</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold">Requirements:</p>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• Insurers MUST OFFER in high-risk counties</li>
                  <li>• Homeowners can DECLINE in writing</li>
                  <li>• Expensive add-on (can double premium)</li>
                  <li>• Covers catastrophic ground collapse only</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-indigo-100 p-6 rounded-xl border-2 border-indigo-300">
            <h4 className="font-bold text-2xl text-indigo-900 mb-4">🌀 Hurricane Deductibles</h4>
            <div className="space-y-3">
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
                <p className="font-bold text-lg text-red-900">PERCENTAGE-BASED, NOT FLAT DOLLAR!</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold">How It Works:</p>
                <p className="text-sm mt-2">Coverage A: $400,000</p>
                <p className="text-sm">Hurricane Deductible: 5%</p>
                <p className="text-sm font-bold text-red-700">Your out-of-pocket: $20,000 (5% × $400,000)</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-semibold">Typical Ranges:</p>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• Wind Zone 1 (0-1 mile from coast): 5-10%</li>
                  <li>• Wind Zone 2 (1-2.5 miles): 2-5%</li>
                  <li>• Wind Zone 3 (2.5-5 miles): 2%</li>
                  <li>• Non-wind zone (5+ miles): 2%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exclusions',
      title: '🚫 What's NOT Covered (MEMORIZE THESE)',
      icon: '❌',
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
            <h4 className="font-bold text-xl text-red-900 mb-4">🌊 #1 EXAM QUESTION: FLOOD</h4>
            <div className="bg-white p-4 rounded-lg mb-4">
              <p className="font-bold text-2xl text-red-700 mb-2">FLOOD IS ALWAYS EXCLUDED FROM HOMEOWNERS!</p>
              <p className="text-sm">Need separate NFIP (National Flood Insurance Program) policy</p>
              <p className="text-sm font-semibold mt-2">30-day waiting period (except at closing)</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <p className="text-sm"><strong>DON'T CONFUSE:</strong> Water damage from burst pipes IS covered. Flood water from outside IS NOT.</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-300">
            <h4 className="font-bold text-xl mb-4">Other Common Exclusions:</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border-2 border-red-200">
                <p className="font-semibold text-red-700">❌ Earthquake</p>
                <p className="text-xs">Need separate policy</p>
              </div>
              <div className="bg-white p-3 rounded-lg border-2 border-red-200">
                <p className="font-semibold text-red-700">❌ War/Nuclear</p>
                <p className="text-xs">Never covered</p>
              </div>
              <div className="bg-white p-3 rounded-lg border-2 border-red-200">
                <p className="font-semibold text-red-700">❌ Intentional Loss</p>
                <p className="text-xs">No fraud/arson</p>
              </div>
              <div className="bg-white p-3 rounded-lg border-2 border-red-200">
                <p className="font-semibold text-red-700">❌ Wear & Tear</p>
                <p className="text-xs">Normal aging/maintenance</p>
              </div>
              <div className="bg-white p-3 rounded-lg border-2 border-red-200">
                <p className="font-semibold text-red-700">❌ Mold (limited)</p>
                <p className="text-xs">$10K max unless from covered peril</p>
              </div>
              <div className="bg-white p-3 rounded-lg border-2 border-red-200">
                <p className="font-semibold text-red-700">❌ Ordinance/Law</p>
                <p className="text-xs">Need endorsement for code upgrades</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exam-formulas',
      title: '🧮 Key Formulas & Calculations',
      icon: '📐',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-100 p-6 rounded-xl border-2 border-blue-300">
            <h4 className="font-bold text-2xl text-blue-900 mb-4">Coverage Percentages</h4>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg font-mono">
                <p className="font-bold">Coverage B = Coverage A × 10%</p>
                <p className="text-sm text-gray-600">Example: $300,000 × 10% = $30,000</p>
              </div>
              <div className="bg-white p-4 rounded-lg font-mono">
                <p className="font-bold">Coverage C = Coverage A × 50-70%</p>
                <p className="text-sm text-gray-600">Example: $300,000 × 50% = $150,000</p>
              </div>
              <div className="bg-white p-4 rounded-lg font-mono">
                <p className="font-bold">Coverage D = Coverage A × 20-30%</p>
                <p className="text-sm text-gray-600">Example: $300,000 × 20% = $60,000</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-100 p-6 rounded-xl border-2 border-purple-300">
            <h4 className="font-bold text-2xl text-purple-900 mb-4">Hurricane Deductible Calculation</h4>
            <div className="bg-white p-6 rounded-lg font-mono">
              <p className="font-bold text-xl mb-4">Out-of-Pocket = Coverage A × Deductible %</p>
              <div className="bg-yellow-50 p-4 rounded border-2 border-yellow-300 mb-4">
                <p className="font-bold">Example Problem:</p>
                <p>Coverage A: $500,000</p>
                <p>Hurricane Deductible: 5%</p>
                <p>Hurricane Damage: $75,000</p>
              </div>
              <div className="bg-green-50 p-4 rounded border-2 border-green-300">
                <p className="font-bold">Solution:</p>
                <p>Your deductible: $500,000 × 5% = $25,000</p>
                <p>Insurance pays: $75,000 - $25,000 = $50,000</p>
                <p className="font-bold text-green-700 mt-2">YOU PAY: $25,000 out of pocket!</p>
              </div>
            </div>
          </div>

          <div className="bg-red-100 p-6 rounded-xl border-2 border-red-300">
            <h4 className="font-bold text-2xl text-red-900 mb-4">Coinsurance Penalty (80% Rule)</h4>
            <div className="bg-white p-6 rounded-lg">
              <p className="font-bold mb-2">Formula:</p>
              <p className="font-mono text-lg">Claim Paid = (Amount of Insurance / 80% of Replacement Cost) × Loss</p>
              <div className="bg-yellow-50 p-4 rounded border-2 border-yellow-300 mt-4 mb-4">
                <p className="font-bold">Example Problem:</p>
                <p>Replacement Cost: $300,000</p>
                <p>Should carry: $300,000 × 80% = $240,000</p>
                <p>Actually has: $180,000 (UNDERINSURED!)</p>
                <p>Loss: $100,000</p>
              </div>
              <div className="bg-red-50 p-4 rounded border-2 border-red-300">
                <p className="font-bold">Penalty Calculation:</p>
                <p>($180,000 / $240,000) × $100,000 = $75,000</p>
                <p className="font-bold text-red-700 mt-2">Insurance pays only $75,000, not $100,000!</p>
                <p className="text-sm mt-2">Underinsurance penalty = $25,000 loss to insured</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'quick-facts',
      title: '⚡ Quick Facts to Memorize',
      icon: '💡',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-300">
            <p className="font-bold text-blue-900 mb-2">HO3 = Open Peril Dwelling</p>
            <p className="text-sm">Named Peril Personal Property</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-300">
            <p className="font-bold text-green-900 mb-2">Roof: 15 years = RCV cutoff</p>
            <p className="text-sm">16+ years = ACV only</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-2 border-purple-300">
            <p className="font-bold text-purple-900 mb-2">FLOOD = Always Excluded</p>
            <p className="text-sm">Need NFIP - 30 day wait</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-300">
            <p className="font-bold text-orange-900 mb-2">Citizens = Last Resort</p>
            <p className="text-sm">3+ declines or 15%+ higher quote</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border-2 border-red-300">
            <p className="font-bold text-red-900 mb-2">Hurricane Deductible = %</p>
            <p className="text-sm">NOT flat dollar amount!</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
            <p className="font-bold text-yellow-900 mb-2">Coverage F = No Fault</p>
            <p className="text-sm">No deductible, pays medical only</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border-2 border-indigo-300">
            <p className="font-bold text-indigo-900 mb-2">CLUE Report = 7 years</p>
            <p className="text-sm">Follows property, not owner</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border-2 border-pink-300">
            <p className="font-bold text-pink-900 mb-2">4-Point = 30+ year homes</p>
            <p className="text-sm">Roof, Electric, Plumbing, HVAC</p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border-2 border-teal-300">
            <p className="font-bold text-teal-900 mb-2">Wind Mit = OIR-B1-1802</p>
            <p className="text-sm">Valid 5 years, up to 45% discount</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border-2 border-gray-300">
            <p className="font-bold text-gray-900 mb-2">Protection Class = 1-10</p>
            <p className="text-sm">1 = best rates, 10 = worst</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border-2 border-cyan-300">
            <p className="font-bold text-cyan-900 mb-2">Sinkhole = PHH Counties</p>
            <p className="text-sm">Pasco, Hernando, Hillsborough</p>
          </div>
          <div className="bg-gradient-to-br from-lime-50 to-lime-100 p-4 rounded-lg border-2 border-lime-300">
            <p className="font-bold text-lime-900 mb-2">Coinsurance = 80% Rule</p>
            <p className="text-sm">Must carry 80% of replacement cost</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-indigo-900 mb-3">📖 Florida P&C Study Guide</h1>
            <p className="text-xl text-gray-600">Everything you need to pass your state exam</p>
            <div className="mt-4 bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg border-2 border-yellow-400">
              <p className="text-sm font-semibold text-yellow-900">⚡ PRO TIP: Click each section to expand and study. Master these concepts and you'll ace the exam!</p>
            </div>
          </div>

          <div className="space-y-4">
            {studySections.map((section) => (
              <div 
                key={section.id}
                className="border-2 border-indigo-200 rounded-xl overflow-hidden transition-all hover:shadow-lg"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-all flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{section.icon}</span>
                    <h2 className="text-2xl font-bold text-indigo-900 text-left">{section.title}</h2>
                  </div>
                  <span className="text-3xl text-indigo-600">
                    {expandedSection === section.id ? '−' : '+'}
                  </span>
                </button>
                
                {expandedSection === section.id && (
                  <div className="p-8 bg-white animate-fadeIn">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">🎯 Exam Day Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <p className="font-bold mb-2">✓ Read every question CAREFULLY</p>
              <p className="text-sm">Watch for "NOT", "EXCEPT", "EXCLUDE"</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <p className="font-bold mb-2">✓ Eliminate obviously wrong answers</p>
              <p className="text-sm">Narrow down to 2 choices if unsure</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <p className="font-bold mb-2">✓ Watch for Florida-specific questions</p>
              <p className="text-sm">Roof laws, Citizens, wind zones</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <p className="font-bold mb-2">✓ Know your percentages cold</p>
              <p className="text-sm">Coverage B/C/D, hurricane deductibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGuide;


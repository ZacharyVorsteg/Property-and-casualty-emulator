import React, { useState } from 'react';

const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const glossaryTerms = [
    // Coverage Types
    {
      term: "HO3 (Special Form)",
      definition: "The most common homeowners policy covering owner-occupied, single-family homes. Provides OPEN PERIL coverage for dwelling (Coverage A) and NAMED PERIL for personal property (Coverage C).",
      category: "Coverage Types",
      examTip: "Remember: HO3 = OWNER-OCCUPIED only. NOT for rentals or vacant homes.",
      relatedTerms: ["Coverage A", "Open Peril", "Named Peril"]
    },
    {
      term: "Coverage A (Dwelling)",
      definition: "Covers the STRUCTURE of the home itself - walls, roof, built-in appliances, attached structures. Basis for all other coverage calculations.",
      category: "Coverage Types",
      examTip: "Coverage A is the MOST IMPORTANT number. Everything else is a percentage of it.",
      example: "$300,000 Coverage A = $30,000 Other Structures (10%), $150,000 Personal Property (50%)"
    },
    {
      term: "Coverage B (Other Structures)",
      definition: "Detached structures on property - detached garages, sheds, fences, pool houses. Typically 10% of Coverage A.",
      category: "Coverage Types",
      examTip: "Must be DETACHED from the main house. Attached garage is part of Coverage A."
    },
    {
      term: "Coverage C (Personal Property)",
      definition: "Movable belongings - furniture, clothes, electronics. Typically 50-70% of Coverage A. Named peril only for HO3.",
      category: "Coverage Types",
      examTip: "Named peril means ONLY the listed perils are covered. Burden of proof is on the insured."
    },
    {
      term: "Coverage D (Loss of Use/ALE)",
      definition: "Additional Living Expenses if home is uninhabitable. Pays hotel, meals, storage. Typically 20-30% of Coverage A.",
      category: "Coverage Types",
      examTip: "Time limit: Usually 12-24 months. Covers the DIFFERENCE in living expenses, not normal costs."
    },
    {
      term: "Coverage E (Personal Liability)",
      definition: "Protects against lawsuits for bodily injury/property damage. Minimum $100,000, recommend $300,000+.",
      category: "Coverage Types",
      examTip: "Covers legal defense costs EVEN IF you're not at fault. Separate from dwelling coverage."
    },
    {
      term: "Coverage F (Medical Payments)",
      definition: "Pays medical bills for others injured on your property, regardless of fault. Typically $1,000-$5,000.",
      category: "Coverage Types",
      examTip: "NO fault required. Guest trips on stairs? Coverage F pays. NO deductible."
    },

    // Perils
    {
      term: "Open Peril (Special Form)",
      definition: "Covers ALL risks EXCEPT those specifically excluded. Burden of proof on INSURER to deny claim.",
      category: "Perils",
      examTip: "Opposite of named peril. If it's not excluded, it's covered. HO3 dwelling uses this."
    },
    {
      term: "Named Peril (Basic Form)",
      definition: "ONLY covers perils specifically listed in policy. Burden of proof on INSURED to show covered cause.",
      category: "Perils",
      examTip: "HO3 personal property uses named peril. Must prove fire, theft, windstorm, etc. caused damage."
    },
    {
      term: "Exclusions",
      definition: "Perils NOT covered under any circumstances. Common: flood, earthquake, war, nuclear, intentional loss, wear & tear.",
      category: "Perils",
      examTip: "FLOOD is ALWAYS excluded from HO3. Need separate NFIP policy. Exam loves this question."
    },

    // Deductibles
    {
      term: "All Other Perils (AOP) Deductible",
      definition: "Standard deductible for non-hurricane claims. Typically $500-$5,000. Flat dollar amount.",
      category: "Deductibles",
      examTip: "Applies to fire, theft, vandalism, pipe burst - everything EXCEPT hurricane/wind."
    },
    {
      term: "Hurricane/Wind Deductible",
      definition: "Separate, PERCENTAGE-based deductible for hurricane/windstorm damage. Ranges from 2% to 10% of Coverage A.",
      category: "Deductibles",
      examTip: "If Coverage A = $400,000 and 5% hurricane deductible, YOU pay first $20,000. HUGE out-of-pocket!"
    },
    {
      term: "Wind Mitigation Credits",
      definition: "Discounts for hurricane-resistant features: impact windows, hip roof, roof straps. Can save up to 45% on premium.",
      category: "Deductibles",
      examTip: "Requires official inspection form (OIR-B1-1802). Credits are MANDATORY by law in Florida."
    },

    // Underwriting
    {
      term: "Roof Age",
      definition: "Age of roof covering. THE #1 underwriting factor in Florida. Determines eligibility and settlement basis.",
      category: "Underwriting",
      examTip: "0-10 years = RCV. 11-15 years = Limited carriers. 16-20 years = ACV only. 20+ years = Replace or Citizens."
    },
    {
      term: "RCV (Replacement Cost Value)",
      definition: "Settlement at TODAY'S cost to replace with new, without depreciation deduction.",
      category: "Underwriting",
      examTip: "Requires roof 15 years or NEWER in Florida (post-2022 law). Better coverage, higher premium."
    },
    {
      term: "ACV (Actual Cash Value)",
      definition: "Replacement cost MINUS depreciation. Older roofs get less money.",
      category: "Underwriting",
      examTip: "Roofs 16+ years typically get ACV only. 20-year-old roof = minimal payout."
    },
    {
      term: "4-Point Inspection",
      definition: "Inspection of roof, electrical, plumbing, HVAC for homes 30+ years or when required by carrier.",
      category: "Underwriting",
      examTip: "Valid 12 months. Unacceptable 4-point = DECLINE. Must be licensed inspector."
    },
    {
      term: "Wind Mitigation Inspection",
      definition: "Inspection documenting hurricane-resistant features. Form OIR-B1-1802. Unlocks premium discounts.",
      category: "Underwriting",
      examTip: "Valid 5 years. NOT required but HIGHLY recommended for savings. Can reduce premium 30-45%."
    },

    // Florida-Specific
    {
      term: "Citizens Property Insurance",
      definition: "Florida's state-run insurer of LAST RESORT. Highest rates, limited coverage, assessable.",
      category: "Florida-Specific",
      examTip: "Must be DECLINED by 3+ private carriers first. Assessable = policyholders pay for hurricanes."
    },
    {
      term: "FAIR Plan",
      definition: "Florida's wind-only coverage for high-risk coastal properties. Must have separate non-wind policy.",
      category: "Florida-Specific",
      examTip: "Covers ONLY wind/hurricane. Need HO3 for everything else. Two separate policies!"
    },
    {
      term: "Sinkhole Coverage",
      definition: "Optional coverage for catastrophic ground collapse. Mandatory offering in high-risk counties (Pasco, Hernando, Hillsborough).",
      category: "Florida-Specific",
      examTip: "Must be OFFERED but can be rejected. Expensive add-on. Separate from Coverage A."
    },
    {
      term: "Flood Insurance (NFIP)",
      definition: "Federal program covering flood damage. ALWAYS excluded from homeowners. 30-day waiting period.",
      category: "Florida-Specific",
      examTip: "Even inland properties can flood! Need if mortgage requires it or in flood zone."
    },

    // Claims
    {
      term: "Prior Claims",
      definition: "Insurance claims filed in last 3-5 years. Underwriting red flag.",
      category: "Claims",
      examTip: "0 claims = discount. 1 claim = OK. 2 claims = limited markets. 3+ claims = Citizens/E&S only."
    },
    {
      term: "Paid Loss",
      definition: "Claim where insurer paid money. Worse than non-paid. Affects eligibility and rates for 5 years.",
      category: "Claims",
      examTip: "Water damage claims are WORST. 2+ water claims = very hard to insure."
    },
    {
      term: "CLUE Report",
      definition: "Comprehensive Loss Underwriting Exchange. 7-year claim history database. Insurers check this FIRST.",
      category: "Claims",
      examTip: "Follows the PROPERTY, not the owner. Check CLUE before buying a house!"
    },

    // Legal Terms
    {
      term: "Insurable Interest",
      definition: "Must own property or have financial stake to buy insurance. Can't insure neighbor's house.",
      category: "Legal Terms",
      examTip: "Must exist at time of LOSS, not just at purchase. Exam loves testing this."
    },
    {
      term: "Subrogation",
      definition: "Insurer's right to sue responsible party AFTER paying your claim. Example: Neighbor's tree damages your house.",
      category: "Legal Terms",
      examTip: "You can't sue if insurer already paid you. They take over your right to sue."
    },
    {
      term: "Appraisal Clause",
      definition: "Dispute resolution when insured and insurer disagree on damage amount. Each picks appraiser, they pick umpire.",
      category: "Legal Terms",
      examTip: "NOT arbitration. For amount disputes only, not coverage disputes."
    },
    {
      term: "Mortgagee Clause",
      definition: "Bank/lender listed on policy as loss payee. Gets check for dwelling damage along with insured.",
      category: "Legal Terms",
      examTip: "Protects lender's interest. Check must be endorsed by BOTH insured and mortgagee."
    },

    // Rating Factors
    {
      term: "TIV (Total Insured Value)",
      definition: "Sum of all coverage limits. Used to calculate premium. Higher TIV = higher premium.",
      category: "Rating",
      examTip: "TIV = Coverage A + B + C + D + E + F. Basis for package policy pricing."
    },
    {
      term: "Protection Class",
      definition: "ISO rating (1-10) based on fire protection. 1 = best (city with hydrants), 10 = worst (rural, no fire dept).",
      category: "Rating",
      examTip: "Lower number = lower premium. Class 9-10 can double your rates."
    },
    {
      term: "Construction Type",
      definition: "Frame/wood, masonry/concrete, brick, superior (concrete block). Affects rates and wind eligibility.",
      category: "Rating",
      examTip: "Masonry/concrete = best rates in Florida. Frame = highest rates or decline in wind zones."
    },
    {
      term: "Bundling Discount",
      definition: "Savings for having multiple policies with same carrier (auto + home). Typically 10-25% discount.",
      category: "Rating",
      examTip: "Can offset high home premium. Always check if bundling saves more than shopping separately."
    }
  ];

  const categories = ['all', ...new Set(glossaryTerms.map(t => t.category))];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">📚 Florida P&C Exam Glossary</h1>
            <p className="text-gray-600">Master these terms to ace your state exam!</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="🔍 Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
            />
            
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? '📖 All Terms' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-600 text-sm">
            Showing {filteredTerms.length} of {glossaryTerms.length} terms
          </div>

          {/* Glossary Terms */}
          <div className="space-y-4">
            {filteredTerms.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-white to-indigo-50 p-6 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-indigo-900">{item.term}</h3>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
                    {item.category}
                  </span>
                </div>
                
                <p className="text-gray-700 text-lg mb-4 leading-relaxed">{item.definition}</p>
                
                {item.examTip && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3 rounded">
                    <p className="text-sm font-semibold text-yellow-800">⚡ EXAM TIP:</p>
                    <p className="text-sm text-yellow-900">{item.examTip}</p>
                  </div>
                )}
                
                {item.example && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                    <p className="text-sm font-semibold text-green-800">💡 Example:</p>
                    <p className="text-sm text-green-900">{item.example}</p>
                  </div>
                )}
                
                {item.relatedTerms && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs text-gray-500">Related:</span>
                    {item.relatedTerms.map((related, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {related}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredTerms.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl mb-2">🔍 No terms found</p>
              <p>Try a different search or category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Glossary;


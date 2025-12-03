import React, { useState } from 'react';

const PracticeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const examQuestions = [
    {
      id: 1,
      question: "What type of coverage does an HO3 policy provide for the dwelling (Coverage A)?",
      options: [
        "Named peril only",
        "Open peril (special form)",
        "Actual cash value only",
        "Liability coverage"
      ],
      correct: 1,
      explanation: "HO3 provides OPEN PERIL coverage for Coverage A (dwelling), meaning it covers all risks except those specifically excluded. However, Coverage C (personal property) is NAMED PERIL only.",
      examTip: "Remember: HO3 = OPEN for dwelling, NAMED for belongings. This is a common exam question!"
    },
    {
      id: 2,
      question: "A homeowner has $400,000 in Coverage A with a 5% hurricane deductible. How much would they pay out-of-pocket for a $50,000 hurricane claim?",
      options: [
        "$2,500",
        "$5,000",
        "$20,000",
        "$50,000"
      ],
      correct: 2,
      explanation: "Hurricane deductible is PERCENTAGE-based. 5% of $400,000 Coverage A = $20,000. The homeowner pays the first $20,000, insurance pays the remaining $30,000.",
      examTip: "Hurricane deductibles are ALWAYS percentages, not flat amounts. Calculate: Coverage A × deductible % = your out-of-pocket."
    },
    {
      id: 3,
      question: "Which of the following is typically 10% of Coverage A?",
      options: [
        "Coverage C (Personal Property)",
        "Coverage B (Other Structures)",
        "Coverage D (Loss of Use)",
        "Coverage E (Liability)"
      ],
      correct: 1,
      explanation: "Coverage B (Other Structures) is typically 10% of Coverage A. Coverage C is usually 50-70%, Coverage D is 20-30%, and Coverage E is a separate limit.",
      examTip: "Memorize the percentages: B=10%, C=50-70%, D=20-30%."
    },
    {
      id: 4,
      question: "What is the MAXIMUM age for a roof to receive Replacement Cost Value (RCV) settlement in Florida after the 2022 reforms?",
      options: [
        "5 years",
        "10 years",
        "15 years",
        "20 years"
      ],
      correct: 2,
      explanation: "After Florida's 2022 insurance reforms, roofs 15 years or NEWER can receive RCV (replacement cost value). Roofs 16+ years old get ACV (actual cash value) with depreciation deducted.",
      examTip: "This is NEW law as of 2022. Exam will test updated roof age rules: 15 years or less = RCV, 16+ = ACV."
    },
    {
      id: 5,
      question: "Flood coverage is:",
      options: [
        "Included in standard HO3 policies",
        "Available as an endorsement to HO3",
        "Always excluded and requires separate NFIP policy",
        "Only excluded in coastal areas"
      ],
      correct: 2,
      explanation: "Flood is ALWAYS excluded from homeowners policies nationwide. You must purchase a separate NFIP (National Flood Insurance Program) policy with a 30-day waiting period.",
      examTip: "FLOOD = ALWAYS EXCLUDED. This is the #1 tested exclusion on exams. Don't confuse with water damage from pipes."
    },
    {
      id: 6,
      question: "Which occupancy type requires an HO3 policy?",
      options: [
        "Rental property",
        "Owner-occupied primary residence",
        "Vacation rental",
        "Commercial property"
      ],
      correct: 1,
      explanation: "HO3 is ONLY for owner-occupied primary residences. Rentals need DP3 (Dwelling Fire), condos need HO6, and renters need HO4.",
      examTip: "HO3 = OWNER LIVES THERE. If they don't live there, it's NOT HO3!"
    },
    {
      id: 7,
      question: "Coverage F (Medical Payments to Others) requires:",
      options: [
        "Proof of negligence by the insured",
        "A lawsuit to be filed first",
        "No fault - pays regardless of liability",
        "A deductible to be met"
      ],
      correct: 2,
      explanation: "Coverage F pays medical bills for guests injured on your property regardless of fault. No lawsuit needed, no deductible. Typically $1,000-$5,000 limit.",
      examTip: "Coverage F = NO FAULT, NO DEDUCTIBLE. Guest trips on your stairs? Coverage F pays even if you did nothing wrong."
    },
    {
      id: 8,
      question: "Citizens Property Insurance is:",
      options: [
        "A private insurance carrier",
        "Florida's insurer of last resort",
        "Only for commercial properties",
        "The same as FAIR Plan"
      ],
      correct: 1,
      explanation: "Citizens is Florida's STATE-RUN insurer of LAST RESORT for properties that can't get private market coverage. Higher rates, assessable policies, limited coverage.",
      examTip: "Citizens = LAST RESORT. Must be declined by 3+ private carriers first. Policyholders can be assessed after hurricanes."
    },
    {
      id: 9,
      question: "How many water damage claims typically make a property very difficult to insure in Florida?",
      options: [
        "1 claim",
        "2 claims",
        "3 claims",
        "4 claims"
      ],
      correct: 1,
      explanation: "TWO or more water damage claims in 3-5 years make a property extremely hard to insure. Water claims are the worst type - carriers see them as high risk for future claims.",
      examTip: "Water claims are TOXIC. 1 = OK, 2 = very limited markets, 3+ = Citizens/E&S only."
    },
    {
      id: 10,
      question: "Wind mitigation credits in Florida are:",
      options: [
        "Optional for insurance carriers to offer",
        "Mandatory by state law",
        "Only available for new construction",
        "Not applicable to HO3 policies"
      ],
      correct: 1,
      explanation: "Florida LAW REQUIRES carriers to offer wind mitigation discounts for features like impact windows, hip roofs, and roof straps. Can save up to 45% on premiums.",
      examTip: "Wind mitigation credits are MANDATORY. Carriers MUST offer them if you have the features and the inspection form."
    },
    {
      id: 11,
      question: "A 4-point inspection is typically required for homes:",
      options: [
        "10 years or older",
        "20 years or older",
        "30 years or older",
        "50 years or older"
      ],
      correct: 2,
      explanation: "Most carriers require a 4-point inspection for homes 30+ years old, inspecting roof, electrical, plumbing, and HVAC. Valid for 12 months only.",
      examTip: "30 years = 4-point needed. Inspects ROOFING, ELECTRICAL, PLUMBING, HVAC. Remember: REPH."
    },
    {
      id: 12,
      question: "What does the mortgagee clause ensure?",
      options: [
        "The homeowner gets paid first",
        "The lender is protected if the home is damaged",
        "The mortgage payment is covered",
        "The home can't be sold"
      ],
      correct: 1,
      explanation: "The mortgagee clause makes the lender (bank) a loss payee on dwelling claims. Insurance checks must be endorsed by BOTH the insured and the mortgagee.",
      examTip: "Mortgagee = LENDER. They're listed because they have financial interest. Claim check needs both signatures."
    },
    {
      id: 13,
      question: "Subrogation allows the insurance company to:",
      options: [
        "Cancel the policy after a claim",
        "Sue the responsible third party after paying the claim",
        "Increase the premium",
        "Deny future claims"
      ],
      correct: 1,
      explanation: "After paying your claim, the insurer takes over YOUR right to sue the responsible party. Example: Neighbor's tree falls on your house - insurer pays you, then sues neighbor.",
      examTip: "Subrogation = insurer steps into YOUR shoes. They paid you, now they can sue whoever caused the damage."
    },
    {
      id: 14,
      question: "CLUE reports contain:",
      options: [
        "3 years of claim history",
        "5 years of claim history",
        "7 years of claim history",
        "10 years of claim history"
      ],
      correct: 2,
      explanation: "CLUE (Comprehensive Loss Underwriting Exchange) reports show 7 years of claims history. They follow the PROPERTY, not the owner.",
      examTip: "CLUE = 7 years. Follows the PROPERTY address, not the person. Check CLUE before buying a house!"
    },
    {
      id: 15,
      question: "Protection Class ratings range from:",
      options: [
        "A to F",
        "1 to 5",
        "1 to 10",
        "100 to 500"
      ],
      correct: 2,
      explanation: "ISO Protection Class rates fire protection from 1 (best - city with hydrants) to 10 (worst - no fire protection). Lower number = lower premium.",
      examTip: "1-10 scale. Class 1 = great rates. Class 9-10 = rural, expensive, some carriers won't write."
    },
    {
      id: 16,
      question: "How long is the typical waiting period for NFIP flood insurance?",
      options: [
        "No waiting period",
        "15 days",
        "30 days",
        "90 days"
      ],
      correct: 2,
      explanation: "NFIP flood policies have a 30-day waiting period before coverage begins (with some exceptions for new purchases). Plan ahead - can't buy during a hurricane!",
      examTip: "30 days = standard NFIP waiting period. Exception: 0 days if required at closing by lender."
    },
    {
      id: 17,
      question: "Which counties in Florida MUST offer sinkhole coverage?",
      options: [
        "All coastal counties",
        "Miami-Dade, Broward, Palm Beach",
        "Pasco, Hernando, Hillsborough",
        "No counties require it"
      ],
      correct: 2,
      explanation: "Pasco, Hernando, and Hillsborough counties (Tampa Bay area) are high-risk sinkhole zones. Insurers MUST OFFER coverage, but homeowners can decline it.",
      examTip: "Remember 'PHH' - Pasco, Hernando, Hillsborough = sinkhole country. MUST offer, not MUST buy."
    },
    {
      id: 18,
      question: "Coverage D (Loss of Use) typically pays for:",
      options: [
        "Your normal living expenses",
        "Only the DIFFERENCE in living costs while displaced",
        "A fixed daily amount",
        "Permanent relocation costs"
      ],
      correct: 1,
      explanation: "Coverage D pays the ADDITIONAL costs above your normal expenses. If you usually spend $100/day on food and now spend $150, it pays the extra $50, not the full $150.",
      examTip: "ADDITIONAL = key word. Not total costs, just the EXTRA amount you're spending."
    },
    {
      id: 19,
      question: "What construction type typically gets the BEST rates in Florida?",
      options: [
        "Frame/Wood",
        "Brick veneer",
        "Masonry/Concrete block",
        "Log cabin"
      ],
      correct: 2,
      explanation: "Masonry/concrete block construction gets the best rates because it's most hurricane-resistant. Frame construction is highest risk and gets highest rates (or declines).",
      examTip: "In Florida: Concrete/masonry = BEST rates. Frame/wood = WORST rates. Hurricane resistance matters!"
    },
    {
      id: 20,
      question: "Insurable interest means:",
      options: [
        "You're interested in buying insurance",
        "You have a financial stake in the property",
        "The property is interesting",
        "You can earn interest on the policy"
      ],
      correct: 1,
      explanation: "Insurable interest means you must own the property or have a financial interest in it. You can't insure your neighbor's house - you have no insurable interest.",
      examTip: "Must have insurable interest at time of LOSS. Can't profit from insurance - only restore to pre-loss condition."
    }
  ];

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === examQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      selectedAnswer: answerIndex,
      correct: answerIndex === examQuestions[currentQuestion].correct
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const currentQ = examQuestions[currentQuestion];
  const isQuizComplete = currentQuestion === examQuestions.length - 1 && showExplanation;
  const percentage = answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-900 mb-2">🎯 Florida P&C Practice Exam</h1>
            <p className="text-gray-600">Test your knowledge with exam-style questions</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {examQuestions.length}</span>
              <span>Score: {score}/{answeredQuestions.length} ({percentage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / examQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl mb-6">
            <p className="text-2xl font-bold text-purple-900 leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correct;
              const showResult = showExplanation;

              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all text-lg font-medium ";
              
              if (!showResult) {
                buttonClass += isSelected 
                  ? "border-purple-500 bg-purple-50 shadow-md" 
                  : "border-gray-200 hover:border-purple-300 hover:bg-purple-50";
              } else {
                if (isCorrect) {
                  buttonClass += "border-green-500 bg-green-50 text-green-900";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-red-500 bg-red-50 text-red-900";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswer(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <span className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mr-3 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && isCorrect && <span className="ml-auto text-green-600">✓ Correct</span>}
                    {showResult && isSelected && !isCorrect && <span className="ml-auto text-red-600">✗ Wrong</span>}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="space-y-4 mb-6">
              <div className={`p-6 rounded-xl border-2 ${
                selectedAnswer === currentQ.correct 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-red-50 border-red-300'
              }`}>
                <p className="font-bold text-lg mb-2">
                  {selectedAnswer === currentQ.correct ? '✅ Correct!' : '❌ Incorrect'}
                </p>
                <p className="text-gray-800 leading-relaxed">{currentQ.explanation}</p>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 p-6 rounded-xl">
                <p className="font-bold text-yellow-900 mb-2">⚡ EXAM TIP:</p>
                <p className="text-yellow-900 leading-relaxed">{currentQ.examTip}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t-2">
            {isQuizComplete ? (
              <div className="w-full">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8 rounded-xl text-center mb-4">
                  <h2 className="text-3xl font-bold mb-4">🎉 Quiz Complete!</h2>
                  <p className="text-5xl font-bold mb-2">{percentage}%</p>
                  <p className="text-xl mb-4">You scored {score} out of {examQuestions.length}</p>
                  <p className="text-lg">
                    {percentage >= 80 && "🌟 Excellent! You're exam-ready!"}
                    {percentage >= 60 && percentage < 80 && "✅ Good job! Review the missed questions."}
                    {percentage < 60 && "📚 Keep studying! Review the concepts and try again."}
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg"
                >
                  🔄 Start New Quiz
                </button>
              </div>
            ) : (
              <>
                <div className="text-gray-600">
                  {showExplanation && (
                    <span className="text-sm">
                      {selectedAnswer === currentQ.correct ? '✅ You got it right!' : '❌ Review the explanation'}
                    </span>
                  )}
                </div>
                <button
                  onClick={nextQuestion}
                  disabled={!showExplanation}
                  className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                    showExplanation
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next Question →
                </button>
              </>
            )}
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-purple-900 mb-3">📖 Study Tips for Exam Success:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Review ALL exam tips and explanations carefully - they highlight commonly tested concepts</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Memorize coverage percentages: Coverage B = 10% of A, C = 50-70%, D = 20-30%</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Know Florida-specific rules: 15-year roof law, wind mitigation credits, Citizens = last resort</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Understand the difference between open peril (HO3 dwelling) vs named peril (HO3 personal property)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Remember exclusions: FLOOD is ALWAYS excluded, need separate NFIP policy</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuiz;


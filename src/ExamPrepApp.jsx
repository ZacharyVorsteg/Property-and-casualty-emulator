import React, { useState } from 'react';
import ComprehensiveHO3 from './ComprehensiveHO3';
import Glossary from './components/ExamPrep/Glossary';
import PracticeQuiz from './components/ExamPrep/PracticeQuiz';
import StudyGuide from './components/ExamPrep/StudyGuide';
import AlertContainer from './components/Alert';

const ExamPrepApp = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    {
      id: 'home',
      name: 'Home',
      icon: '🏠',
      description: 'Welcome & Overview'
    },
    {
      id: 'study',
      name: 'Study Guide',
      icon: '📖',
      description: 'Comprehensive Study Materials'
    },
    {
      id: 'glossary',
      name: 'Glossary',
      icon: '📚',
      description: 'Key Terms & Definitions'
    },
    {
      id: 'quiz',
      name: 'Practice Quiz',
      icon: '🎯',
      description: 'Test Your Knowledge'
    },
    {
      id: 'simulator',
      name: 'Simulator',
      icon: '🏗️',
      description: 'Hands-On Underwriting Practice'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'study':
        return <StudyGuide />;
      case 'glossary':
        return <Glossary />;
      case 'quiz':
        return <PracticeQuiz />;
      case 'simulator':
        return <ComprehensiveHO3 />;
      case 'home':
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AlertContainer />
      
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🎓</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Florida P&C Exam Prep</h1>
                <p className="text-xs text-indigo-100">Your complete study companion</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-indigo-700 shadow-lg'
                    : 'bg-indigo-500 bg-opacity-30 text-white hover:bg-opacity-50'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            🎯 Study smart, pass with confidence | Florida Property & Casualty Insurance Exam Prep Tool
          </p>
          <p className="text-xs mt-2 opacity-50">
            For educational purposes only. Consult official study materials and FL OIR regulations.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Home Page Component
const HomePage = ({ setActiveTab }) => {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 rounded-2xl shadow-2xl mb-8">
          <h1 className="text-5xl font-bold mb-4">Welcome to Your Exam Prep Journey! 🎓</h1>
          <p className="text-2xl mb-6">Everything you need to pass the Florida P&C Insurance exam</p>
          <div className="bg-white bg-opacity-20 p-6 rounded-xl">
            <p className="text-lg font-semibold mb-2">✨ What makes this tool special:</p>
            <ul className="space-y-2 text-sm">
              <li>✓ <strong>UPDATED</strong> for 2022 Florida roof law changes</li>
              <li>✓ <strong>COMPREHENSIVE</strong> glossary with exam tips</li>
              <li>✓ <strong>INTERACTIVE</strong> practice quiz with instant feedback</li>
              <li>✓ <strong>REALISTIC</strong> underwriting simulator</li>
              <li>✓ <strong>FOCUSED</strong> on high-test Florida-specific rules</li>
            </ul>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div 
            onClick={() => setActiveTab('study')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-4 border-transparent hover:border-indigo-500"
          >
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-bold text-indigo-900 mb-3">Study Guide</h3>
            <p className="text-gray-600 mb-4">
              Master all key concepts with our comprehensive, organized study materials. Covers:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• HO3 Coverage Types (A-F)</li>
              <li>• Florida-Specific Rules</li>
              <li>• Exclusions & Limitations</li>
              <li>• Formulas & Calculations</li>
              <li>• Quick Facts to Memorize</li>
            </ul>
            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 font-semibold">
              Start Studying →
            </button>
          </div>

          <div 
            onClick={() => setActiveTab('glossary')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-4 border-transparent hover:border-purple-500"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-purple-900 mb-3">Glossary</h3>
            <p className="text-gray-600 mb-4">
              50+ essential insurance terms with exam tips and real examples:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Coverage Types & Definitions</li>
              <li>• Perils & Exclusions</li>
              <li>• Underwriting Terms</li>
              <li>• Florida-Specific Concepts</li>
              <li>• Legal & Rating Terms</li>
            </ul>
            <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-semibold">
              Browse Glossary →
            </button>
          </div>

          <div 
            onClick={() => setActiveTab('quiz')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-4 border-transparent hover:border-blue-500"
          >
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Practice Quiz</h3>
            <p className="text-gray-600 mb-4">
              Test yourself with 20 exam-style questions featuring:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Instant feedback & explanations</li>
              <li>• Exam tips for each question</li>
              <li>• Progress tracking</li>
              <li>• Multiple choice format</li>
              <li>• Covers all key topics</li>
            </ul>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
              Take Quiz →
            </button>
          </div>

          <div 
            onClick={() => setActiveTab('simulator')}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border-4 border-transparent hover:border-green-500"
          >
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-2xl font-bold text-green-900 mb-3">Underwriting Simulator</h3>
            <p className="text-gray-600 mb-4">
              Practice real-world scenarios with our interactive simulator:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Step-by-step underwriting process</li>
              <li>• 10 pre-built scenarios</li>
              <li>• Real-time feedback</li>
              <li>• Carrier matching logic</li>
              <li>• Wind mitigation calculator</li>
            </ul>
            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold">
              Launch Simulator →
            </button>
          </div>
        </div>

        {/* Study Plan */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-xl border-4 border-yellow-400 shadow-lg">
          <h3 className="text-3xl font-bold text-yellow-900 mb-4">📅 Suggested Study Plan</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600 mb-2">Week 1</div>
              <p className="text-sm font-semibold mb-2">📖 Study Guide</p>
              <p className="text-xs text-gray-600">Read all sections, take notes on key concepts</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">Week 2</div>
              <p className="text-sm font-semibold mb-2">📚 Glossary</p>
              <p className="text-xs text-gray-600">Memorize definitions, focus on exam tips</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">Week 3</div>
              <p className="text-sm font-semibold mb-2">🎯 Practice Quiz</p>
              <p className="text-xs text-gray-600">Take quiz multiple times, aim for 90%+</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">Week 4</div>
              <p className="text-sm font-semibold mb-2">🏗️ Simulator</p>
              <p className="text-xs text-gray-600">Practice all scenarios, understand logic</p>
            </div>
          </div>
        </div>

        {/* Key Reminders */}
        <div className="mt-8 bg-red-50 border-4 border-red-300 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-red-900 mb-4">🔥 Critical Exam Reminders</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold text-red-700">FLOOD = EXCLUDED</p>
              <p className="text-xs">Always need separate NFIP</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold text-red-700">Roof: 15 years = RCV cutoff</p>
              <p className="text-xs">NEW 2022 law!</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-bold text-red-700">Hurricane = % Deductible</p>
              <p className="text-xs">Not flat dollar!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPrepApp;


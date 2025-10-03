import { motion } from 'framer-motion';

const RiskMeter = ({ score, factors = [] }) => {
  // Score 0-100: 0=Preferred, 100=Decline
  const getZone = (score) => {
    if (score <= 30) return { color: '#10b981', label: 'PREFERRED', bg: 'bg-green-50', text: 'text-green-800' };
    if (score <= 50) return { color: '#f59e0b', label: 'STANDARD', bg: 'bg-yellow-50', text: 'text-yellow-800' };
    if (score <= 70) return { color: '#f97316', label: 'SUBSTANDARD', bg: 'bg-orange-50', text: 'text-orange-800' };
    return { color: '#ef4444', label: 'DECLINE/E&S', bg: 'bg-red-50', text: 'text-red-800' };
  };
  
  const zone = getZone(score);
  const rotation = (score / 100) * 180 - 90; // -90 to +90 degrees
  
  return (
    <div className="group relative">
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-16">
          {/* Meter background */}
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
              strokeLinecap="round"
            />
            
            {/* Colored zones */}
            <path
              d="M 20 80 A 80 80 0 0 1 68 30"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d="M 68 30 A 80 80 0 0 1 100 20"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d="M 100 20 A 80 80 0 0 1 132 30"
              fill="none"
              stroke="#f97316"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d="M 132 30 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#ef4444"
              strokeWidth="20"
              strokeLinecap="round"
              opacity="0.3"
            />
            
            {/* Needle */}
            <motion.line
              x1="100"
              y1="80"
              x2="100"
              y2="30"
              stroke={zone.color}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ rotate: -90 }}
              animate={{ rotate: rotation }}
              transition={{ type: 'spring', stiffness: 60 }}
              style={{ transformOrigin: '100px 80px' }}
            />
            
            {/* Center dot */}
            <circle cx="100" cy="80" r="5" fill={zone.color} />
          </svg>
        </div>
        
        <div>
          <div className={`text-xs font-semibold px-2 py-1 rounded ${zone.bg} ${zone.text}`}>
            {zone.label}
          </div>
          <div className="text-xs text-gray-500 mt-1">Risk Score: {score}/100</div>
        </div>
      </div>
      
      {/* Breakdown tooltip on hover */}
      {factors.length > 0 && (
        <div className="invisible group-hover:visible absolute top-full left-0 mt-2 bg-white border-2 border-gray-200 rounded-lg p-3 shadow-xl z-50 w-64">
          <div className="font-bold text-sm mb-2">Score Breakdown:</div>
          <div className="space-y-1 text-xs">
            {factors.map((factor, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-gray-700">{factor.name}</span>
                <span className={`font-semibold ${factor.impact > 0 ? 'text-red-600' : factor.impact < 0 ? 'text-green-600' : 'text-gray-600'}`}>
                  {factor.impact > 0 ? '+' : ''}{factor.impact}
                </span>
              </div>
            ))}
            <div className="border-t pt-1 mt-1 flex justify-between font-bold">
              <span>Total:</span>
              <span>{score}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskMeter;


import { motion } from 'framer-motion';

const RiskMeter = ({ score }) => {
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
  );
};

export default RiskMeter;


import { useState } from 'react';

const Tooltip = ({ content, children }) => {
  const [show, setShow] = useState(false);
  
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="ml-1 text-blue-600 hover:text-blue-800 cursor-help text-xs font-bold"
      >
        ❓
      </button>
      
      {show && (
        <div className="absolute z-50 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl bottom-full left-0 mb-2">
          <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;


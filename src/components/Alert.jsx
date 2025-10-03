import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../store/useStore';

const Alert = ({ alert }) => {
  const removeAlert = useStore((state) => state.removeAlert);
  
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: '💡',
    critical: '🚨'
  };
  
  const styles = {
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
    info: 'alert-info',
    critical: 'alert-error'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`${styles[alert.type]} mb-3 flex items-start justify-between`}
    >
      <div className="flex items-start">
        <span className="text-xl mr-3">{icons[alert.type]}</span>
        <div>
          {alert.title && <div className="font-bold mb-1">{alert.title}</div>}
          <div className="text-sm">{alert.message}</div>
        </div>
      </div>
      <button
        onClick={() => removeAlert(alert.id)}
        className="ml-4 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </motion.div>
  );
};

const AlertContainer = () => {
  const alerts = useStore((state) => state.alerts);
  
  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <AnimatePresence>
        {alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertContainer;


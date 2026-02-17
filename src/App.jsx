import { AnimatePresence, motion } from 'framer-motion';
import useLoadoutStore from './store/loadoutStore';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import BaseSelection from './pages/BaseSelection';
import CustomizationLab from './pages/CustomizationLab';
import AgentProfile from './pages/AgentProfile';
import ComparisonView from './pages/ComparisonView';
import { pageTransition } from './lib/motionVariants';
import { useEffect } from 'react';

function App() {
  const currentScreen = useLoadoutStore((state) => state.currentScreen);
  const darkMode = useLoadoutStore((state) => state.darkMode);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'selection':
        return <BaseSelection />;
      case 'customization':
        return <CustomizationLab />;
      case 'comparison':
        return <ComparisonView />;
      case 'profile':
        return <AgentProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative min-h-screen bg-armory-darker text-white">
      <AnimatedBackground />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Global Overlay Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-armory-darker/50 to-transparent" />
      </div>
    </div>
  );
}

export default App;

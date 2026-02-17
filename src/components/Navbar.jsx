import { motion } from 'framer-motion';
import useLoadoutStore from '../store/loadoutStore';
import { slideInFromTop } from '../lib/motionVariants';

const Navbar = () => {
  const { darkMode, toggleDarkMode, currentScreen, setCurrentScreen, agentProfile } = useLoadoutStore();

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '🏠' },
    { id: 'selection', label: 'BASE SELECT', icon: '🎯' },
    { id: 'customization', label: 'ARMORY', icon: '⚙️' },
    { id: 'comparison', label: 'COMPARE', icon: '⚖️' },
    { id: 'profile', label: 'PROFILE', icon: '👤' },
  ];

  return (
    <motion.nav
      variants={slideInFromTop}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-armory-blue/30"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 border-2 border-armory-blue neon-border flex items-center justify-center font-display font-bold">
              <span className="neon-text">A</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold neon-text tracking-wider">
                AGENT ARMORY
              </h1>
              <p className="text-xs text-gray-500 tracking-widest">CLASSIFIED SYSTEM</p>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`px-4 py-2 font-display text-sm tracking-wider transition-all duration-300 relative overflow-hidden ${
                  currentScreen === item.id
                    ? 'text-armory-blue'
                    : 'text-gray-400 hover:text-armory-blue'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentScreen === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 glass-panel neon-border"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right Section - Agent Info */}
          <div className="flex items-center space-x-4">
            {/* Agent Level */}
            <div className="glass-panel px-4 py-2 border border-armory-gold/30">
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-xs text-gray-500 tracking-wider">AGENT</p>
                  <p className="text-sm font-display gold-text font-bold">
                    LVL {agentProfile.level}
                  </p>
                </div>
                <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-armory-gold to-armory-blue"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${(agentProfile.xp % 1000) / 10}%` 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="w-10 h-10 glass-panel-hover border border-armory-blue/30 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? '🌙' : '☀️'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

import { motion } from 'framer-motion';
import { useState } from 'react';
import useLoadoutStore from '../store/loadoutStore';
import BuildComparison from '../components/BuildComparison';
import StatRadarChart from '../components/StatRadarChart';
import { slideInFromBottom } from '../lib/motionVariants';

const ComparisonView = () => {
  const { savedLoadouts, setCurrentScreen } = useLoadoutStore();
  const [selectedLoadout1Id, setSelectedLoadout1Id] = useState(null);
  const [selectedLoadout2Id, setSelectedLoadout2Id] = useState(null);

  const loadout1 = savedLoadouts.find(l => l.id === selectedLoadout1Id);
  const loadout2 = savedLoadouts.find(l => l.id === selectedLoadout2Id);

  if (savedLoadouts.length < 2) {
    
    
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 text-center neon-border max-w-md"
        >
          <div className="text-6xl mb-4">⚖️</div>
          <h2 className="text-2xl font-display font-bold text-gray-300 mb-4">
            INSUFFICIENT DATA
          </h2>
          <p className="text-gray-500 mb-6">
            You need at least 2 loadouts to perform a comparison
          </p>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="px-8 py-4 neon-border font-display font-bold neon-text"
          >
            BACK TO DASHBOARD
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-display font-bold neon-text mb-2 tracking-wider">
            TACTICAL COMPARISON
          </h1>
          <p className="text-gray-400 text-lg">
            Side-by-side loadout analysis
          </p>
        </motion.div>

        {/* Loadout Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Select Loadout 1 */}
          <motion.div
            variants={slideInFromBottom}
            initial="hidden"
            animate="visible"
            className="glass-panel p-6 border border-armory-blue/30"
          >
            <h3 className="text-lg font-display font-bold text-armory-blue mb-4">
              PRIMARY LOADOUT
            </h3>
            <select
              value={selectedLoadout1Id || ''}
              onChange={(e) => setSelectedLoadout1Id(e.target.value)}
              className="w-full bg-armory-dark border-2 border-armory-blue rounded px-4 py-3 font-display text-white outline-none focus:border-armory-cyan transition-colors"
            >
              <option value="">Select loadout...</option>
              {savedLoadouts.map((loadout) => (
                <option key={loadout.id} value={loadout.id}>
                  {loadout.name} ({loadout.baseModel?.name})
                </option>
              ))}
            </select>
          </motion.div>

          {/* Select Loadout 2 */}
          <motion.div
            variants={slideInFromBottom}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 border border-armory-gold/30"
          >
            <h3 className="text-lg font-display font-bold text-armory-gold mb-4">
              SECONDARY LOADOUT
            </h3>
            <select
              value={selectedLoadout2Id || ''}
              onChange={(e) => setSelectedLoadout2Id(e.target.value)}
              className="w-full bg-armory-dark border-2 border-armory-gold rounded px-4 py-3 font-display text-white outline-none focus:border-yellow-400 transition-colors"
            >
              <option value="">Select loadout...</option>
              {savedLoadouts.map((loadout) => (
                <option key={loadout.id} value={loadout.id}>
                  {loadout.name} ({loadout.baseModel?.name})
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Comparison Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BuildComparison loadout1={loadout1} loadout2={loadout2} />
        </motion.div>

        {/* Radar Chart Comparison */}
        {loadout1 && loadout2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          >
            <StatRadarChart stats={loadout1.stats} className="border border-armory-blue/30" />
            <StatRadarChart stats={loadout2.stats} className="border border-armory-gold/30" />
          </motion.div>
        )}

        {/* Back Button */}
        <motion.button
          onClick={() => setCurrentScreen('dashboard')}
          className="mt-8 px-6 py-3 glass-panel-hover border border-gray-600 font-display text-gray-400 hover:text-white transition-all"
          whileHover={{ x: -5 }}
        >
          ← BACK TO DASHBOARD
        </motion.button>
      </div>
    </div>
  );
};

export default ComparisonView;

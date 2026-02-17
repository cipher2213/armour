import { motion } from 'framer-motion';
import { useState } from 'react';
import useLoadoutStore from '../store/loadoutStore';
import { staggerContainer, staggerItem, hoverScale } from '../lib/motionVariants';
import { formatDate, downloadAsJSON, copyToClipboard } from '../lib/utils';

const Dashboard = () => {
  const { savedLoadouts, setCurrentScreen, loadLoadout, deleteLoadout, newLoadout, agentProfile } = useLoadoutStore();
  const [copiedId, setCopiedId] = useState(null);

  const handleNewLoadout = () => {
    newLoadout();
    setCurrentScreen('selection');
  };

  const handleEditLoadout = (id) => {
    loadLoadout(id);
    setCurrentScreen('customization');
  };

  const handleExportAll = () => {
    downloadAsJSON(savedLoadouts, `armory-loadouts-${Date.now()}`);
  };

  const handleExportLoadout = (loadout) => {
    downloadAsJSON(loadout, `loadout-${loadout.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleShareLoadout = async (loadout) => {
    const success = await copyToClipboard(JSON.stringify(loadout, null, 2));
    if (success) {
      setCopiedId(loadout.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-display font-bold neon-text mb-2 tracking-wider">
            MISSION CONTROL
          </h1>
          <p className="text-gray-400 text-lg">
            {savedLoadouts.length} Active Loadouts • Level {agentProfile.level} Clearance
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={staggerItem} className="glass-panel p-6 neon-border">
            <div className="text-4xl mb-2">📦</div>
            <h3 className="text-2xl font-display font-bold neon-text">{savedLoadouts.length}</h3>
            <p className="text-gray-500 text-sm">Total Builds</p>
          </motion.div>

          <motion.div variants={staggerItem} className="glass-panel p-6 border border-armory-gold/30">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="text-2xl font-display font-bold gold-text">LVL {agentProfile.level}</h3>
            <p className="text-gray-500 text-sm">Agent Rank</p>
          </motion.div>

          <motion.div variants={staggerItem} className="glass-panel p-6 border border-purple-500/30">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-2xl font-display font-bold text-purple-400">{agentProfile.xp}</h3>
            <p className="text-gray-500 text-sm">Total XP</p>
          </motion.div>

          <motion.div variants={staggerItem} className="glass-panel p-6 border border-green-500/30">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-2xl font-display font-bold text-green-400">{agentProfile.achievements.length}</h3>
            <p className="text-gray-500 text-sm">Achievements</p>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-gray-300">YOUR ARSENAL</h2>
          <div className="flex space-x-4">
            {savedLoadouts.length > 0 && (
              <motion.button
                onClick={handleExportAll}
                className="px-6 py-3 glass-panel-hover border border-green-500/30 font-display font-bold tracking-wider text-green-400 hover:bg-green-500/10 transition-all"
                variants={hoverScale}
                whileHover="hover"
                whileTap="tap"
              >
                📥 EXPORT ALL
              </motion.button>
            )}
            <motion.button
              onClick={handleNewLoadout}
              className="px-6 py-3 glass-panel neon-border font-display font-bold tracking-wider neon-text hover:bg-glass-hover transition-all"
              variants={hoverScale}
              whileHover="hover"
              whileTap="tap"
            >
              + CREATE NEW LOADOUT
            </motion.button>
          </div>
        </div>

        {/* Loadouts Grid */}
        {savedLoadouts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-12 text-center border border-dashed border-gray-600"
          >
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-display font-bold text-gray-400 mb-2">
              NO LOADOUTS DETECTED
            </h3>
            <p className="text-gray-500 mb-6">
              Begin your mission by creating your first tactical loadout
            </p>
            <motion.button
              onClick={handleNewLoadout}
              className="px-8 py-4 glass-panel neon-border font-display font-bold tracking-wider neon-text text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              INITIATE BUILD
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {savedLoadouts.map((loadout) => (
              <motion.div
                key={loadout.id}
                variants={staggerItem}
                className="glass-panel p-6 border border-armory-blue/20 hover:border-armory-blue/60 transition-all cursor-pointer group relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                {/* Scanline Effect */}
                <div className="absolute inset-0 scanline opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Rarity Badge */}
                <div 
                  className="absolute top-4 right-4 px-3 py-1 rounded text-xs font-display font-bold uppercase"
                  style={{
                    backgroundColor: `${loadout.baseModel?.rarity === 'legendary' ? '#fbbf24' : 
                                      loadout.baseModel?.rarity === 'epic' ? '#a855f7' : 
                                      loadout.baseModel?.rarity === 'rare' ? '#3b82f6' : '#9ca3af'}20`,
                    color: loadout.baseModel?.rarity === 'legendary' ? '#fbbf24' : 
                           loadout.baseModel?.rarity === 'epic' ? '#a855f7' : 
                           loadout.baseModel?.rarity === 'rare' ? '#3b82f6' : '#9ca3af'
                  }}
                >
                  {loadout.baseModel?.rarity || 'Common'}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-display font-bold text-white mb-2 truncate">
                    {loadout.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {loadout.baseModel?.name || 'No Base Model'}
                  </p>

                  {/* Stats Mini Display */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(loadout.stats).map(([stat, value]) => (
                      <div key={stat} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 uppercase">{stat}</span>
                        <span className="text-armory-blue font-bold">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Energy Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">ENERGY</span>
                      <span className="text-armory-cyan">
                        {loadout.energyUsage}/{loadout.energyCapacity}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          loadout.energyUsage / loadout.energyCapacity > 0.8
                            ? 'bg-red-500'
                            : 'bg-gradient-to-r from-armory-blue to-armory-cyan'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(loadout.energyUsage / loadout.energyCapacity) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-4">
                    Updated: {formatDate(loadout.updatedAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 mb-2">
                    <button
                      onClick={() => handleEditLoadout(loadout.id)}
                      className="flex-1 py-2 glass-panel-hover neon-border text-xs font-display font-bold neon-text"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this loadout?')) {
                          deleteLoadout(loadout.id);
                        }
                      }}
                      className="px-4 py-2 glass-panel-hover border border-red-500/30 text-xs font-display font-bold text-red-400 hover:bg-red-500/10"
                    >
                      DELETE
                    </button>
                  </div>

                  {/* Export & Share Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportLoadout(loadout);
                      }}
                      className="flex-1 py-2 glass-panel-hover border border-blue-500/30 text-xs font-display font-bold text-blue-400 hover:bg-blue-500/10"
                    >
                      📥 EXPORT
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShareLoadout(loadout);
                      }}
                      className="flex-1 py-2 glass-panel-hover border border-purple-500/30 text-xs font-display font-bold text-purple-400 hover:bg-purple-500/10"
                    >
                      {copiedId === loadout.id ? '✓ COPIED' : '📋 SHARE'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

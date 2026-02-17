import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLoadoutStore from '../store/loadoutStore';
import { attachmentCategories, attachments, colorThemes, skins } from '../data/loadoutData';
import { staggerContainer, staggerItem } from '../lib/motionVariants';
import { calculateBuildCompletion, randomizeLoadout, getPresetLoadouts, applyPreset } from '../lib/utils';
import ColorThemePicker from '../components/ColorThemePicker';
import SkinSelector from '../components/SkinSelector';
import StatRadarChart from '../components/StatRadarChart';

const CustomizationLab = () => {
  const [selectedCategory, setSelectedCategory] = useState('optic');
  const [showPresets, setShowPresets] = useState(false);
  const {
    currentLoadout,
    setAttachment,
    removeAttachment,
    setLoadoutName,
    saveLoadout,
    setCurrentScreen,
  } = useLoadoutStore();

  const completionPercentage = calculateBuildCompletion(currentLoadout);
  const categoryAttachments = attachments[selectedCategory] || [];

  const handleAttachmentSelect = (attachment) => {
    if (attachment.locked) return;
    
    const isCurrentlyEquipped = currentLoadout.attachments[selectedCategory]?.id === attachment.id;
    
    if (isCurrentlyEquipped) {
      removeAttachment(selectedCategory);
    } else {
      setAttachment(selectedCategory, attachment);
    }
  };

  const handleSave = () => {
    saveLoadout();
    setCurrentScreen('dashboard');
  };

  const handleRandomize = () => {
    const randomAttachments = randomizeLoadout(currentLoadout.baseModel, attachments);
    Object.entries(randomAttachments).forEach(([category, attachment]) => {
      if (attachment) {
        setAttachment(category, attachment);
      } else {
        removeAttachment(category);
      }
    });
  };

  const handleApplyPreset = (preset) => {
    const presetAttachments = applyPreset(preset, currentLoadout.baseModel, attachments);
    Object.entries(presetAttachments).forEach(([category, attachment]) => {
      if (attachment) {
        setAttachment(category, attachment);
      } else {
        removeAttachment(category);
      }
    });
    setShowPresets(false);
  };

  if (!currentLoadout.baseModel) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 text-center neon-border max-w-md"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-display font-bold text-gray-300 mb-4">
            NO BASE MODEL SELECTED
          </h2>
          <p className="text-gray-500 mb-6">
            You must select a base model before customizing
          </p>
          <button
            onClick={() => setCurrentScreen('selection')}
            className="px-8 py-4 neon-border font-display font-bold neon-text"
          >
            SELECT BASE MODEL
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-[1600px]">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <input
              type="text"
              value={currentLoadout.name}
              onChange={(e) => setLoadoutName(e.target.value)}
              className="bg-transparent border-b-2 border-armory-blue text-3xl font-display font-bold neon-text outline-none px-2 py-1"
              placeholder="Enter loadout name..."
            />
            <p className="text-gray-500 text-sm mt-1">
              Base: {currentLoadout.baseModel.name}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="glass-panel px-6 py-3 neon-border">
              <p className="text-xs text-gray-500 mb-1">BUILD COMPLETION</p>
              <div className="flex items-center space-x-3">
                <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-armory-blue to-armory-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-lg font-display font-bold neon-text">
                  {completionPercentage}%
                </span>
              </div>
            </div>

            <motion.button
              onClick={handleRandomize}
              className="px-6 py-3 glass-panel-hover border border-purple-500/30 font-display font-bold text-purple-400 hover:bg-purple-500/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Randomize all attachments"
            >
              🎲 RANDOMIZE
            </motion.button>

            <motion.button
              onClick={() => setShowPresets(!showPresets)}
              className="px-6 py-3 glass-panel-hover border border-green-500/30 font-display font-bold text-green-400 hover:bg-green-500/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Apply preset loadout"
            >
              📋 PRESETS
            </motion.button>

            <motion.button
              onClick={handleSave}
              className="px-8 py-3 neon-border font-display font-bold gold-text hover:bg-glass-hover transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💾 SAVE LOADOUT
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="col-span-2">
            <div className="glass-panel p-4 neon-border sticky top-24">
              <h3 className="text-sm font-display font-bold text-gray-400 mb-4 tracking-wider">
                CATEGORIES
              </h3>
              <div className="space-y-2">
                {attachmentCategories.map((category) => {
                  const hasAttachment = currentLoadout.attachments[category.id];
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded transition-all relative ${
                        selectedCategory === category.id
                          ? 'glass-panel neon-border'
                          : 'hover:bg-glass'
                      }`}
                    >
                      {hasAttachment && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-armory-cyan rounded-full animate-pulse" />
                      )}
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-xs font-display text-gray-400">
                        {category.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center - Preview */}
          <div className="col-span-6">
            <div className="glass-panel p-8 neon-border h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-bold neon-text">
                  LOADOUT PREVIEW
                </h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500">ENERGY:</span>
                  <span className={`font-display font-bold ${
                    currentLoadout.energyUsage > currentLoadout.energyCapacity
                      ? 'text-red-500'
                      : 'text-armory-cyan'
                  }`}>
                    {currentLoadout.energyUsage} / {currentLoadout.energyCapacity}
                  </span>
                </div>
              </div>

              {/* Model Preview with Image */}
              <div className="relative aspect-square bg-gradient-to-br from-armory-dark to-armory-darker rounded-lg border-2 border-armory-blue mb-6 overflow-hidden">
                {currentLoadout.baseModel && (
                  <img 
                    src={currentLoadout.baseModel.image} 
                    alt={currentLoadout.baseModel.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-armory-darker via-transparent to-transparent" />
                
                {/* Scanlines */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-armory-blue opacity-30 z-10"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Model name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
                  <p className="text-lg font-display font-bold text-armory-cyan">
                    {currentLoadout.baseModel?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {currentLoadout.baseModel?.type}
                  </p>
                </div>
              </div>

              {/* Current Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(currentLoadout.stats).map(([stat, value]) => (
                  <div key={stat} className="glass-panel p-4">
                    <p className="text-xs text-gray-500 uppercase mb-2">{stat}</p>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-display font-bold neon-text">
                        {value}
                      </span>
                      <div className="w-20 h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
                        <motion.div
                          className="h-full bg-armory-cyan"
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Radar Chart Visualization */}
              <StatRadarChart stats={currentLoadout.stats} />
            </div>
          </div>

          {/* Right - Attachments */}
          <div className="col-span-4">
            <div className="glass-panel p-6 border border-armory-cyan/30">
              <h3 className="text-xl font-display font-bold text-armory-cyan mb-4">
                {attachmentCategories.find(c => c.id === selectedCategory)?.name || 'ATTACHMENTS'}
              </h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar"
                >
                  {categoryAttachments.map((attachment) => {
                    const isEquipped = currentLoadout.attachments[selectedCategory]?.id === attachment.id;
                    
                    return (
                      <motion.div
                        key={attachment.id}
                        variants={staggerItem}
                        onClick={() => handleAttachmentSelect(attachment)}
                        className={`p-4 rounded border-2 transition-all cursor-pointer relative ${
                          attachment.locked
                            ? 'border-gray-700 opacity-50 cursor-not-allowed'
                            : isEquipped
                            ? 'border-armory-cyan bg-armory-cyan/10'
                            : 'border-gray-700 hover:border-armory-blue hover:bg-glass'
                        }`}
                      >
                        {attachment.locked && (
                          <div className="absolute top-2 right-2 text-xl">🔒</div>
                        )}
                        
                        {isEquipped && (
                          <div className="absolute top-2 right-2 text-armory-cyan text-xl">✓</div>
                        )}

                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-display font-bold text-white pr-8">
                            {attachment.name}
                          </h4>
                          <span 
                            className="text-xs px-2 py-1 rounded font-bold uppercase"
                            style={{
                              backgroundColor: `${
                                attachment.rarity === 'legendary' ? '#fbbf24' :
                                attachment.rarity === 'epic' ? '#a855f7' :
                                attachment.rarity === 'rare' ? '#3b82f6' : '#9ca3af'
                              }20`,
                              color: attachment.rarity === 'legendary' ? '#fbbf24' :
                                     attachment.rarity === 'epic' ? '#a855f7' :
                                     attachment.rarity === 'rare' ? '#3b82f6' : '#9ca3af'
                            }}
                          >
                            T{attachment.tier}
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 mb-3">{attachment.description}</p>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-3">
                            {Object.entries(attachment.statModifiers).map(([stat, value]) => (
                              <span
                                key={stat}
                                className={`font-bold ${
                                  value > 0 ? 'text-green-400' : 'text-red-400'
                                }`}
                              >
                                {value > 0 ? '+' : ''}{value} {stat.slice(0, 3).toUpperCase()}
                              </span>
                            ))}
                          </div>
                          <span className="text-armory-cyan font-bold">
                            ⚡{attachment.energyCost}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Presets Modal */}
        <AnimatePresence>
          {showPresets && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setShowPresets(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-panel p-8 neon-border max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <h2 className="text-3xl font-display font-bold neon-text mb-6">
                  LOADOUT PRESETS
                </h2>
                
                <div className="space-y-4">
                  {getPresetLoadouts().map((preset) => (
                    <motion.div
                      key={preset.name}
                      onClick={() => handleApplyPreset(preset)}
                      className="p-6 glass-panel-hover border border-armory-blue/30 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <h3 className="text-xl font-display font-bold text-white mb-2">
                        {preset.name}
                      </h3>
                      <p className="text-gray-400 mb-3">{preset.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">FOCUS:</span>
                        <span className="text-sm font-display font-bold text-armory-cyan uppercase">
                          {preset.focus}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => setShowPresets(false)}
                  className="mt-6 w-full py-3 glass-panel-hover border border-gray-600 font-display text-gray-400 hover:text-white"
                >
                  CLOSE
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Customization Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <ColorThemePicker />
          <SkinSelector />
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="px-6 py-3 glass-panel-hover border border-gray-600 font-display text-gray-400 hover:text-white"
          >
            ← BACK
          </button>
          
          <div className="flex space-x-4">
            <button
              onClick={() => {
                if (confirm('Reset all attachments?')) {
                  attachmentCategories.forEach(cat => removeAttachment(cat.id));
                }
              }}
              className="px-6 py-3 glass-panel-hover border border-red-500/30 font-display text-red-400 hover:bg-red-500/10"
            >
              RESET ALL
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 212, 255, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 212, 255, 0.8);
        }
      `}</style>
    </div>
  );
};

export default CustomizationLab;

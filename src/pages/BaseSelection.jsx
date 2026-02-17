import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useLoadoutStore from '../store/loadoutStore';
import { baseModels } from '../data/loadoutData';
import { scaleIn, slideInFromBottom } from '../lib/motionVariants';

const BaseSelection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setBaseModel, setCurrentScreen, setLoadoutName } = useLoadoutStore();

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? baseModels.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === baseModels.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = () => {
    const selected = baseModels[selectedIndex];
    setBaseModel(selected);
    setLoadoutName(`${selected.name} Build`);
    setCurrentScreen('customization');
  };

  const currentModel = baseModels[selectedIndex];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 flex items-center">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold neon-text mb-2 tracking-wider">
            SELECT BASE MODEL
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your foundation • {baseModels.length} models available
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left - Stats */}
          <motion.div
            variants={slideInFromBottom}
            initial="hidden"
            animate="visible"
            className="glass-panel p-8 neon-border"
          >
            <h3 className="text-xl font-display font-bold neon-text mb-6">
              BASE STATISTICS
            </h3>
            
            {Object.entries(currentModel.baseStats).map(([stat, value]) => (
              <div key={stat} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-display uppercase text-gray-400">
                    {stat}
                  </span>
                  <span className="text-sm font-display font-bold neon-text">
                    {value}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-armory-blue to-armory-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Energy Capacity</span>
                <span className="text-sm font-bold text-armory-cyan">
                  {currentModel.energyCapacity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Tier Level</span>
                <span className="text-sm font-bold gold-text">
                  {currentModel.tier}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Center - Carousel */}
          <div className="relative">
            {/* Model Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="glass-panel p-12 neon-border relative overflow-hidden"
              >
                {/* Scanline */}
                <motion.div
                  className="absolute left-0 right-0 h-0.5 bg-armory-blue opacity-50"
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />

                {/* Rarity Badge */}
                <div 
                  className="absolute top-6 right-6 px-4 py-2 rounded font-display font-bold text-sm uppercase"
                  style={{
                    backgroundColor: `${currentModel.rarity === 'legendary' ? '#fbbf24' : 
                                      currentModel.rarity === 'epic' ? '#a855f7' : '#3b82f6'}20`,
                    color: currentModel.rarity === 'legendary' ? '#fbbf24' : 
                           currentModel.rarity === 'epic' ? '#a855f7' : '#3b82f6'
                  }}
                >
                  {currentModel.rarity}
                </div>

                <div className="text-center relative z-10">
                  {/* Model Image */}
                  <motion.div
                    className="w-64 h-64 mx-auto mb-6 border-2 border-armory-blue rounded-lg overflow-hidden bg-gradient-to-br from-armory-dark to-armory-darker"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(0,212,255,0.3)',
                        '0 0 40px rgba(0,212,255,0.6)',
                        '0 0 20px rgba(0,212,255,0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <img 
                      src={currentModel.image} 
                      alt={currentModel.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="flex items-center justify-center text-8xl h-full">🎯</div>';
                      }}
                    />
                  </motion.div>

                  <h2 className="text-4xl font-display font-bold neon-text mb-2">
                    {currentModel.name}
                  </h2>
                  <p className="text-lg text-armory-cyan mb-4">
                    {currentModel.type}
                  </p>
                  <p className="text-gray-400 italic">
                    "{currentModel.description}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 glass-panel-hover neon-border flex items-center justify-center text-2xl"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 glass-panel-hover neon-border flex items-center justify-center text-2xl"
            >
              →
            </button>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center space-x-3 mt-6">
              {baseModels.map((model, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-16 h-16 rounded border-2 transition-all overflow-hidden ${
                    index === selectedIndex
                      ? 'border-armory-blue shadow-[0_0_15px_rgba(0,212,255,0.5)]'
                      : 'border-gray-600 hover:border-armory-blue/50 opacity-60 hover:opacity-100'
                  }`}
                  title={model.name}
                >
                  <img 
                    src={model.image} 
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Info */}
          <motion.div
            variants={slideInFromBottom}
            initial="hidden"
            animate="visible"
            className="glass-panel p-8 border border-armory-cyan/30"
          >
            <h3 className="text-xl font-display font-bold text-armory-cyan mb-6">
              MODEL INTEL
            </h3>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-armory-dark/50 rounded border-l-2 border-armory-cyan">
                <p className="text-xs text-gray-500 mb-1">DESIGNATION</p>
                <p className="font-display font-bold">{currentModel.name}</p>
              </div>
              
              <div className="p-4 bg-armory-dark/50 rounded border-l-2 border-armory-cyan">
                <p className="text-xs text-gray-500 mb-1">CLASSIFICATION</p>
                <p className="font-display font-bold">{currentModel.type}</p>
              </div>
              
              <div className="p-4 bg-armory-dark/50 rounded border-l-2 border-armory-cyan">
                <p className="text-xs text-gray-500 mb-1">RARITY</p>
                <p className="font-display font-bold uppercase">{currentModel.rarity}</p>
              </div>
            </div>

            <motion.button
              onClick={handleSelect}
              className="w-full py-4 neon-border font-display font-bold text-lg neon-text hover:bg-glass-hover transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SELECT & CONTINUE →
            </motion.button>
          </motion.div>
        </div>

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

export default BaseSelection;

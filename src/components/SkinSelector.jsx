import { motion } from 'framer-motion';
import useLoadoutStore from '../store/loadoutStore';
import { skins } from '../data/loadoutData';
import { staggerContainer, staggerItem } from '../lib/motionVariants';

const SkinSelector = () => {
  const { currentLoadout, setSkin } = useLoadoutStore();

  return (
    <div className="glass-panel p-6 neon-border">
      <h3 className="text-xl font-display font-bold neon-text mb-4">
        WEAPON SKINS
      </h3>
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {skins.map((skin) => {
          const isSelected = currentLoadout.skin?.id === skin.id;
          
          return (
            <motion.div
              key={skin.id}
              variants={staggerItem}
              onClick={() => setSkin(skin)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-armory-gold bg-armory-gold/10'
                  : 'border-gray-700 hover:border-armory-blue hover:bg-glass'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer Effect */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}
              
              {isSelected && (
                <div className="absolute top-2 right-2 text-armory-gold text-xl z-10">✓</div>
              )}

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-display font-bold text-white">
                      {skin.name}
                    </h4>
                    <span 
                      className="text-xs px-2 py-1 rounded font-bold uppercase"
                      style={{
                        backgroundColor: `${
                          skin.rarity === 'legendary' ? '#fbbf24' :
                          skin.rarity === 'epic' ? '#a855f7' :
                          skin.rarity === 'rare' ? '#3b82f6' : '#9ca3af'
                        }20`,
                        color: skin.rarity === 'legendary' ? '#fbbf24' :
                               skin.rarity === 'epic' ? '#a855f7' :
                               skin.rarity === 'rare' ? '#3b82f6' : '#9ca3af'
                      }}
                    >
                      {skin.rarity}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-400">{skin.description}</p>
                </div>

                {/* Skin Preview Image */}
                <div className="w-20 h-20 rounded border-2 border-gray-700 ml-4 overflow-hidden flex-shrink-0">
                  <img 
                    src={skin.preview} 
                    alt={skin.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter: `hue-rotate(${
                        skin.rarity === 'legendary' ? '0deg' :
                        skin.rarity === 'epic' ? '270deg' :
                        skin.rarity === 'rare' ? '210deg' : '0deg'
                      })`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default SkinSelector;

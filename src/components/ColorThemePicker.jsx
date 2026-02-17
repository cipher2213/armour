import { motion } from 'framer-motion';
import useLoadoutStore from '../store/loadoutStore';
import { colorThemes } from '../data/loadoutData';

const ColorThemePicker = () => {
  const { currentLoadout, setColorTheme } = useLoadoutStore();

  return (
    <div className="glass-panel p-6 border border-armory-cyan/30">
      <h3 className="text-xl font-display font-bold text-armory-cyan mb-4">
        COLOR SCHEME
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {colorThemes.map((theme) => {
          const isSelected = currentLoadout.colorTheme?.id === theme.id;
          
          return (
            <motion.button
              key={theme.id}
              onClick={() => setColorTheme(theme)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-armory-cyan bg-armory-cyan/10'
                  : 'border-gray-700 hover:border-armory-blue hover:bg-glass'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 text-armory-cyan text-lg">✓</div>
              )}
              
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="w-8 h-8 rounded border-2"
                  style={{ 
                    backgroundColor: theme.primary,
                    borderColor: theme.glow,
                    boxShadow: `0 0 10px ${theme.glow}50`
                  }}
                />
                <div 
                  className="w-8 h-8 rounded border-2"
                  style={{ 
                    backgroundColor: theme.accent,
                    borderColor: theme.glow,
                    boxShadow: `0 0 10px ${theme.glow}50`
                  }}
                />
              </div>
              
              <h4 className="font-display font-bold text-white text-sm mb-1">
                {theme.name}
              </h4>
              
              <div 
                className="text-xs font-bold"
                style={{ color: theme.glow }}
              >
                {theme.glow}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorThemePicker;

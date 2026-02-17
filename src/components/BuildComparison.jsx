import { motion } from 'framer-motion';
import useLoadoutStore from '../store/loadoutStore';
import AnimatedNumber from './AnimatedNumber';

const BuildComparison = ({ loadout1, loadout2 }) => {
  if (!loadout1 || !loadout2) {
    return (
      <div className="glass-panel p-8 text-center border border-dashed border-gray-600">
        <div className="text-4xl mb-3">⚖️</div>
        <p className="text-gray-400">Select two loadouts to compare</p>
      </div>
    );
  }

  const StatComparison = ({ stat, value1, value2 }) => {
    const diff = value2 - value1;
    const percentage = value1 > 0 ? ((diff / value1) * 100).toFixed(1) : 0;

    return (
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-display uppercase text-gray-400">{stat}</span>
          {diff !== 0 && (
            <span className={`text-sm font-bold ${diff > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {diff > 0 ? '+' : ''}{diff} ({diff > 0 ? '+' : ''}{percentage}%)
            </span>
          )}
        </div>
        
        <div className="relative h-8 flex items-center space-x-2">
          {/* Loadout 1 Bar */}
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-armory-blue to-armory-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${value1}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
          
          <AnimatedNumber 
            value={value1} 
            className="text-xs font-bold text-armory-blue w-8 text-right"
          />
          
          <span className="text-gray-600">vs</span>
          
          <AnimatedNumber 
            value={value2} 
            className="text-xs font-bold text-armory-gold w-8"
          />
          
          {/* Loadout 2 Bar */}
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-armory-gold to-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${value2}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel p-8 neon-border">
      <h2 className="text-2xl font-display font-bold neon-text mb-6 text-center">
        BUILD COMPARISON
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Loadout 1 */}
        <div className="glass-panel p-4 border border-armory-blue/30">
          <h3 className="font-display font-bold text-armory-blue mb-2">{loadout1.name}</h3>
          <p className="text-sm text-gray-500">{loadout1.baseModel?.name}</p>
          <div className="mt-3 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Energy</span>
              <span className="text-armory-cyan">{loadout1.energyUsage}/{loadout1.energyCapacity}</span>
            </div>
          </div>
        </div>

        {/* Loadout 2 */}
        <div className="glass-panel p-4 border border-armory-gold/30">
          <h3 className="font-display font-bold text-armory-gold mb-2">{loadout2.name}</h3>
          <p className="text-sm text-gray-500">{loadout2.baseModel?.name}</p>
          <div className="mt-3 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Energy</span>
              <span className="text-yellow-400">{loadout2.energyUsage}/{loadout2.energyCapacity}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h4 className="text-lg font-display font-bold text-gray-300 mb-4">STAT ANALYSIS</h4>
        {Object.entries(loadout1.stats).map(([stat, value]) => (
          <StatComparison
            key={stat}
            stat={stat}
            value1={value}
            value2={loadout2.stats[stat]}
          />
        ))}
      </div>

      {/* Attachment Comparison */}
      <div className="border-t border-gray-700 pt-6 mt-6">
        <h4 className="text-lg font-display font-bold text-gray-300 mb-4">ATTACHMENTS</h4>
        <div className="space-y-2 text-sm">
          {Object.entries(loadout1.attachments).map(([category, attachment1]) => {
            const attachment2 = loadout2.attachments[category];
            return (
              <div key={category} className="flex justify-between py-2 border-b border-gray-800">
                <span className="text-gray-500 uppercase">{category}</span>
                <div className="flex space-x-4">
                  <span className="text-armory-blue">{attachment1?.name || 'None'}</span>
                  <span className="text-gray-600">vs</span>
                  <span className="text-armory-gold">{attachment2?.name || 'None'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuildComparison;

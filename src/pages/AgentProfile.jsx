import { motion } from 'framer-motion';
import useLoadoutStore from '../store/loadoutStore';
import { staggerContainer, staggerItem } from '../lib/motionVariants';
import { calculateXPForLevel } from '../lib/utils';

const AgentProfile = () => {
  const { agentProfile, savedLoadouts, setCurrentScreen } = useLoadoutStore();

  const xpForNextLevel = calculateXPForLevel(agentProfile.level + 1);
  const xpProgress = agentProfile.xp % 1000;
  const xpPercentage = (xpProgress / 1000) * 100;

  const achievements = [
    { id: 'first-build', name: 'First Build', description: 'Create your first loadout', completed: savedLoadouts.length >= 1, icon: '🎯' },
    { id: 'five-builds', name: 'Arsenal Builder', description: 'Create 5 loadouts', completed: savedLoadouts.length >= 5, icon: '🏗️' },
    { id: 'ten-builds', name: 'Master Armorer', description: 'Create 10 loadouts', completed: savedLoadouts.length >= 10, icon: '🏆' },
    { id: 'level-five', name: 'Elite Agent', description: 'Reach level 5', completed: agentProfile.level >= 5, icon: '⭐' },
    { id: 'level-ten', name: 'Legendary', description: 'Reach level 10', completed: agentProfile.level >= 10, icon: '👑' },
  ];

  const completedAchievements = achievements.filter(a => a.completed).length;

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
            AGENT PROFILE
          </h1>
          <p className="text-gray-400 text-lg">
            Classified Personnel Record
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Agent Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 neon-border sticky top-24"
            >
              {/* Agent Icon */}
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-armory-gold flex items-center justify-center text-6xl bg-gradient-to-br from-armory-dark to-armory-darker"
                style={{
                  boxShadow: '0 0 30px rgba(255,215,0,0.3)'
                }}
              >
                👤
              </div>

              <h2 className="text-2xl font-display font-bold gold-text text-center mb-2">
                {agentProfile.name}
              </h2>
              
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500">CLEARANCE LEVEL</p>
                <p className="text-4xl font-display font-bold neon-text">
                  {agentProfile.level}
                </p>
              </div>

              {/* XP Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">EXPERIENCE</span>
                  <span className="text-armory-blue font-bold">
                    {xpProgress} / 1000 XP
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-armory-blue to-armory-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercentage}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3 pt-6 border-t border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total XP</span>
                  <span className="font-display font-bold neon-text">{agentProfile.xp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Builds</span>
                  <span className="font-display font-bold neon-text">{agentProfile.totalBuilds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Achievements</span>
                  <span className="font-display font-bold gold-text">
                    {completedAchievements} / {achievements.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Achievements & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 border border-armory-gold/30"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold gold-text">
                  ACHIEVEMENTS
                </h3>
                <span className="text-sm text-gray-500">
                  {completedAchievements} / {achievements.length} UNLOCKED
                </span>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    variants={staggerItem}
                    className={`p-4 rounded border-2 transition-all ${
                      achievement.completed
                        ? 'border-armory-gold bg-armory-gold/10'
                        : 'border-gray-700 opacity-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-display font-bold text-white mb-1">
                              {achievement.name}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.completed && (
                            <span className="text-armory-gold text-2xl">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 neon-border"
            >
              <h3 className="text-2xl font-display font-bold neon-text mb-6">
                RECENT LOADOUTS
              </h3>

              {savedLoadouts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-gray-500">No loadouts created yet</p>
                  <button
                    onClick={() => setCurrentScreen('selection')}
                    className="mt-4 px-6 py-3 neon-border font-display font-bold neon-text"
                  >
                    CREATE FIRST LOADOUT
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedLoadouts.slice(-5).reverse().map((loadout) => (
                    <div
                      key={loadout.id}
                      className="p-4 glass-panel border border-armory-blue/20 hover:border-armory-blue/60 transition-all cursor-pointer"
                      onClick={() => {
                        useLoadoutStore.getState().loadLoadout(loadout.id);
                        setCurrentScreen('customization');
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-bold text-white">
                            {loadout.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {loadout.baseModel?.name || 'No Base Model'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">ENERGY</p>
                          <p className="text-sm font-bold text-armory-cyan">
                            {loadout.energyUsage} / {loadout.energyCapacity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
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

export default AgentProfile;

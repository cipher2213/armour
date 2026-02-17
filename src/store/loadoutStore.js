import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { baseModels } from '../data/loadoutData';

// Calculate total stats including attachments
const calculateStats = (baseStats, attachments) => {
  const stats = { ...baseStats };
  
  Object.values(attachments).forEach(attachment => {
    if (attachment && attachment.statModifiers) {
      Object.entries(attachment.statModifiers).forEach(([stat, modifier]) => {
        stats[stat] = Math.max(0, Math.min(100, (stats[stat] || 0) + modifier));
      });
    }
  });
  
  return stats;
};

// Calculate total energy usage
const calculateEnergyUsage = (attachments) => {
  let total = 0;
  Object.values(attachments).forEach(attachment => {
    if (attachment && attachment.energyCost) {
      total += attachment.energyCost;
    }
  });
  return total;
};

const useLoadoutStore = create(
  persist(
    (set, get) => ({
      // Current loadout being edited
      currentLoadout: {
        id: null,
        name: 'Untitled Loadout',
        baseModel: null,
        attachments: {
          optic: null,
          barrel: null,
          magazine: null,
          grip: null,
          stock: null,
          muzzle: null,
          laser: null,
          underbarrel: null,
        },
        skin: null,
        colorTheme: null,
        stats: {
          stealth: 0,
          mobility: 0,
          power: 0,
          tech: 0,
        },
        energyUsage: 0,
        energyCapacity: 100,
        rarityTier: 'common',
        createdAt: null,
        updatedAt: null,
      },

      // Saved loadouts collection
      savedLoadouts: [],

      // UI State
      darkMode: true,
      currentScreen: 'dashboard', // dashboard, selection, customization, comparison
      selectedLoadoutForComparison: null,

      // Agent Profile
      agentProfile: {
        name: 'AGENT-001',
        level: 1,
        xp: 0,
        totalBuilds: 0,
        achievements: [],
      },

      // Actions
      setBaseModel: (model) => set((state) => {
        const baseModel = typeof model === 'string' 
          ? baseModels.find(m => m.id === model) 
          : model;
        
        const stats = calculateStats(baseModel.baseStats, state.currentLoadout.attachments);
        
        return {
          currentLoadout: {
            ...state.currentLoadout,
            baseModel,
            stats,
            energyCapacity: baseModel.energyCapacity,
            rarityTier: baseModel.rarity,
            updatedAt: new Date().toISOString(),
          },
        };
      }),

      setAttachment: (category, attachment) => set((state) => {
        const newAttachments = {
          ...state.currentLoadout.attachments,
          [category]: attachment,
        };
        
        const stats = state.currentLoadout.baseModel 
          ? calculateStats(state.currentLoadout.baseModel.baseStats, newAttachments)
          : state.currentLoadout.stats;
        
        const energyUsage = calculateEnergyUsage(newAttachments);
        
        return {
          currentLoadout: {
            ...state.currentLoadout,
            attachments: newAttachments,
            stats,
            energyUsage,
            updatedAt: new Date().toISOString(),
          },
        };
      }),

      removeAttachment: (category) => set((state) => {
        const newAttachments = {
          ...state.currentLoadout.attachments,
          [category]: null,
        };
        
        const stats = state.currentLoadout.baseModel 
          ? calculateStats(state.currentLoadout.baseModel.baseStats, newAttachments)
          : state.currentLoadout.stats;
        
        const energyUsage = calculateEnergyUsage(newAttachments);
        
        return {
          currentLoadout: {
            ...state.currentLoadout,
            attachments: newAttachments,
            stats,
            energyUsage,
            updatedAt: new Date().toISOString(),
          },
        };
      }),

      setLoadoutName: (name) => set((state) => ({
        currentLoadout: {
          ...state.currentLoadout,
          name,
          updatedAt: new Date().toISOString(),
        },
      })),

      setSkin: (skin) => set((state) => ({
        currentLoadout: {
          ...state.currentLoadout,
          skin,
          updatedAt: new Date().toISOString(),
        },
      })),

      setColorTheme: (theme) => set((state) => ({
        currentLoadout: {
          ...state.currentLoadout,
          colorTheme: theme,
          updatedAt: new Date().toISOString(),
        },
      })),

      saveLoadout: () => set((state) => {
        const loadout = {
          ...state.currentLoadout,
          id: state.currentLoadout.id || `loadout-${Date.now()}`,
          createdAt: state.currentLoadout.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        const existingIndex = state.savedLoadouts.findIndex(l => l.id === loadout.id);
        let newSavedLoadouts;

        if (existingIndex >= 0) {
          newSavedLoadouts = [...state.savedLoadouts];
          newSavedLoadouts[existingIndex] = loadout;
        } else {
          newSavedLoadouts = [...state.savedLoadouts, loadout];
        }

        return {
          currentLoadout: loadout,
          savedLoadouts: newSavedLoadouts,
          agentProfile: {
            ...state.agentProfile,
            totalBuilds: newSavedLoadouts.length,
          },
        };
      }),

      loadLoadout: (loadoutId) => set((state) => {
        const loadout = state.savedLoadouts.find(l => l.id === loadoutId);
        if (loadout) {
          return { currentLoadout: { ...loadout } };
        }
        return state;
      }),

      deleteLoadout: (loadoutId) => set((state) => ({
        savedLoadouts: state.savedLoadouts.filter(l => l.id !== loadoutId),
        agentProfile: {
          ...state.agentProfile,
          totalBuilds: Math.max(0, state.agentProfile.totalBuilds - 1),
        },
      })),

      newLoadout: () => set((state) => ({
        currentLoadout: {
          id: null,
          name: 'Untitled Loadout',
          baseModel: null,
          attachments: {
            optic: null,
            barrel: null,
            magazine: null,
            grip: null,
            stock: null,
            muzzle: null,
            laser: null,
            underbarrel: null,
          },
          skin: null,
          colorTheme: null,
          stats: {
            stealth: 0,
            mobility: 0,
            power: 0,
            tech: 0,
          },
          energyUsage: 0,
          energyCapacity: 100,
          rarityTier: 'common',
          createdAt: null,
          updatedAt: null,
        },
      })),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      setCurrentScreen: (screen) => set({ currentScreen: screen }),

      setComparisonLoadout: (loadoutId) => set({ selectedLoadoutForComparison: loadoutId }),

      addXP: (amount) => set((state) => {
        const newXP = state.agentProfile.xp + amount;
        const newLevel = Math.floor(newXP / 1000) + 1;
        
        return {
          agentProfile: {
            ...state.agentProfile,
            xp: newXP,
            level: newLevel,
          },
        };
      }),
    }),
    {
      name: 'agent-armory-storage',
      partialize: (state) => ({
        savedLoadouts: state.savedLoadouts,
        agentProfile: state.agentProfile,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useLoadoutStore;

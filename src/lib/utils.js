// Utility functions for AGENT ARMORY

export const formatNumber = (num) => {
  return num.toLocaleString('en-US');
};

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

export const generateBuildName = (baseModel, attachments) => {
  if (!baseModel) return 'Untitled Build';
  
  const adjectives = ['Shadow', 'Ghost', 'Viper', 'Phoenix', 'Crimson', 'Apex', 'Elite', 'Prime'];
  const suffixes = ['Protocol', 'Operative', 'Configuration', 'Loadout', 'Arsenal', 'System'];
  
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${randomAdj} ${baseModel.name} ${randomSuffix}`;
};

export const calculateBuildCompletion = (loadout) => {
  let total = 0;
  let filled = 0;
  
  // Base model
  total++;
  if (loadout.baseModel) filled++;
  
  // Attachments
  const attachmentSlots = Object.values(loadout.attachments);
  total += attachmentSlots.length;
  filled += attachmentSlots.filter(a => a !== null).length;
  
  // Skin
  total++;
  if (loadout.skin) filled++;
  
  // Color theme
  total++;
  if (loadout.colorTheme) filled++;
  
  return Math.round((filled / total) * 100);
};

export const getRarityColor = (rarity) => {
  const colors = {
    common: '#9ca3af',
    rare: '#3b82f6',
    epic: '#a855f7',
    legendary: '#fbbf24',
  };
  return colors[rarity] || colors.common;
};

export const getStatColor = (value) => {
  if (value >= 80) return '#00ff00';
  if (value >= 60) return '#00d4ff';
  if (value >= 40) return '#ffd700';
  if (value >= 20) return '#ff9500';
  return '#ff0044';
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const calculateXPForLevel = (level) => {
  return level * 1000;
};

export const downloadAsJSON = (data, filename) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const randomizeLoadout = (baseModel, allAttachments) => {
  const randomAttachments = {};
  
  Object.keys(allAttachments).forEach(category => {
    const categoryAttachments = allAttachments[category].filter(a => !a.locked);
    if (categoryAttachments.length > 0) {
      // 70% chance to add an attachment
      if (Math.random() > 0.3) {
        const randomIndex = Math.floor(Math.random() * categoryAttachments.length);
        randomAttachments[category] = categoryAttachments[randomIndex];
      } else {
        randomAttachments[category] = null;
      }
    } else {
      randomAttachments[category] = null;
    }
  });
  
  return randomAttachments;
};

export const getPresetLoadouts = () => {
  return [
    {
      name: 'Stealth Operative',
      description: 'Maximum stealth and mobility',
      focus: 'stealth',
      preferredAttachments: ['silencer-1', 'reflex-1', 'folding-1', 'angled-1'],
    },
    {
      name: 'Heavy Assault',
      description: 'Maximum power and damage',
      focus: 'power',
      preferredAttachments: ['long-1', 'extended-1', 'heavy-1', 'comp-1'],
    },
    {
      name: 'Tech Specialist',
      description: 'High-tech gadgets and systems',
      focus: 'tech',
      preferredAttachments: ['holo-1', 'ir-1', 'dual-1', 'fast-1'],
    },
    {
      name: 'Speed Runner',
      description: 'Lightning-fast mobility',
      focus: 'mobility',
      preferredAttachments: ['reflex-1', 'short-1', 'folding-1', 'angled-1'],
    },
    {
      name: 'Balanced Warrior',
      description: 'Well-rounded tactical loadout',
      focus: 'balanced',
      preferredAttachments: ['thermal-1', 'long-1', 'fast-1', 'tactical-1'],
    },
  ];
};

export const applyPreset = (preset, baseModel, allAttachments) => {
  const presetAttachments = {};
  
  Object.keys(allAttachments).forEach(category => {
    const categoryAttachments = allAttachments[category];
    
    // Try to find preferred attachment
    const preferred = categoryAttachments.find(a => 
      preset.preferredAttachments.includes(a.id) && !a.locked
    );
    
    if (preferred) {
      presetAttachments[category] = preferred;
    } else {
      // Fallback to first unlocked attachment
      const available = categoryAttachments.filter(a => !a.locked);
      if (available.length > 0 && Math.random() > 0.5) {
        presetAttachments[category] = available[0];
      } else {
        presetAttachments[category] = null;
      }
    }
  });
  
  return presetAttachments;
};

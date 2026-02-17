import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const StatRadarChart = ({ stats, className = '' }) => {
  const data = Object.entries(stats).map(([key, value]) => ({
    stat: key.toUpperCase(),
    value: value,
    fullMark: 100,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`glass-panel p-6 neon-border ${className}`}
    >
      <h3 className="text-lg font-display font-bold neon-text mb-4 text-center">
        PERFORMANCE PROFILE
      </h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={data}>
          <PolarGrid 
            stroke="rgba(0, 212, 255, 0.2)" 
            strokeWidth={1}
          />
          <PolarAngleAxis 
            dataKey="stat" 
            tick={{ fill: '#00d4ff', fontSize: 12, fontFamily: 'Orbitron' }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#6b7280', fontSize: 10 }}
          />
          <Radar
            name="Stats"
            dataKey="value"
            stroke="#00d4ff"
            fill="#00d4ff"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default StatRadarChart;

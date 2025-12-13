import React from 'react';

const EnergyLevelDiagram: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-200 mb-4"> 激发能级图: <sup>88</sup>Sr</h3>
      <svg width="300" height="400" viewBox="0 0 300 400" className="w-full max-w-sm">
        {/* Background Grid */}
        <defs>
          <linearGradient id="laserGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ground State 1S0 */}
        <line x1="50" y1="350" x2="250" y2="350" stroke="#94a3b8" strokeWidth="3" />
        <text x="260" y="355" fill="#94a3b8" className="text-sm">5s² ¹S₀</text>

        {/* Clock State 3P0 */}
        <line x1="50" y1="250" x2="250" y2="250" stroke="#f59e0b" strokeWidth="3" />
        <text x="260" y="255" fill="#f59e0b" className="text-sm">5s5p ³P₀</text>
        <text x="100" y="300" fill="#f59e0b" fontSize="10" textAnchor="middle">钟跃迁 (698nm)</text>
        <path d="M 150 350 L 150 250" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrow)" />

        {/* Rydberg State */}
        <line x1="50" y1="50" x2="250" y2="50" stroke="#a855f7" strokeWidth="3" />
        <text x="260" y="55" fill="#a855f7" className="text-sm">5sns ³S₁ / ³D₁</text>
        
        {/* UV Laser Beam */}
        <path d="M 150 250 L 150 50" stroke="url(#laserGradient)" strokeWidth="4" />
        <text x="160" y="150" fill="#d8b4fe" fontWeight="bold">~317 nm</text>
        <text x="160" y="170" fill="#d8b4fe" fontSize="10">紫外激发</text>

        {/* Annotations */}
        <text x="20" y="30" fill="#64748b" fontSize="10">能量</text>
        <line x1="10" y1="380" x2="10" y2="20" stroke="#475569" strokeWidth="1" markerEnd="url(#arrow)" />
        
        {/* Arrow Marker */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
          </marker>
        </defs>
      </svg>
      <div className="mt-4 text-xs text-slate-400 text-center max-w-xs">
        实验首先制备长寿命的 <sup>3</sup>P<sub>0</sub> 钟态原子，随后通过单光子紫外跃迁激发到里德堡流形。
      </div>
    </div>
  );
};

export default EnergyLevelDiagram;
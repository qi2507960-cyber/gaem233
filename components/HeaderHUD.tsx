import React from 'react';
import { Activity } from 'lucide-react';
import { INITIAL_HP } from '../constants';

interface HeaderHUDProps {
  hp: number;
  san: number;
}

const HeaderHUD: React.FC<HeaderHUDProps> = ({ hp, san }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800 p-2 flex justify-between items-center pointer-events-none font-mono">
      {/* HP Section - Digital Blocks */}
      <div className="flex items-center gap-2 pl-2">
        <span className="text-[10px] text-red-600 tracking-widest">生命体征:</span>
        <div className="flex gap-1">
          {[...Array(INITIAL_HP)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-4 border border-red-900 ${
                i < hp 
                  ? 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]' 
                  : 'bg-transparent opacity-30'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* SAN Section - Digital Bar */}
      <div className="flex items-center gap-2 pr-2">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-game-blue text-[10px] tracking-widest mb-0.5">
             <Activity size={10} className={san < 30 ? 'animate-pulse text-red-500' : ''} />
             <span className={san < 30 ? 'text-red-500' : ''}>理智水平</span>
          </div>
          <div className="w-24 h-2 bg-zinc-900 border border-zinc-700 relative overflow-hidden">
             {/* Fill */}
            <div 
              className={`h-full transition-all duration-500 relative ${
                san < 30 ? 'bg-red-600 animate-pulse' : 'bg-game-blue'
              }`}
              style={{ width: `${san}%` }}
            >
               {/* Scanline Effect inside bar */}
               <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] animate-[scan_1s_linear_infinite]"></div>
            </div>
          </div>
        </div>
        <span className={`text-xs font-bold ${san < 30 ? 'text-red-500 text-glow-red' : 'text-game-blue text-glow-blue'}`}>
          {san}%
        </span>
      </div>
    </div>
  );
};

export default HeaderHUD;
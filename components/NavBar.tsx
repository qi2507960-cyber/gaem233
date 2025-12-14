import React from 'react';
import { ViewState } from '../types';
import { Skull, Gamepad2, User, Radio, ArrowLeft, Power } from 'lucide-react';

interface NavBarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentView, onNavigate }) => {
  const navItems: { id: ViewState; icon: React.ReactNode; label: string }[] = [
    { id: 'mechanics', icon: <Gamepad2 size={16} />, label: '系统设置' },
    { id: 'characters', icon: <User size={16} />, label: '角色档案' },
    { id: 'dungeons', icon: <Skull size={16} />, label: '记忆回溯' },
    { id: 'gacha', icon: <Radio size={16} />, label: '数据唤醒' },
  ];

  if (currentView === 'home') return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-black border-t border-zinc-800 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
      {/* Status Bar Deco Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
      
      <div className="flex justify-between items-center px-4 py-2 font-mono">
        {/* Back / Home Button */}
        <button
          onClick={() => onNavigate(currentView === 'hub' ? 'home' : 'hub')}
          className="flex items-center gap-1 text-red-600 hover:text-red-400 transition-colors uppercase text-[10px] tracking-widest group"
        >
          {currentView === 'hub' ? <Power size={14} className="group-hover:text-glow-red" /> : <ArrowLeft size={14} />}
          <span className="hidden md:inline group-hover:text-glow-red">{currentView === 'hub' ? '登出系统' : '返回上一级'}</span>
        </button>

        {/* Navigation Items */}
        <div className="flex gap-1 md:gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col md:flex-row items-center gap-1 px-3 py-1 rounded transition-all duration-300 border ${
                currentView === item.id 
                  ? 'border-game-blue bg-game-blue/10 text-game-blue shadow-[0_0_10px_rgba(0,243,255,0.2)]' 
                  : 'border-transparent text-zinc-600 hover:text-zinc-400'
              }`}
            >
              {item.icon}
              <span className="text-[9px] md:text-[10px] tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
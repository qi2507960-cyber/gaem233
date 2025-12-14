
import React, { useState, useEffect } from 'react';
import { Database, User, Gamepad2, Radio, Terminal, AlertTriangle, Lock, FileText, Smartphone, Ghost, Brain, ChevronLeft, ChevronRight, Paperclip } from 'lucide-react';
import { GameState, ViewState, Character, Dungeon } from './types';
import { INITIAL_HP, INITIAL_SAN, CHARACTERS as DEFAULT_CHARS, DUNGEONS as DEFAULT_DUNGEONS } from './constants';
import HeaderHUD from './components/HeaderHUD';
import NavBar from './components/NavBar';
import GlitchText from './components/GlitchText';
import { generateSystemHint } from './services/geminiService';
import { api } from './services/api';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    hp: INITIAL_HP,
    san: INITIAL_SAN,
    view: 'home',
    inventory: []
  });

  const [hint, setHint] = useState<string>("等待指令...");
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);
  
  // Data fetched from Java Backend
  const [characterList, setCharacterList] = useState<Character[]>(DEFAULT_CHARS);
  const [dungeonList, setDungeonList] = useState<Dungeon[]>(DEFAULT_DUNGEONS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const chars = await api.getCharacters();
      const dungs = await api.getDungeons();
      setCharacterList(chars);
      setDungeonList(dungs);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (gameState.view === 'hub') {
        generateSystemHint("系统大厅", gameState.san)
          .then(setHint)
          .catch(() => setHint("无法连接至系统核心..."));
    }
  }, [gameState.view, gameState.san]);

  const handleNavigate = (view: ViewState) => {
    setGameState(prev => ({ ...prev, view }));
  };

  const renderHub = () => (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-zinc-900 opacity-50 z-[-1]" />
        
        {/* Retro Grid Floor */}
        <div className="retro-grid"></div>

        {/* TOP LEFT: Dungeons (Data Node) */}
        <button 
          onClick={() => setGameState(prev => ({...prev, view: 'dungeons'}))}
          className="absolute top-[20%] left-[10%] w-32 md:w-40 aspect-square border border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 group flex flex-col items-center justify-center text-cyan-400 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.2)]"
        >
           <Database size={32} className="mb-2 group-hover:animate-bounce" />
           <span className="text-lg font-bold group-hover:text-white transition-colors">记忆回溯</span>
           <span className="text-[10px] opacity-60">MEMORY_DUMP</span>
           <div className="absolute top-0 right-0 p-1 text-[8px] bg-cyan-500 text-black font-bold">01</div>
        </button>

        {/* TOP RIGHT: Characters */}
        <button 
          onClick={() => setGameState(prev => ({...prev, view: 'characters'}))}
          className="absolute top-[20%] right-[10%] w-32 md:w-40 aspect-square border border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 group flex flex-col items-center justify-center text-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-lg backdrop-blur-sm"
        >
           <User size={32} className="mb-2 group-hover:animate-pulse" />
           <span className="text-lg font-bold group-hover:text-white transition-colors">角色档案</span>
           <span className="text-[10px] opacity-60">PERSONA_DB</span>
           <div className="absolute top-0 left-0 p-1 text-[8px] bg-purple-500 text-black font-bold">02</div>
        </button>

        {/* BOTTOM LEFT: Mechanics */}
        <button 
          onClick={() => setGameState(prev => ({...prev, view: 'mechanics'}))}
          className="absolute bottom-[25%] left-[10%] w-32 md:w-40 aspect-square border border-green-500/50 hover:bg-green-500/10 transition-all duration-300 group flex flex-col items-center justify-center text-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] rounded-lg backdrop-blur-sm"
        >
           <Gamepad2 size={32} className="mb-2 group-hover:rotate-12 transition-transform" />
           <span className="text-lg font-bold group-hover:text-white transition-colors">系统设置</span>
           <span className="text-[10px] opacity-60">CONFIG.SYS</span>
           <div className="absolute bottom-0 right-0 p-1 text-[8px] bg-green-500 text-black font-bold">03</div>
        </button>

        {/* BOTTOM RIGHT: Gacha */}
        <button 
          onClick={() => setGameState(prev => ({...prev, view: 'gacha'}))}
          className="absolute bottom-[25%] right-[10%] w-32 md:w-40 aspect-square border border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300 group flex flex-col items-center justify-center text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] rounded-lg backdrop-blur-sm"
        >
           <Radio size={32} className="mb-2 group-hover:animate-ping" />
           <span className="text-lg font-bold group-hover:text-white transition-colors">数据唤醒</span>
           <span className="text-[10px] opacity-60">RECOVER</span>
           <div className="absolute bottom-0 left-0 p-1 text-[8px] bg-yellow-500 text-black font-bold">04</div>
        </button>
        
        {/* Center Terminal */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
            <Terminal size={48} className="text-white/50 mb-4" />
            <div className="font-mono text-xs text-center text-zinc-400">
                <span className="text-green-500">SYSTEM ONLINE</span><br/>
                SANITY: {gameState.san}%<br/>
                HP: {gameState.hp}/{INITIAL_HP}
            </div>
            {isLoading && (
              <div className="mt-2 text-[10px] text-yellow-500 animate-pulse">
                正在同步服务器数据...
              </div>
            )}
            <div className="mt-4 p-2 border border-zinc-700 bg-black/80 text-green-500 font-mono text-xs max-w-[200px] text-center animate-pulse">
                {">"} {hint}
            </div>
        </div>

        {/* Decor Lines */}
        <svg className="absolute inset-0 pointer-events-none opacity-30" width="100%" height="100%">
            <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="#00f3ff" strokeWidth="1" />
            <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
            <line x1="20%" y1="75%" x2="50%" y2="50%" stroke="#4ade80" strokeWidth="1" />
            <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="#eab308" strokeWidth="1" />
        </svg>
    </div>
  );

  const renderDungeons = () => (
    <div className="w-full h-full overflow-y-auto pt-16 pb-20 px-4">
      <div className="max-w-md mx-auto space-y-6">
        {dungeonList.map((dungeon) => (
          <div key={dungeon.id} className="relative w-full h-48 border border-white/40 bg-black/50 overflow-hidden group shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
             {/* Background Image */}
             <img 
               src={dungeon.image} 
               alt={dungeon.name} 
               className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
             />
             
             {/* Persistent Scanlines Overlay */}
             <div className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_3px] opacity-40"></div>
             
             {/* Overlay Gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0"></div>

             {/* Content */}
             <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                   <div className="bg-red-600/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 font-mono border border-red-500">
                      危险等级 {'★'.repeat(dungeon.riskLevel)}
                   </div>
                   <div className="font-mono text-[10px] text-cyan-400 border border-cyan-400 bg-black/40 px-1 backdrop-blur-sm">
                      区块 {dungeon.id.toString().padStart(2, '0')}
                   </div>
                </div>

                <div>
                   <h3 className="text-xl font-serif font-bold text-white mb-1 shadow-black drop-shadow-md tracking-wider">{dungeon.name}</h3>
                   <div className="flex items-center gap-2 text-[10px] text-zinc-300 font-mono mb-2 bg-black/30 w-fit px-1">
                      <span className="text-red-500">{'>>'}</span> {dungeon.location}
                   </div>
                   <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed border-l-2 border-red-600 pl-2 bg-black/30 p-1 shadow-sm">
                      {dungeon.mission}
                   </p>
                </div>
                
                {/* System Scanline on Hover */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 opacity-0 group-hover:opacity-100 animate-scan pointer-events-none"></div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCharacters = () => {
    // Safety check if list is empty
    if (characterList.length === 0) return <div>NO DATA</div>;
    const char = characterList[selectedCharIndex];
    
    return (
      <div className="w-full h-full overflow-hidden pt-16 pb-20 px-4 flex flex-col items-center justify-center">
        {/* Navigation Controls */}
        <div className="absolute top-1/2 w-full max-w-lg flex justify-between px-2 z-20 pointer-events-none">
           <button 
             onClick={() => setSelectedCharIndex(prev => prev === 0 ? characterList.length - 1 : prev - 1)}
             className="pointer-events-auto p-2 bg-black/50 border border-zinc-600 rounded-full hover:bg-zinc-800 transition-colors"
           >
             <ChevronLeft size={24} className="text-zinc-300" />
           </button>
           <button 
             onClick={() => setSelectedCharIndex(prev => prev === characterList.length - 1 ? 0 : prev + 1)}
             className="pointer-events-auto p-2 bg-black/50 border border-zinc-600 rounded-full hover:bg-zinc-800 transition-colors"
           >
             <ChevronRight size={24} className="text-zinc-300" />
           </button>
        </div>

        {/* Book Container */}
        <div className="relative w-full max-w-[600px] aspect-[1.4/1] bg-zinc-800 rounded-lg p-3 shadow-2xl flex items-center justify-center">
           {/* Book Texture Overlay */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-50 rounded-lg pointer-events-none"></div>

           {/* Tabs Top Right */}
           <div className="absolute -top-3 right-8 flex gap-1 z-0">
              <div className="px-3 py-1 bg-[#d4d4d8] rounded-t text-[8px] text-zinc-800 font-mono border border-b-0 border-zinc-400">档案 0{selectedCharIndex + 1}</div>
              <div className="px-3 py-1 bg-zinc-600 rounded-t text-[8px] text-zinc-300 font-mono border border-b-0 border-zinc-500">机密</div>
           </div>

           {/* Inner Pages Container */}
           <div className="relative w-full h-full bg-[#e4e4e7] rounded shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] flex overflow-hidden z-10">
              {/* Center Spine Shadow */}
              <div className="absolute top-0 bottom-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-20"></div>

              {/* Left Page (Text) */}
              <div className="w-1/2 h-full p-4 md:p-6 border-r border-zinc-300 relative">
                 {/* Paper Texture */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>
                 
                 <div className="relative z-10 h-full flex flex-col font-serif text-zinc-800">
                    <div className="mb-4 border-b border-zinc-400 pb-2">
                       <h3 className="text-sm font-bold tracking-widest text-zinc-900">【系统记录】</h3>
                       <p className="text-[10px] font-mono text-zinc-500 mt-1">ID: {char.id ? char.id.toUpperCase() : 'UNKNOWN'}</p>
                    </div>

                    <div className="flex-1 space-y-4">
                       <div>
                          <h4 className="text-xs font-bold mb-1">【身份识别】</h4>
                          <p className="text-[10px] leading-relaxed opacity-80">
                             {char.role}。在{char.id === 'uncle' ? '系统核心区域' : '历史副本'}中被发现。
                             系统判定稀有度为 <span className="font-bold">{char.rarity}</span>。
                          </p>
                       </div>
                       
                       <div>
                          <h4 className="text-xs font-bold mb-1">【观测记录】</h4>
                          <p className="text-[10px] leading-relaxed opacity-80">
                             该个体表现出异常的数据波动。建议玩家谨慎接触，避免触发“恐惧共鸣”。
                             目前的羁绊值为 {char.bond}%。
                          </p>
                       </div>
                    </div>
                    
                    <div className="mt-auto pt-2 border-t border-zinc-300">
                       <div className="text-[8px] font-mono text-zinc-400 text-right">PAGE {selectedCharIndex * 2 + 1}</div>
                    </div>
                 </div>
              </div>

              {/* Right Page (Photo) */}
              <div className="w-1/2 h-full p-4 md:p-6 relative flex flex-col items-center justify-center">
                 {/* Paper Texture */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>

                 {/* Paper Clip */}
                 <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-30 text-zinc-400 drop-shadow-md">
                     <Paperclip size={48} className="rotate-90" />
                 </div>

                 {/* Photo Frame */}
                 <div className="relative p-2 bg-white shadow-lg rotate-1 transform transition-transform duration-500 hover:rotate-0 mb-4">
                    <div className="border border-zinc-200 p-0.5">
                       <div className="w-24 h-24 md:w-32 md:h-32 bg-zinc-200 overflow-hidden relative">
                          <img 
                            src={char.image} 
                            alt={char.name} 
                            className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                          />
                          {/* Photo Texture/Scratch */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none"></div>
                       </div>
                    </div>
                 </div>

                 {/* Name Tag */}
                 <div className="bg-zinc-800 text-[#e4e4e7] px-3 py-1 text-xs font-serif tracking-widest shadow-md">
                    {char.name}
                 </div>

                 <div className="absolute bottom-4 right-6 text-[8px] font-mono text-zinc-400">PAGE {selectedCharIndex * 2 + 2}</div>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderMechanics = () => (
    <div className="w-full h-full overflow-y-auto pt-16 pb-20 px-4">
      <div className="max-w-md mx-auto space-y-6 font-mono text-sm">
        <div className="border border-red-900/50 bg-black/80 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20">
                <AlertTriangle size={64} className="text-red-600" />
            </div>
            <h2 className="text-red-500 text-lg font-bold mb-4 tracking-widest border-b border-red-900/30 pb-2">
                警告：系统机制
            </h2>

            <div className="space-y-6">
                <div className="relative pl-4 border-l border-zinc-700">
                    <h3 className="text-game-blue font-bold mb-1 flex items-center gap-2">
                        <Smartphone size={14} /> 
                        生命体征 (HP)
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                        现实受伤、坠落或高能耗行为将扣除HP。<br/>
                        <span className="text-red-500">HP归零 = 现实抹除。</span><br/>
                        当前玩家共有 3 条命。
                    </p>
                </div>

                <div className="relative pl-4 border-l border-zinc-700">
                    <h3 className="text-game-blue font-bold mb-1 flex items-center gap-2">
                        <Brain size={14} /> 
                        理智水平 (SAN)
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                        恐惧、幻觉、记忆反噬会降低SAN值。<br/>
                        SAN值过低 → 幻觉失控 (视觉干扰)<br/>
                        SAN值过高 → 触发系统惩罚
                    </p>
                </div>

                <div className="relative pl-4 border-l border-red-700">
                    <h3 className="text-red-600 font-bold mb-1 flex items-center gap-2">
                        <Ghost size={14} /> 
                        抹除机制
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed">
                        连续任务失败的玩家将被系统“格式化”。<br/>
                        意识转化为新的NPC，永远留在副本中。
                    </p>
                </div>
            </div>
        </div>

        <div className="p-4 border border-zinc-800 text-center text-xs text-zinc-500">
            SYSTEM_VER_2.0.45 <br/> DO NOT TURN OFF CONSOLE
        </div>
      </div>
    </div>
  );

  const renderGacha = () => (
    <div className="w-full h-full overflow-y-auto pt-16 pb-20 px-4 flex flex-col items-center">
       <div className="w-full max-w-md bg-zinc-900/80 border border-yellow-600/30 p-1 rounded-lg mb-4 flex items-center justify-between px-4 py-2">
          <span className="text-yellow-500 font-mono text-xs">可用碎片</span>
          <span className="text-white font-bold font-mono">1,240</span>
       </div>

       <div className="relative w-full max-w-[300px] aspect-[2/3] bg-black border border-zinc-800 mb-8 flex items-center justify-center overflow-hidden group cursor-pointer">
          {/* Holographic effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-transparent opacity-50 animate-pulse"></div>
          <div className="absolute inset-0 retro-grid opacity-50"></div>
          
          <div className="text-center relative z-10">
             <Lock size={48} className="mx-auto text-zinc-600 mb-2 group-hover:text-white transition-colors" />
             <div className="text-zinc-500 font-mono text-xs group-hover:text-game-blue">点击唤醒数据</div>
          </div>
          
          {/* Scanning Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/50 shadow-[0_0_10px_white] animate-scan opacity-0 group-hover:opacity-100"></div>
       </div>

       <div className="flex gap-4 w-full max-w-md">
          <button className="flex-1 py-3 border border-yellow-600/50 bg-yellow-600/10 text-yellow-500 font-mono text-sm hover:bg-yellow-600/20 transition-colors">
             单次唤醒
          </button>
          <button className="flex-1 py-3 bg-yellow-600 text-black font-mono text-sm font-bold hover:bg-yellow-500 transition-colors">
             十连唤醒
          </button>
       </div>
    </div>
  );

  return (
    <div className="w-screen h-screen bg-black text-white font-sans overflow-hidden relative">
      {gameState.view !== 'home' && <HeaderHUD hp={gameState.hp} san={gameState.san} />}
      
      {gameState.view === 'home' && (
        <div className="flex flex-col items-center justify-center h-full z-10 relative">
             <div className="absolute inset-0 retro-grid opacity-30"></div>
             
             {/* Main Title Area */}
             <div className="relative z-10 flex flex-col items-center gap-4">
                <h2 className="text-xl text-red-600 tracking-[0.5em] font-serif">失踪的</h2>
                <GlitchText text="上清寺" className="text-6xl md:text-8xl font-bold font-serif text-white tracking-widest" />
                
                <div className="w-32 h-[1px] bg-red-600 my-4"></div>
                
                <p className="text-xs font-mono text-zinc-500 tracking-widest typewriter">
                   INITIALIZING NEURAL LINK...
                </p>
             </div>

             <button 
                onClick={() => handleNavigate('hub')}
                className="mt-16 px-10 py-3 border border-red-600/50 text-red-500 hover:bg-red-600 hover:text-black transition-all duration-300 font-mono tracking-[0.2em] text-sm animate-pulse-fast hover:animate-none"
             >
                进入游戏
             </button>

             {/* Footer */}
             <div className="absolute bottom-10 text-[10px] text-zinc-700 font-mono text-center">
                COPYRIGHT © 2025 CHONGQING CHRONICLES<br/>
                SYSTEM ID: 443-221-X
             </div>
        </div>
      )}

      {gameState.view === 'hub' && renderHub()}
      {gameState.view === 'dungeons' && renderDungeons()}
      {gameState.view === 'characters' && renderCharacters()}
      {gameState.view === 'mechanics' && renderMechanics()}
      {gameState.view === 'gacha' && renderGacha()}

      {gameState.view !== 'home' && <NavBar currentView={gameState.view} onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;

export type ViewState = 'home' | 'hub' | 'mechanics' | 'characters' | 'dungeons' | 'gacha' | 'system';

export interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
  rarity: 'SSR' | 'SR' | 'R';
  bond: number;
}

export interface Dungeon {
  id: number;
  name: string;
  location: string;
  mission: string;
  riskLevel: number; // 1-5 stars
  npc: string;
  image: string;
  description: string;
  reward: string;
}

export interface GameState {
  hp: number; // Max 3
  san: number; // Max 100
  view: ViewState;
  inventory: string[];
}

import { Character, Dungeon } from '../types';
import { CHARACTERS, DUNGEONS } from '../constants';

// 你的 Java Tomcat 后端地址 (本地开发通常是 8080)
const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  getCharacters: async (): Promise<Character[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/characters`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, using local constants:', error);
      // Fallback to local data if backend is down
      return CHARACTERS;
    }
  },

  getDungeons: async (): Promise<Dungeon[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/dungeons`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, using local constants:', error);
      // Fallback to local data if backend is down
      return DUNGEONS;
    }
  }
};

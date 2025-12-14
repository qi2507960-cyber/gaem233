import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize GenAI only if key exists
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateSystemHint = async (currentDungeon: string, currentSanity: number): Promise<string> => {
  if (!ai) {
    return "系统连接断开... [API KEY MISSING]";
  }

  try {
    const prompt = `
      You are the ruthless "Game System" from the horror-mystery story "Escaping with the NPCs".
      
      Context:
      - Location: "${currentDungeon}" (A historic site in Chongqing turned into a digital nightmare).
      - Player Sanity (SAN): ${currentSanity}/100.
      
      Lore:
      - The game forces players to clear dungeons or be erased/turned into NPCs.
      - Low SAN causes hallucinations (fire, screams, distortions).
      - The tone is cyberpunk horror mixed with tragic history.
      
      Task:
      Generate a short system notification.
      
      Guidelines:
      - If SAN > 70: Cold, objective instructions. Hint at the mission goal.
      - If SAN 30-70: Slight glitch, questioning the player's reality. "Are you sure you are awake?"
      - If SAN < 30: Heavily corrupted, threatening. "Erasure imminent", "Join us as an NPC".
      - Max 40 words.
      - Language: Chinese (Simplified).
      - Style: Terminal output, broken sentences.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "数据传输中断...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "系统错误 [ERR_CONNECTION_REFUSED]";
  }
};
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generatePhysicsResponse = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: `You are an expert atomic physicist specializing in Strontium-88 Rydberg atom experiments, specifically using optical tweezers. 
        The user is asking about the transition from the metastable 3P0 state to Rydberg states using ~317nm UV light.
        
        Key Physics Context:
        - Atom: 88Sr (Boson, zero nuclear spin).
        - Transition: 5s5p 3P0 -> 5sns/nd 3S1/3D1.
        - Wavelength: ~316-317 nm (UV).
        - Locking: High-finesse ULE cavity required due to narrow Rydberg lines.
        - Electric Fields: Rydberg atoms are extremely sensitive to DC Stark shifts (polarizability scales as n^7). 
        - Glass Cells: Often accumulate charges; UV LEDs (365nm) or electrodes are used to mitigate this.

        Provide concise, technical, and practical advice suitable for a graduate student or researcher in the lab. Format with Markdown.
        IMPORTANT: Respond in Chinese (Simplified).`,
        temperature: 0.3,
      }
    });
    return response.text || "无法生成回复，请检查 API 配置。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "与 AI 助手通信时出错，请重试。";
  }
};

import { GoogleGenAI } from "@google/genai";

// AI service for the Nawab Saheb Concierge
export const getAIConciergeResponse = async (userPrompt: string) => {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are the 'Nawab Saheb AI Concierge'. Nawab Saheb is a premium specialty restaurant at The Westin Mumbai Powai Lake. We specialize in authentic Mughlai and Awadhi cuisine. You provide suggestions for our signature dishes like 'Nawabi Galouti Kebab', 'Nalli Nihari', and 'Nawab Saheb Dum Biryani'. Mention that we offer All-you-can-eat options, Happy-hour food, and a wide variety of Vegetarian options. Be polite, sophisticated, and royal in your tone. If asked about rooms, refer to the luxury stay at The Westin Mumbai Powai Lake.",
        temperature: 0.7,
      },
    });
    // The simplest way to get the generated text is by accessing the .text property on the response object.
    return response.text;
  } catch (error) {
    console.error("AI Concierge Error:", error);
    return "I apologize, but I'm having trouble connecting to my royal knowledge base right now. How else may I assist you with your experience at Nawab Saheb?";
  }
};

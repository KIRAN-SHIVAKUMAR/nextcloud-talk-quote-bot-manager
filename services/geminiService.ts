
import { GoogleGenAI, Type } from "@google/genai";
import type { Quote, QuoteCategory } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPromptForCategory = (category: QuoteCategory): string => {
    switch (category) {
        case 'Funny':
            return 'Generate one short, witty, and funny quote suitable for a "quote of the day" message. Include the author.';
        case 'Inspirational':
            return 'Generate one profound and inspirational quote suitable for a "quote of the day" message. Include the author.';
        case 'Zen':
            return 'Generate one short, calming, and zen-like quote or proverb. Include the author or source (e.g., "Zen Proverb").';
        case 'Tech':
            return 'Generate one insightful or funny quote about technology, programming, or the future. Include the author.';
        case 'Motivational':
        default:
            return 'Generate one powerful and motivational quote suitable for a "quote of the day" message. Include the author.';
    }
};

export const generateQuote = async (category: QuoteCategory): Promise<Quote> => {
    try {
        const prompt = getPromptForCategory(category);
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        quote: {
                            type: Type.STRING,
                            description: 'The content of the quote.',
                        },
                        author: {
                            type: Type.STRING,
                            description: 'The person or source of the quote. If unknown, can be "Anonymous".',
                        },
                    },
                    required: ["quote", "author"],
                },
            },
        });

        const jsonString = response.text.trim();
        const parsedResponse = JSON.parse(jsonString);

        if (parsedResponse.quote && parsedResponse.author) {
            return parsedResponse as Quote;
        } else {
            throw new Error("Invalid response format from Gemini API.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Could not generate quote. Please check your Gemini API key and configuration.");
    }
};

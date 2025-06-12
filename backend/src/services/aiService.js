// backend/src/services/aiService.js

import { GoogleGenerativeAI } from '@google/generative-ai';
// Make sure to import both prompt functions at the top
import { generateAIPrompt, generateUpdatePrompt } from '../utils/prompts.js';
import { v4 as uuidv4 } from 'uuid';

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash-latest',
      generationConfig: { responseMimeType: "application/json" }
    });
  }

  // This method generates the initial plan
  async generateSessionData(userInput, userProfile) {
    try {
      const prompt = generateAIPrompt(userInput, userProfile);
      console.log("Sending prompt to Gemini for JSON generation...");
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const jsonText = response.text();
      console.log("Received JSON response from Gemini.");
      const sessionData = JSON.parse(jsonText);
      if (sessionData.tasks) {
        sessionData.tasks.forEach(task => {
          task.id = uuidv4();
        });
      }
      return sessionData;
    } catch (error) {
      console.error('Gemini JSON Generation Error:', error);
      throw new Error(`AI session data generation failed: ${error.message}`);
    }
  }

  // This new method handles plan updates
  async generateSessionUpdate(remainingTasks, newProfile, newContext) {
    try {
      const prompt = generateUpdatePrompt(remainingTasks, newProfile, newContext);
      console.log("Sending prompt to Gemini for session UPDATE...");
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const jsonText = response.text();
      console.log("Received updated JSON response from Gemini.");
      const updatedData = JSON.parse(jsonText);
      if (updatedData.tasks) {
        updatedData.tasks.forEach(task => {
          // If a task was passed in, keep its ID, otherwise create a new one
          const existingTask = remainingTasks.find(t => t.text === task.text);
          task.id = existingTask ? existingTask.id : uuidv4();
        });
      }
      return updatedData;
    } catch (error) {
      console.error('Gemini JSON Update Error:', error);
      throw new Error(`AI session update failed: ${error.message}`);
    }
  }
}

export default new AIService();

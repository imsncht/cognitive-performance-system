// backend/src/services/psychologyEngine.js
class PsychologyEngine {
  constructor() {
    this.cognitiveLoadThresholds = {
      LOW: 3,
      MEDIUM: 6,
      HIGH: 8
    };
    
    this.energyThresholds = {
      LOW: 3,
      MEDIUM: 6,
      HIGH: 8
    };
  }

  analyzeCognitiveState(userProfile) {
    const { cognitiveLoad, energyLevel, stressLevel } = userProfile;
    
    return {
      cognitiveCapacity: this.calculateCognitiveCapacity(cognitiveLoad),
      optimalSessionLength: this.calculateOptimalSessionLength(energyLevel, cognitiveLoad),
      stressOptimization: this.applyYerkesDodsonLaw(stressLevel),
      breakFrequency: this.calculateBreakFrequency(energyLevel, cognitiveLoad),
      taskComplexityLimit: this.getTaskComplexityLimit(cognitiveLoad, stressLevel)
    };
  }

  calculateCognitiveCapacity(cognitiveLoad) {
    if (cognitiveLoad <= this.cognitiveLoadThresholds.LOW) return 'high';
    if (cognitiveLoad <= this.cognitiveLoadThresholds.MEDIUM) return 'medium';
    return 'low';
  }

  calculateOptimalSessionLength(energyLevel, cognitiveLoad) {
    const baseSession = 25; // Standard Pomodoro
    
    if (energyLevel >= this.energyThresholds.HIGH && cognitiveLoad <= this.cognitiveLoadThresholds.LOW) {
      return 45; // Deep work session
    }
    
    if (energyLevel <= this.energyThresholds.LOW || cognitiveLoad >= this.cognitiveLoadThresholds.HIGH) {
      return 15; // Short focused bursts
    }
    
    return baseSession;
  }

  applyYerkesDodsonLaw(stressLevel) {
    // Optimal performance at moderate stress (4-6)
    if (stressLevel < 3) return 'increase_challenge';
    if (stressLevel > 7) return 'reduce_pressure';
    return 'optimal_zone';
  }

  calculateBreakFrequency(energyLevel, cognitiveLoad) {
    const fatigueScore = (10 - energyLevel) + cognitiveLoad;
    
    if (fatigueScore > 14) return 'frequent'; // Every 15-20 min
    if (fatigueScore > 10) return 'regular';  // Every 25-30 min
    return 'standard'; // Every 45-60 min
  }

  getTaskComplexityLimit(cognitiveLoad, stressLevel) {
    const complexityScore = 10 - cognitiveLoad - (stressLevel > 7 ? 2 : 0);
    
    if (complexityScore <= 3) return 'simple';
    if (complexityScore <= 6) return 'moderate';
    return 'complex';
  }

  generateBehavioralNudges(userProfile, context) {
    const nudges = [];
    
    // Implementation Intentions
    if (context.hasGoals) {
      nudges.push({
        type: 'implementation_intention',
        message: 'When you finish this task, then you will immediately start the next one.',
        timing: 'task_completion'
      });
    }

    // Ego Depletion Management
    if (userProfile.energyLevel <= 4) {
      nudges.push({
        type: 'energy_conservation',
        message: 'Take a 5-minute walk to recharge your mental energy.',
        timing: 'low_energy_detected'
      });
    }

    // Cognitive Load Reduction
    if (userProfile.cognitiveLoad >= 8) {
      nudges.push({
        type: 'cognitive_relief',
        message: 'Break this complex task into 3 smaller steps.',
        timing: 'high_load_detected'
      });
    }

    return nudges;
  }
}

export default new PsychologyEngine();
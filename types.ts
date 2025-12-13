export enum Tab {
  GUIDE = 'GUIDE',
  LASER_SPECS = 'LASER_SPECS',
  STRAY_FIELDS = 'STRAY_FIELDS',
  AI_ASSISTANT = 'AI_ASSISTANT'
}

export interface LaserParameter {
  linewidth: number;
  rabiFreq: number;
  couplingEfficiency: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

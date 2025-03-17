export interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export interface Option {
  label: string;
  next: string;
}

export interface ConversationFlow {
  [key: string]: {
    message: string;
    options: Option[];
  };
}

export interface CarRepairDataset {
  id: number;
  symptoms: string;
  problem: string;
  solution: string;
  detailed_steps: string[]; // Array of strings
  tools_required: string;
}
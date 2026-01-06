export type BudgetLevel = '0-5000' | '5000-15000' | '15000-30000' | '30000plus'

export interface ActivityItem {
  id: string;
  label: "morning" | "afternoon" | "evening";
  text: string;
  source: "ai" | "user";
  placeQuery?: string; // E.g. “Sagrada Familia, Barcelona”
  lat?: number;
  lng?: number;
}

export interface PlanDay {
  date: string;
  activities: ActivityItem[];
}

export interface TravelPlan {
  destination: string;
  startDate: string;
  endDate: string;
  budget: BudgetLevel;
  interests: string[];
  travelers?: string;
  days: PlanDay[];
  packingList: string[];
  tips: string[];
  reservations?: Array<{
    type: 'flight' | 'train' | 'hotel' | 'restaurant' | 'activity';
    name: string;
    time?: string;
    address?: string;
    confirmation?: string;
  }>;
  transportNotes?: string[];
  safetyNotes?: string[];
  /**
   * Fritt anteckningsfält för egna bokningar (UI-driven, inte AI-genererat).
   */
  reservationsNotepad?: string;
}


export interface TravelPlanRequest {
  destination: string
  startDate: string
  endDate: string
  budget: BudgetLevel
  interests: string[]
  travelers?: string
}


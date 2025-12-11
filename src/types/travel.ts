export type BudgetLevel = 'shoestring' | 'mid' | 'premium' | 'luxury'

export interface TravelPlanDay {
  date: string
  morning: string
  afternoon: string
  evening: string
}

export interface TravelPlan {
  destination: string
  startDate: string
  endDate: string
  budget: BudgetLevel
  interests: string[]
  travelers?: string
  days: TravelPlanDay[]
  packingList: string[]
  tips: string[]
  reservations?: Array<{
    type: 'flight' | 'train' | 'hotel' | 'restaurant' | 'activity'
    name: string
    time?: string
    address?: string
    confirmation?: string
  }>
  transportNotes?: string[]
  safetyNotes?: string[]
}

export interface TravelPlanRequest {
  destination: string
  startDate: string
  endDate: string
  budget: BudgetLevel
  interests: string[]
  travelers?: string
}


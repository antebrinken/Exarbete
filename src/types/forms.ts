import type { BudgetLevel } from './travel'

export interface TravelFormData {
  destination: string
  startDate: string
  endDate: string
  budget: BudgetLevel
  interests: string[]
  travelers?: string
}


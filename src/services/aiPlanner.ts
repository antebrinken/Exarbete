import type { TravelPlan, TravelPlanRequest } from '../types/travel'

// Placeholder service for a future AI-backed itinerary generator.
// Swap this with a real API call once the AI endpoint exists.
export async function generateTravelPlan(
  request: TravelPlanRequest,
): Promise<TravelPlan> {
  // TODO: replace with real AI call
  return {
    destination: request.destination,
    startDate: request.startDate,
    endDate: request.endDate,
    budget: request.budget,
    interests: request.interests,
    travelers: request.travelers,
    days: [
      {
        date: request.startDate,
        morning: 'Arrival and hotel check-in',
        afternoon: 'City walking tour focused on local cuisine',
        evening: 'Dinner at a recommended spot + night stroll',
      },
      {
        date: request.endDate,
        morning: 'Museum visit',
        afternoon: 'Park or waterfront time',
        evening: 'Departure prep',
      },
    ],
    packingList: ['Passport', 'Travel adapter', 'Comfortable shoes', 'Reusable bottle'],
    tips: ['Book popular attractions in advance', 'Carry offline maps', 'Check local transit cards'],
    reservations: [
      {
        type: 'hotel',
        name: 'Sample Hotel',
        address: '123 Main St',
      },
    ],
    transportNotes: ['Consider a day transit pass for downtown travel'],
    safetyNotes: ['Keep copies of documents backed up securely'],
  }
}


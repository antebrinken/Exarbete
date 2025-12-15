import type { TravelFormData } from '../types/forms'
import type { TravelPlan } from '../types/responses'

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ??
  'http://localhost:3001/api/travel-plan'

export async function generateTravelPlan(formData: TravelFormData): Promise<TravelPlan> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    throw new Error('Failed to generate travel plan');
  }
  const data = await res.json();
  return data as TravelPlan;
}

export async function regenerateDay(formData: TravelFormData): Promise<import("../types/travel").TravelPlanDay> {
  const plan = await generateTravelPlan(formData);
  return plan.days[0];
}



import type { TravelFormData } from '../types/forms'

export function buildTravelPlanPrompt(formData: TravelFormData) {
  const { destination, startDate, endDate, budget, interests, travelers } = formData

  return `

- Destination: ${destination}
- Start date: ${startDate}
- End date: ${endDate}
- Budget level: ${budget}
- Interests: ${interests.join(', ')}
- Travel party: ${travelers ?? 'Not specified'}


{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "label": "morning",
          "text": "Visit Sagrada Familia (Place: Sagrada Familia, Barcelona)",
          "placeQuery": "Sagrada Familia, Barcelona"
        }
      ]
    }
  ],
  "packingList": ["item1", "item2"],
  "tips": ["tip1", "tip2"]
}
`
}


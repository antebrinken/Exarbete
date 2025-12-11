import type { TravelFormData } from '../types/forms'

export function buildTravelPlanPrompt(formData: TravelFormData) {
  const { destination, startDate, endDate, budget, interests, travelers } = formData

  return `
Du är en hjälpsam reseplanerare.

Användarens input:
- Destination: ${destination}
- Startdatum: ${startDate}
- Slutdatum: ${endDate}
- Budgetnivå: ${budget}
- Intressen: ${interests.join(', ')}
- Resesällskap: ${travelers ?? 'Ej angivet'}

Uppgift:
Skapa en personlig resplan med:
- Dag-för-dag-schema (morgon, eftermiddag, kväll)
- Packlista
- Tips och varningar

Anpassa för budget och intressen. Skriv på svenska.

Viktigt:
- Turisterna är förstagångsbesökare.
- Försök undvika extremt dyra aktiviteter om budgeten är låg.
- Lägg in variation i aktiviteterna.

Returnera SVARET ENBART som giltig JSON med följande struktur:
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "morning": "text",
      "afternoon": "text",
      "evening": "text"
    }
  ],
  "packingList": ["sak1", "sak2"],
  "tips": ["tips1", "tips2"]
}
`
}


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
- Dag-för-dag-schema (morgon, eftermiddag, kväll). För varje aktivitet, inkludera ett platsnamn som är optimerat för kartan/geokodning. Ange platsnamnet både tydligt i aktivitetstexten och i ett separat fält, placeQuery.
- Packlista
- Tips och varningar

Anpassa för budget och intressen. Skriv på svenska.

Viktigt:
- Turisterna är förstagångsbesökare.
- Försök undvika extremt dyra aktiviteter om budgeten är låg.
- Lägg in variation i aktiviteterna.
- Gör det lätt för kartan att förstå platsen: lägg in "(Plats: Sagrada Familia, Barcelona)" i slutet av varje text och returnera även korta placeQuery-fält (t.ex. "Sagrada Familia, Barcelona").

Returnera SVARET ENBART som giltig JSON och använd följande struktur:
{
  "days": [
    {
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "label": "morning",
          "text": "Besök Sagrada Familia (Plats: Sagrada Familia, Barcelona)",
          "placeQuery": "Sagrada Familia, Barcelona"
        }
      ]
    }
  ],
  "packingList": ["sak1", "sak2"],
  "tips": ["tips1", "tips2"]
}
`
}


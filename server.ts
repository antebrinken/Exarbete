import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import { buildTravelPlanPrompt } from './src/services/promptBuilder.js'
import type { TravelPlan, TravelPlanRequest } from './src/types/travel.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const apiKey = process.env.OPENAI_API_KEY
const openai = apiKey ? new OpenAI({ apiKey }) : null

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.post('/api/travel-plan', async (req, res) => {
  console.log('Received travel-plan request:', req.body);
  try {
    if (!openai) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY in environment' })
    }

    const formData = req.body as TravelPlanRequest
    const { destination, startDate, endDate, budget } = formData ?? {}

    if (!destination || !startDate || !endDate || !budget) {
      return res
        .status(400)
        .json({ error: 'destination, startDate, endDate, and budget are required' })
    }

    const prompt = buildTravelPlanPrompt({
      ...formData,
      interests: formData.interests ?? [],
    })

    // Replace the OpenAI call with the correct chat completion format
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'Du är en hjälpsam reseplanerare.' },
        { role: 'user', content: prompt }
      ],
    })

    const text = completion.choices?.[0]?.message?.content?.trim() || '';

    if (!text) {
      return res.status(502).json({ error: 'Empty response from AI' })
    }

    let plan: TravelPlan
    try {
      // Attempt to extract JSON object from the text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        return res.status(502).json({
          error: 'AI response did not contain a JSON object',
          raw: text,
        })
      }
      plan = JSON.parse(jsonMatch[0])
      // -- Enkel validering --
      if (!plan.days || !Array.isArray(plan.days)) {
        return res.status(502).json({ error: 'Ingen days[]-array i svar', raw: plan })
      }
      if (!plan.days.every(day => typeof day.date === 'string' && Array.isArray(day.activities))) {
        return res.status(502).json({ error: 'day saknar date eller activities-array', raw: plan })
      }
    } catch (parseError) {
      return res.status(502).json({
        error: 'Failed to parse AI response as JSON',
        raw: text,
      })
    }

    return res.json(plan)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Travel plan error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate travel plan'
    return res.status(500).json({ error: message })
  }
})

import { saveTrip, getTrip } from './src/sharedTripStore.js'

app.post('/api/shared-trips', async (req, res) => {
  try {
    const trip = req.body
    if (!trip) return res.status(400).json({ error: 'Missing trip' })
    const id = await saveTrip(trip)
    res.status(201).json({ shareId: id })
  } catch (e) {
    res.status(500).json({ error: 'Could not save trip', details: e })
  }
})

app.get('/api/shared-trips/:shareId', async (req, res) => {
  try {
    const trip = await getTrip(req.params.shareId)
    if (!trip) return res.status(404).json({ error: 'Not found' })
    res.json(trip)
  } catch (e) {
    res.status(500).json({ error: 'Could not load trip', details: e })
  }
})

const port = Number(process.env.PORT) || 3001

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`)
})

export default app


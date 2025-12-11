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

    const completion = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
    })

    const outputArray = Array.isArray((completion as unknown as { output?: any[] }).output)
      ? (completion as unknown as { output?: any[] }).output
      : undefined

    const text =
      completion.output_text?.[0] ??
      outputArray
        ?.flatMap((item) => (item && 'content' in item ? (item as any).content ?? [] : []))
        .find((c: any) => c && c.type === 'text')?.text ??
      ''

    if (!text) {
      return res.status(502).json({ error: 'Empty response from AI' })
    }

    let plan: TravelPlan
    try {
      plan = JSON.parse(text)
    } catch (parseError) {
      return res.status(502).json({ error: 'Failed to parse AI response as JSON' })
    }

    return res.json(plan)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating travel plan', error)
    return res.status(500).json({ error: 'Failed to generate travel plan' })
  }
})

const port = Number(process.env.PORT) || 3001

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`)
})

export default app


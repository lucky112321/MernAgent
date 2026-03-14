import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateWithLLM({ systemPrompt, userPrompt, model = 'gpt-4o-mini' }) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      content: `LLM disabled (no OPENAI_API_KEY). Fallback response for: ${userPrompt}`,
      model: 'fallback'
    };
  }

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.2
  });

  return {
    content: completion.choices[0]?.message?.content || '',
    model
  };
}

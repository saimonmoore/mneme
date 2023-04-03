// @ts-ignore
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '#config/constants.js';

export async function getKeywordsFromText(text: string) {
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Extract keywords from this text and return as a JSON array:\n\n"${text}"`,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0,
  });
  console.log(response);
}

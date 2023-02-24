import { remark } from 'remark'
import stripMarkdown from 'strip-markdown'
import { Configuration, OpenAIApi } from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(configuration)

function markdownToText(markdown: string | undefined) {
  return remark()
    .use(stripMarkdown)
    .processSync(markdown ?? '')
    .toString()
}

export async function useOpenAi(prompt: any) {
  console.log('🚀🚀🚀 / 输入值', prompt)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + String(apiKey)
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.9, // 每次返回的答案的相似度0-1（0：每次都一样，1：每次都不一样）
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    })
  };

  const response = await fetch('https://api.openai.com/v1/completions', requestOptions)

  const data = await response.json()

  const reply = markdownToText(data.choices[0].text)

  console.log('🚀🚀🚀 / 机器人回复', reply)
  return reply
}

import {Configuration, OpenAIApi} from 'openai'
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai'
import * as readline from 'readline'
import axios from 'axios'
import {askConvo, chadConvo} from './Conversations'

enum Personality {
  ChadGpt,
  AskGpt,
}

class ChadGpt {
  configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  static chadMessages: ChatCompletionRequestMessage[] = [...chadConvo]
  static askMessages: ChatCompletionRequestMessage[] = [...askConvo]

  // constructor
  constructor() {
    console.log('Constructor here!')
  }

  private async questionAsync(prompt: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    return new Promise(resolve => {
      rl.question(prompt, (answer: string) => {
        rl.close()
        resolve(answer)
      })
    })
  }

  /**
   * Completes the prompt for a given conversation. The conversation describes
   * the personality of ChadGPT.
   * @param prompt The prompt to complete
   * @param conversation The conversation to use as the personality
   * @returns The completed prompt as a string
   */
  async askChatGpt(
    prompt: string,
    conversation: ChatCompletionRequestMessage[],
  ): Promise<string | undefined> {
    conversation.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: prompt,
    })

    const openai = new OpenAIApi(this.configuration)
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversation,
        temperature: 0,
        max_tokens: 64,
      })

      if (response?.data.choices[0]) {
        conversation.push({
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: response.data.choices[0].message?.content ?? '',
        })
        return response.data.choices[0].message?.content
      } else {
        return 'there were no choices'
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429)
          console.log('Too many requests. Please wait and try again later.')
      } else {
        console.error('Failed to create completions', error)
      }
      return undefined
    }
  }
}
export default ChadGpt

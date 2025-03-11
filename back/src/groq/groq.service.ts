import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';
import { ConfigService } from '@nestjs/config';
import { ChatCompletionMessageDto } from './dto/create-chat-completion.request';

@Injectable()
export class GroqService {
  private readonly groqClient: Groq;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow('GROQ_API_KEY');
    this.groqClient = new Groq({ apiKey });
  }

  async createChatCompletion(messages: ChatCompletionMessageDto[]) {
    try {
      const formattedMessages = messages.map((msg) => {
        if (msg.role === 'function') {
          if (!msg.name) {
            throw new Error('Поле "name" обязательно для сообщений с ролью "function"');
          }
          return {
            role: 'function',
            content: msg.content,
            name: msg.name,
          } as const;
        }

        return {
          role: msg.role as 'system' | 'user' | 'assistant',
          content: msg.content,
          name:''
        }
      });

      const response = await this.groqClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: formattedMessages,
      });

      return response.choices[0]?.message?.content || 'Ответ не получен';
    } catch (error) {
      console.error('Ошибка запроса к Groq API:', error);
      throw new Error(`Ошибка запроса к Groq API: ${error.message}`);
    }
  }
}

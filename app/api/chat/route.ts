import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const apiKey = process.env.DEEPSEEK_API_KEY;

const client = new OpenAI({
  apiKey,
  baseURL: 'https://api.deepseek.com'
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages,
      temperature: 1.3,
      max_tokens: 2000,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('AI响应错误:', error);
    return NextResponse.json(
      { error: '处理请求时发生错误' },
      { status: 500 }
    );
  }
} 
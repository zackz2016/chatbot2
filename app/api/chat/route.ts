export const runtime = 'edge';

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: 'https://api.deepseek.com',
      dangerouslyAllowBrowser: true,
      defaultHeaders: {
        'Content-Type': 'application/json',
      },
      defaultQuery: undefined,
      fetch: fetch,
    });

    const { messages } = await request.json();
    
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error: any) {
    console.error('AI响应错误:', error);
    return NextResponse.json(
      { error: error?.message || '处理请求时发生错误' },
      { status: 500 }
    );
  }
} 
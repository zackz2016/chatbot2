export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// 添加一个简单的格式检测函数
const isCodeBlock = (text: string): boolean => {
  return text.startsWith('```') && text.endsWith('```');
};

const isList = (text: string): boolean => {
  return text.trim().match(/^[1-9]\.|\-|\*\s/) !== null;
};

export const generateAIResponse = async (messages: Message[]) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('AI响应错误:', error);
    throw error;
  }
}; 
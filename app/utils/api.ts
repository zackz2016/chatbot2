export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
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
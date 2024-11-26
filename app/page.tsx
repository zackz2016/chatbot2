'use client';

import { useState } from 'react';
import { Message, generateAIResponse } from './utils/api';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      // 添加系统提示以规范输出格式
      const systemMessage: Message = {
        role: 'system',
        content: '请使用简单的文字段落回复，如需列举要点请使用数字编号，代码示例请使用三个反引号包裹，避免使用复杂的markdown语法。'
      };
      
      const newMessage: Message = { role: 'user', content: input };
      const newMessages = messages.length === 0 
        ? [systemMessage, newMessage] 
        : [...messages, newMessage];
        
      setMessages(messages.length === 0 
        ? [newMessage] 
        : [...messages, newMessage]);
      setInput('');

      const aiResponse = await generateAIResponse(newMessages);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse.content
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '抱歉，发生了一些错误。请稍后再试。'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 侧边栏 */}
      <div className="w-64 bg-white border-r border-gray-100 p-4 hidden md:block">
        <button 
          onClick={() => setMessages([])}
          className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新对话
        </button>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-[650px] flex flex-col">
          {/* 欢迎信息 */}
          {messages.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-gray-800">欢迎使用 AI 助手</h1>
                <p className="text-gray-600">有什么我可以帮您的吗？</p>
              </div>
            </div>
          )}

          {/* 聊天记录 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {message.content.split('\n').map((line, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl flex items-center gap-2">
                  <div className="animate-pulse">思考中...</div>
                </div>
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <div className="border-t border-gray-100 p-4">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="输入您的问题..."
                disabled={isLoading}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2 disabled:bg-gray-300"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"/>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
                发送
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

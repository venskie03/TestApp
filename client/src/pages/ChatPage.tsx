import React, { useState, useRef, useEffect } from 'react';
import { API } from '../components/api/api';
import { FaUser, FaRobot, FaPaperPlane } from 'react-icons/fa';

interface GeminiData {
    summary: string;
    key_points: string[];
    action_items: string[];
}

interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string | GeminiData;
    timestamp: Date;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await API.chatGemini({ input: inputText });

            const result = response.data.result;

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: result,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: "Sorry, I encountered an error receiving the response.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-md sticky top-0 z-10">
                <div className="container mx-auto max-w-4xl flex items-center justify-between">
                    <h1 className="text-xl font-bold flex items-center gap-2 text-blue-400">
                        <FaRobot className="text-2xl" />
                        Kevin kyle Chat
                    </h1>
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 container mx-auto max-w-4xl scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                        <FaRobot className="text-6xl mb-4" />
                        <p className="text-lg">Start a conversation with Gemini...</p>
                    </div>
                )}

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                            } animate-fade-in-up`}
                    >
                        <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                            }`}>
                            {/* Avatar */}
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg
                                ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}
                            `}>
                                {msg.role === 'user' ? <FaUser size={16} /> : <FaRobot size={20} />}
                            </div>

                            {/* Bubble */}
                            <div className={`
                                p-4 rounded-2xl shadow-md text-sm md:text-base leading-relaxed
                                ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-gray-800 border border-gray-700 text-gray-100 rounded-tl-none'
                                }
                            `}>
                                {typeof msg.content === 'string' ? (
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Summary */}
                                        <div className="border-b border-gray-600/50 pb-2 mb-2">
                                            <h3 className="text-emerald-400 font-bold mb-1 text-xs uppercase tracking-wider">Summary</h3>
                                            <p className="leading-relaxed">{msg.content.summary}</p>
                                        </div>

                                        {/* Key Points */}
                                        <div>
                                            <h3 className="text-amber-400 font-bold mb-2 text-xs uppercase tracking-wider">Key Points</h3>
                                            <ul className="list-disc pl-4 space-y-1 marker:text-amber-400">
                                                {msg.content.key_points.map((point, idx) => (
                                                    <li key={idx}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Action Items */}
                                        <div className="bg-gray-900/50 rounded-lg p-3 mt-2 border border-blue-500/20">
                                            <h3 className="text-blue-400 font-bold mb-2 text-xs uppercase tracking-wider">Action Items</h3>
                                            <ul className="space-y-2">
                                                {msg.content.action_items.map((item, idx) => (
                                                    <li key={idx} className="flex gap-2 items-start">
                                                        <span className="text-blue-500 mt-1">✓</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                <div className={`text-[10px] mt-2 opacity-70 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                    <div className="flex justify-start w-full animate-pulse">
                        <div className="flex gap-3 max-w-[75%] items-end">
                            <div className="w-10 h-10 rounded-full bg-emerald-600/50 flex items-center justify-center shrink-0">
                                <FaRobot className="text-white opacity-50" size={20} />
                            </div>
                            <div className="bg-gray-800 border border-gray-700 p-4 rounded-2xl rounded-tl-none text-gray-300">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    <span className="ml-2 font-medium italic text-emerald-400/80">Thinking...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <footer className="bg-gray-800 border-t border-gray-700 p-4 sticky bottom-0 z-20">
                <div className="container mx-auto max-w-4xl">
                    <form onSubmit={handleSend} className="relative flex items-end gap-2 bg-gray-900 border border-gray-600 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all shadow-lg">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type a message..."
                            className="w-full bg-transparent text-gray-100 placeholder-gray-500 p-3 max-h-32 resize-none focus:outline-none scrollbar-thin overflow-y-auto min-h-[50px]"
                            rows={1}
                            style={{ height: 'auto', minHeight: '52px' }}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isLoading}
                            className={`
                                p-3 rounded-xl flex items-center justify-center transition-all duration-200 mb-1 mr-1
                                ${!inputText.trim() || isLoading
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-md shadow-blue-900/20'
                                }
                            `}
                        >
                            <FaPaperPlane size={18} />
                        </button>
                    </form>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-gray-500">
                            Gemini may display inaccurate info, including about people, so double-check its responses.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatPage;

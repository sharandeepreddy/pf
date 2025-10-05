import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, X, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm Sharandeep's AI assistant. I can help you learn about his experience, skills, education, projects, or contact information. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [sessionId, setSessionId] = useState(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call actual AI API
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          session_id: sessionId
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update session ID if new
        if (!sessionId) {
          setSessionId(data.session_id);
        }

        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: data.reply,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
      } else {
        // Fallback response on API error
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: "I apologize, but I'm having trouble connecting to my AI service right now. Please try again in a moment, or feel free to contact Sharandeep directly at sharanreddy.adla@gmail.com.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error('Chatbot API Error:', error);
      // Fallback response on network error
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "I'm currently experiencing technical difficulties. You can reach Sharandeep directly at sharanreddy.adla@gmail.com or check out his projects on GitHub: https://github.com/sharan-555/",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Tell me about his experience",
    "What are his technical skills?",
    "Show me his projects",
    "How can I contact him?"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-96">
          <Card className="h-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-2xl">
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                      AI Assistant
                    </CardTitle>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Ask me about Sharandeep
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-slate-700"
                  >
                    <Minimize2 size={16} />
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="p-0 h-full flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.type === 'bot' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot size={16} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-8 h-8 bg-gray-300 dark:bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={16} className="text-gray-600 dark:text-gray-300" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-2"
                        onClick={() => {
                          setInputMessage(question);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about Sharandeep..."
                    className="flex-1 bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
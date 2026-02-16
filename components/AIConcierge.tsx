
import React, { useState, useRef, useEffect } from 'react';
import { getAIConciergeResponse } from '../services/geminiService';

const AIConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Greetings! I am your personal concierge at Nawab Saheb. How may I assist you with your royal dining experience today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    const aiResponse = await getAIConciergeResponse(userMessage);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || 'I am sorry, I could not process that.' }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gold text-charcoal rounded-full flex items-center justify-center shadow-2xl hover:bg-gold-light transition-all duration-300 transform hover:scale-110"
        title="AI Concierge"
      >
        <span className="iconify w-8 h-8" data-icon={isOpen ? "lucide:x" : "lucide:sparkles"}></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-charcoal-light border border-gold/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-gold p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center">
              <span className="iconify w-5 h-5 text-gold" data-icon="lucide:bot"></span>
            </div>
            <h3 className="text-charcoal font-display font-medium">Nawab Saheb Concierge</h3>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 h-96 overflow-y-auto space-y-4 bg-charcoal/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' ? 'bg-gold text-charcoal rounded-tr-none' : 'bg-charcoal-light text-cream/90 border border-cream/10 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-charcoal-light p-3 rounded-2xl rounded-tl-none border border-cream/10">
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-charcoal border-t border-cream/10">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-charcoal-light border border-cream/10 rounded-full px-4 py-2 text-sm text-cream focus:outline-none focus:border-gold"
              />
              <button type="submit" className="w-10 h-10 bg-gold text-charcoal rounded-full flex items-center justify-center hover:bg-gold-light transition-colors">
                <span className="iconify w-5 h-5" data-icon="lucide:send"></span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConcierge;

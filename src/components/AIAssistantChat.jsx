import React, { useState, useEffect, useRef, memo } from 'react';
import './AIAssistantChat.css';

const AIAssistantChat = memo(({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm Abdullah's AI Assistant. What would you like to know about his skills, experience, or projects?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "I'm a simulated assistant! You can reach Abdullah directly at contact@valtrix.dev for serious inquiries.";
      const lowerInput = userMessage.toLowerCase();
      
      if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
        response = "Abdullah is a Full Stack Developer specializing in React, Next.js, Node.js, and modern CSS/animations. He loves building premium minimalist interfaces!";
      } else if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
        response = "Abdullah has built amazing projects like WHITE Fintech and Open Source tools. You can check them out in the Projects section of this portfolio!";
      } else if (lowerInput.includes('contact') || lowerInput.includes('hire') || lowerInput.includes('email')) {
        response = "You can reach Abdullah directly at contact@valtrix.dev. He's always open to discussing new opportunities!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        response = "Hello there! How can I help you today?";
      }

      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5s - 2.5s simulated delay
  };

  if (!isOpen) return null;

  return (
    <div className="ai-chat-window">
      <div className="ai-chat-header">
        <div className="ai-chat-header-info">
          <div className="ai-chat-avatar-wrapper">
            <svg viewBox="0 0 100 100" className="ai-chat-avatar-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="aiChatGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <path 
                d="M 20 50 C 20 25, 30 15, 50 15 C 70 15, 80 25, 80 50 C 80 65, 75 75, 60 75 L 70 85 L 50 80 C 30 80, 20 70, 20 50 Z" 
                fill="url(#aiChatGlow)" 
              />
              <rect x="38" y="38" width="8" height="20" rx="4" fill="#ffffff" />
              <rect x="54" y="38" width="8" height="20" rx="4" fill="#ffffff" />
            </svg>
          </div>
          <div className="ai-chat-title">
            <h4>AI Assistant</h4>
            <span className="ai-chat-status">
              <span className="status-dot"></span> Online
            </span>
          </div>
        </div>
        <button onClick={onClose} className="ai-chat-close-btn" aria-label="Close Chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-message-row ${msg.role}`}>
            <div className={`ai-message-bubble ${msg.role}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="ai-message-row ai">
            <div className="ai-message-bubble ai typing">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="ai-chat-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..." 
          className="ai-chat-input"
        />
        <button type="submit" className={`ai-chat-send-btn ${input.trim() ? 'active' : ''}`} disabled={!input.trim() || isTyping}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  );
});

export default AIAssistantChat;

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/Chatbot.module.css';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { 
      from: 'bot', 
      text: 'Hi! I\'m Arpit\'s portfolio assistant. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close chatbot if clicked outside
  useEffect(() => {
    if (!open) return;
    
    const handleClickOutside = (event) => {
      const chatbot = document.getElementById('portfolio-chatbot');
      if (chatbot && !chatbot.contains(event.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { 
      from: 'user', 
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setIsTyping(true);
    setError(null);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await res.json();
      console.log('Chat API response:', data);
      
      // Short delay to simulate typing
      setTimeout(() => {
        setIsTyping(false);
        if (data.error) {
          setError(data.error);
          setMessages(msgs => [...msgs, { 
            from: 'bot', 
            text: 'Sorry, I encountered an error. Please try again later.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isError: true
          }]);
        } else {
          const botReply = data.text || 'No response from server';
          setMessages(msgs => [...msgs, { 
            from: 'bot', 
            text: botReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }
      }, 1000);
      
    } catch (err) {
      console.error('Client chat error:', err);
      setIsTyping(false);
      setError('Network error');
      setMessages(msgs => [...msgs, { 
        from: 'bot', 
        text: 'Network error. Please check your connection and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      }]);
    }
  };

  return (
    <div className={styles.chatbot} id="portfolio-chatbot">
      <div 
        className={`${styles.iconWrapper} ${open ? styles.activeIcon : ''}`} 
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat assistant"
      >
        <Image src="/github_co.webp" alt="Chatbot" width={24} height={24} />
        {!open && <div className={styles.pulseEffect}></div>}
      </div>
      
      {open && (
        <div className={styles.modal}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.botAvatar}>
                <Image src="/github_co.webp" alt="AI" width={24} height={24} />
              </div>
              <div className={styles.headerText}>
                <div className={styles.headerTitle}>Arpit AI Assistant</div>
                <div className={styles.headerStatus}>
                  {isTyping ? 'Typing...' : 'Online'}
                </div>
              </div>
            </div>
            <button 
              className={styles.closeBtn} 
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`${styles.messageWrapper} ${m.from === 'bot' ? styles.botWrapper : styles.userWrapper}`}
              >
                {m.from === 'bot' && (
                  <div className={styles.avatar}>
                    <Image src="/github_co.webp" alt="AI" width={20} height={20} />
                  </div>
                )}
                <div 
                  className={`${styles.message} ${
                    m.from === 'bot' ? styles.botMsg : styles.userMsg
                  } ${m.isError ? styles.errorMsg : ''}`}
                >
                  <div className={styles.messageText}>{m.text}</div>
                  <div className={styles.messageTime}>{m.timestamp}</div>
                </div>
                {m.from === 'user' && (
                  <div className={styles.avatar}>
                    <div className={styles.userAvatar}>You</div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className={`${styles.messageWrapper} ${styles.botWrapper}`}>
                <div className={styles.avatar}>
                  <Image src="/github_co.webp" alt="AI" width={20} height={20} />
                </div>
                <div className={`${styles.message} ${styles.botMsg} ${styles.typingIndicator}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me about Arpit..."
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              disabled={isTyping}
            />
            <button 
              className={`${styles.sendBtn} ${!input.trim() || isTyping ? styles.disabled : ''}`} 
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {error && (
            <div className={styles.errorBanner}>
              {error === 'Network error' ? 'Connection error. Please try again.' : 'Something went wrong. Please try again.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;

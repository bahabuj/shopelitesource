import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { faqData } from '../data/faq';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Welcome to Elite Source. I'm here to help you with any questions about our luxury fashion collection, shipping, returns, or anything else. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check if the message matches any FAQ
    const matchingFAQ = faqData.find(faq => 
      faq.question.toLowerCase().includes(message) ||
      message.includes(faq.question.toLowerCase().split(' ').slice(0, 3).join(' ')) ||
      faq.answer.toLowerCase().includes(message)
    );
    
    if (matchingFAQ) {
      return `${matchingFAQ.answer}\n\nWas this helpful? You can find more answers in our FAQ section or contact us via WhatsApp for personalized assistance.`;
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to Elite Source. I'm here to help you find the perfect luxury pieces. What can I assist you with today?";
    }
    
    // Product-related questions
    if (message.includes('product') || message.includes('item') || message.includes('clothing')) {
      return "We offer an exclusive collection of luxury fashion including women's wear, men's wear, kids' clothing, accessories, and shoes. All our pieces are carefully curated from prestigious fashion houses. You can browse by category or check our New Arrivals and Sale sections. Would you like me to help you find something specific?";
    }
    
    // Shipping questions
    if (message.includes('shipping') || message.includes('delivery') || message.includes('ship')) {
      return "We offer multiple shipping options:\n\n• Standard Delivery (5-7 days) - Free on orders over $500\n• Express Delivery (2-3 days) - $45\n• White Glove Delivery (Next day) - $95\n\nWe ship worldwide to over 100 countries. International shipping rates are calculated at checkout.";
    }
    
    // Returns and exchanges
    if (message.includes('return') || message.includes('exchange') || message.includes('refund')) {
      return "We offer a 30-day return policy for your complete satisfaction. Items must be in original condition with tags attached. We provide free return shipping labels and process refunds within 5-7 business days. Exchanges for size or color are also available. Would you like detailed return instructions?";
    }
    
    // Size guide
    if (message.includes('size') || message.includes('fit') || message.includes('measurement')) {
      return "We have detailed size guides for all our categories. You can find size charts for women's, men's, and kids' clothing in our Size Guide section. We also offer free exchanges if the size doesn't fit perfectly. Would you like me to direct you to our size guide?";
    }
    
    // Payment questions
    if (message.includes('payment') || message.includes('pay') || message.includes('card') || message.includes('checkout')) {
      return "We accept all major credit cards, PayPal, and other secure payment methods. All transactions are encrypted and secure. You can also contact us via WhatsApp to arrange alternative payment methods for international customers.";
    }
    
    // Contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('whatsapp') || message.includes('support')) {
      return "You can reach us through:\n\n• Email: elitesourceng@gmail.com\n• WhatsApp: +1 (713) 689-0528\n• Address: Houston, TX\n• Facebook: Elite Source Official\n• Instagram: @elitesourceng\n\nOur customer service team is available Monday-Friday 9AM-8PM, Saturday 10AM-6PM, Sunday 12PM-5PM (Central Time). We typically respond to WhatsApp messages within 1 hour and emails within 24 hours.";
    }
    
    // About the company
    if (message.includes('about') || message.includes('company') || message.includes('story')) {
      return "Elite Source is a luxury fashion boutique based in Houston, TX, dedicated to bringing you the world's most exclusive designer pieces. We curate our collection from prestigious fashion houses, ensuring authenticity and exceptional quality. Our mission is to provide discerning customers with access to luxury fashion while maintaining the exclusivity that defines true luxury.\n\nContact us at elitesourceng@gmail.com or via WhatsApp at +1 (713) 689-0528. You can learn more in our About section or check our customer reviews to see what others say about us!";
    }
    
    // FAQ related questions
    if (message.includes('faq') || message.includes('frequently') || message.includes('common questions')) {
      return "I can help answer common questions right here in the chat! We also have a comprehensive FAQ section with detailed answers about shipping, returns, sizing, payments, and more. What specific question can I help you with?";
    }
    
    // Reviews and testimonials
    if (message.includes('review') || message.includes('testimonial') || message.includes('feedback') || message.includes('customer') || message.includes('experience')) {
      return "Our customers love shopping with Elite Source! We have an average rating of 4.9/5 stars based on verified customer reviews. You can read detailed customer experiences and testimonials on our website. Our customers particularly praise our product quality, fast shipping, and excellent customer service.";
    }
    
    // Authenticity and quality
    if (message.includes('authentic') || message.includes('genuine') || message.includes('real') || message.includes('fake') || message.includes('quality')) {
      return "All our products are 100% authentic and sourced directly from authorized retailers and fashion houses. Every item comes with an authenticity certificate. We guarantee genuine luxury pieces and stand behind the quality of everything we sell. Your trust is our priority!";
    }
    
    // Website features
    if (message.includes('website') || message.includes('features') || message.includes('how to') || message.includes('navigate')) {
      return "Our website offers many features to enhance your shopping experience:\n\n• Browse by category (Women, Men, Kids, Accessories)\n• Save items to your wishlist\n• Detailed product pages with specifications\n• Size guides and care instructions\n• Secure checkout process\n• Order tracking\n• Customer reviews and ratings\n\nWhat specific feature would you like to know more about?";
    }
    
    // Pricing questions
    if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap')) {
      return "Our pieces range from accessible luxury to haute couture, with prices reflecting the quality and exclusivity of each item. We regularly offer promotions and sales on selected items. You can filter by price range or check our Sale section for discounted luxury pieces.";
    }
    
    // Authentication questions
    if (message.includes('account') || message.includes('login') || message.includes('register') || message.includes('sign')) {
      return "Creating an account is easy! Just click on the user icon and sign up with your email and password. With an account, you can save items to your wishlist, track orders, and enjoy a personalized shopping experience.";
    }
    
    // Categories
    if (message.includes('women') || message.includes('ladies')) {
      return "Our women's collection features elegant dresses, sophisticated blazers, luxury handbags, designer shoes, and exclusive accessories. Each piece is selected for its timeless appeal and exceptional craftsmanship.";
    }
    
    if (message.includes('men') || message.includes('gentleman')) {
      return "Our men's collection includes tailored suits, premium casual wear, luxury watches, leather goods, and sophisticated accessories. Perfect for the modern gentleman who appreciates quality and style.";
    }
    
    if (message.includes('kids') || message.includes('children')) {
      return "Our kids' collection offers luxury fashion for the little ones, featuring high-quality materials and age-appropriate designs that don't compromise on style or comfort.";
    }
    
    // Sale and promotions
    if (message.includes('sale') || message.includes('discount') || message.includes('promo') || message.includes('offer')) {
      return "Check our Sale section for amazing deals on luxury items! We regularly update our promotions with discounts up to 70% off on selected designer pieces. Sign up for our newsletter to be the first to know about exclusive sales.";
    }
    
    // Default response
    return "I'd be happy to help you with that! I can assist you with information about our products, shipping, returns, sizing, payments, website features, customer reviews, or anything else about Elite Source. You can also check our FAQ section for detailed answers or contact our team directly:\n\n• Email: elitesourceng@gmail.com\n• WhatsApp: +1 (713) 689-0528\n• Location: Houston, TX\n\nWhat specific information are you looking for?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-gold to-yellow-400 hover:from-yellow-400 hover:to-gold'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white mx-auto" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black mx-auto" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gold to-yellow-400 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="font-bold text-black">Elite Assistant</h3>
                <p className="text-xs text-black/70">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-black/70 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? 'bg-gold' : 'bg-gray-700'
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-4 h-4 text-black" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.isBot 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gold text-black'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isBot ? 'text-gray-400' : 'text-black/60'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-gray-800 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Elite Source..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gold text-black p-3 rounded-xl hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
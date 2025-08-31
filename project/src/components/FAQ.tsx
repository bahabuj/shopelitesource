import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { faqData } from '../data/faq';
import { FAQItem } from '../types';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General' },
    { id: 'shipping', name: 'Shipping' },
    { id: 'returns', name: 'Returns & Exchanges' },
    { id: 'sizing', name: 'Sizing' },
    { id: 'payment', name: 'Payment' },
    { id: 'account', name: 'Account' }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our luxury fashion collection and services
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gold text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-gray-400 mb-4">No questions found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or category filter</p>
              <div className="flex justify-center">
                <button className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-500 transition-all duration-300 flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Ask via WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-700 transition-colors duration-300"
                >
                  <h3 className="text-lg font-bold text-white pr-4">
                    {faq.question}
                  </h3>
                  {expandedItems.has(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedItems.has(faq.id) && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gray-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">
            Our customer service team is here to help with any additional questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/17136890528?text=Hello,%20I%20have%20a%20question%20about%20Elite%20Source"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-500 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Contact via WhatsApp</span>
            </a>
            <button className="border-2 border-gold text-gold font-bold px-6 py-3 rounded-xl hover:bg-gold hover:text-black transition-all duration-300">
              Use Chatbot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
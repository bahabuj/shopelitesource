import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Mail, MapPin, MessageCircle, Clock, Phone } from 'lucide-react';
import { InfoPageType } from '../types';

interface InfoPageProps {
  type: InfoPageType['type'];
  onBack: () => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ type, onBack }) => {
  const getPageContent = () => {
    switch (type) {
      case 'about':
        return {
          title: 'About Elite Source',
          content: (
            <div className="space-y-8">
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Elite Source was founded with a singular vision: to bring the world's most exclusive luxury fashion directly to discerning customers who appreciate exceptional quality and timeless elegance. Since our inception, we have curated an unparalleled collection of haute couture, designer ready-to-wear, and luxury accessories from the most prestigious fashion houses globally.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our commitment to excellence extends beyond our product selection. We believe that luxury shopping should be an experience that reflects the quality of the items we offer. Every piece in our collection is carefully selected by our team of fashion experts who understand the nuances of craftsmanship, design, and exclusivity.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To democratize access to luxury fashion while maintaining the exclusivity and prestige that defines true luxury. We bridge the gap between the world's most coveted fashion pieces and customers who value authenticity, quality, and exceptional service.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Why Choose Us</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                    <span>Authentic luxury pieces sourced directly from authorized retailers and fashion houses</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                    <span>Expert curation ensuring only the finest quality and most coveted designs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                    <span>Personalized shopping experience with dedicated customer service</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                    <span>Secure, white-glove delivery service for all purchases</span>
                  </li>
                </ul>
              </div>
            </div>
          )
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          content: (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Information We Collect</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, shipping address, payment information, and communication preferences.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We also automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, pages visited, and time spent on our site.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">How We Use Your Information</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Process and fulfill your orders</li>
                  <li>• Provide customer service and support</li>
                  <li>• Send you important updates about your orders</li>
                  <li>• Improve our website and services</li>
                  <li>• Protect against fraud and unauthorized access</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Data Security</h3>
                <p className="text-gray-300 leading-relaxed">
                  We implement industry-standard security measures to protect your personal information. All payment processing is handled through secure, encrypted channels, and we never store your complete payment information on our servers.
                </p>
              </div>
            </div>
          )
        };

      case 'terms':
        return {
          title: 'Terms of Service',
          content: (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Acceptance of Terms</h3>
                <p className="text-gray-300 leading-relaxed">
                  By accessing and using Shop Elite Source, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all visitors, users, and others who access or use the service.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Product Information</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  All products are subject to availability. We reserve the right to discontinue any product at any time without notice.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">User Accounts</h3>
                <p className="text-gray-300 leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </div>
            </div>
          )
        };

      case 'size-guide':
        return {
          title: 'Size Guide',
          content: (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Women's Clothing</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-700 rounded-lg">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-gold font-bold">Size</th>
                        <th className="px-4 py-3 text-left text-gold font-bold">Bust (inches)</th>
                        <th className="px-4 py-3 text-left text-gold font-bold">Waist (inches)</th>
                        <th className="px-4 py-3 text-left text-gold font-bold">Hips (inches)</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3">XS</td>
                        <td className="px-4 py-3">32-34</td>
                        <td className="px-4 py-3">24-26</td>
                        <td className="px-4 py-3">34-36</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3">S</td>
                        <td className="px-4 py-3">34-36</td>
                        <td className="px-4 py-3">26-28</td>
                        <td className="px-4 py-3">36-38</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3">M</td>
                        <td className="px-4 py-3">36-38</td>
                        <td className="px-4 py-3">28-30</td>
                        <td className="px-4 py-3">38-40</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3">L</td>
                        <td className="px-4 py-3">38-40</td>
                        <td className="px-4 py-3">30-32</td>
                        <td className="px-4 py-3">40-42</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Men's Clothing</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-700 rounded-lg">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-gold font-bold">Size</th>
                        <th className="px-4 py-3 text-left text-gold font-bold">Chest (inches)</th>
                        <th className="px-4 py-3 text-left text-gold font-bold">Waist (inches)</th>
                        <th className="px-4 py-3 text-left text-gold font-bold">Neck (inches)</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3">S</td>
                        <td className="px-4 py-3">34-36</td>
                        <td className="px-4 py-3">28-30</td>
                        <td className="px-4 py-3">14-14.5</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3">M</td>
                        <td className="px-4 py-3">38-40</td>
                        <td className="px-4 py-3">32-34</td>
                        <td className="px-4 py-3">15-15.5</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3">L</td>
                        <td className="px-4 py-3">42-44</td>
                        <td className="px-4 py-3">36-38</td>
                        <td className="px-4 py-3">16-16.5</td>
                      </tr>
                      <tr className="border-t border-gray-700">
                        <td className="px-4 py-3">XL</td>
                        <td className="px-4 py-3">46-48</td>
                        <td className="px-4 py-3">40-42</td>
                        <td className="px-4 py-3">17-17.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">How to Measure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div>
                    <h4 className="font-bold text-white mb-2">Chest/Bust</h4>
                    <p>Measure around the fullest part of your chest/bust, keeping the tape measure level.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Waist</h4>
                    <p>Measure around your natural waistline, keeping the tape measure comfortably loose.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Hips</h4>
                    <p>Measure around the fullest part of your hips, approximately 8 inches below your waist.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">Neck</h4>
                    <p>Measure around the base of your neck where a shirt collar would sit.</p>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      case 'shipping':
        return {
          title: 'Shipping Information',
          content: (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Shipping Options</h3>
                <div className="space-y-4">
                  <div className="border border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-white mb-2">Standard Delivery (5-7 Business Days)</h4>
                    <p className="text-gray-300">Free shipping on orders over $500. $25 for orders under $500.</p>
                  </div>
                  <div className="border border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-white mb-2">Express Delivery (2-3 Business Days)</h4>
                    <p className="text-gray-300">$45 for all orders. Available for most locations.</p>
                  </div>
                  <div className="border border-gray-700 rounded-lg p-4">
                    <h4 className="font-bold text-white mb-2">White Glove Delivery (Next Day)</h4>
                    <p className="text-gray-300">$95 for premium handling and next-day delivery. Available in select cities.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">International Shipping</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We ship worldwide to over 100 countries. International shipping rates are calculated at checkout based on destination and package weight. Delivery times vary by location but typically range from 7-14 business days.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Please note that international customers may be responsible for customs duties and taxes imposed by their country's customs authority.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Order Processing</h3>
                <p className="text-gray-300 leading-relaxed">
                  Orders are processed Monday through Friday, excluding holidays. Orders placed after 2 PM EST will be processed the next business day. You will receive a confirmation email once your order has been shipped with tracking information.
                </p>
              </div>
            </div>
          )
        };

      case 'returns':
        return {
          title: 'Returns & Exchanges',
          content: (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Return Policy</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We want you to be completely satisfied with your purchase. If for any reason you're not happy with your item, you may return it within 30 days of delivery for a full refund or exchange.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Items must be in their original condition with all tags attached and in the original packaging. Custom or personalized items cannot be returned unless defective.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">How to Return</h3>
                <ol className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span>Contact our customer service team to initiate a return</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span>Receive your prepaid return shipping label via email</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span>Package your item securely in the original packaging</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-gold text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span>Drop off at any authorized shipping location</span>
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Exchanges</h3>
                <p className="text-gray-300 leading-relaxed">
                  We offer free exchanges for size or color within 30 days of delivery. The exchange item must be of equal or lesser value. If the new item costs more, you'll be charged the difference.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gold mb-4">Refund Processing</h3>
                <p className="text-gray-300 leading-relaxed">
                  Once we receive your returned item, we'll inspect it and process your refund within 5-7 business days. Refunds will be credited to your original payment method.
                </p>
              </div>
            </div>
          )
        };

      case 'faq':
        return {
          title: 'Frequently Asked Questions',
          content: (
            <div className="space-y-8">
              <p className="text-gray-300 leading-relaxed">
                Find answers to the most common questions about Elite Source, our products, and services. 
                If you can't find what you're looking for, our chatbot and customer service team are here to help.
              </p>
              <div className="bg-gray-800 rounded-xl p-6">
                <p className="text-center text-gray-400">
                  For the complete FAQ experience with search and filtering, 
                  please visit our main FAQ section from the homepage.
                </p>
              </div>
            </div>
          )
        };

      case 'contact':
        return {
          title: 'Contact Us',
          content: (
            <div className="space-y-8">
              <div>
                <p className="text-gray-300 leading-relaxed mb-8">
                  We're here to help you with any questions about our luxury fashion collection, 
                  orders, or services. Our dedicated customer service team is committed to providing 
                  you with exceptional support.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Email Us</h3>
                      <p className="text-gray-400">Send us a message anytime</p>
                    </div>
                  </div>
                  <a 
                    href="mailto:elitesourceng@gmail.com"
                    className="text-gold hover:text-yellow-400 transition-colors font-medium"
                  >
                    elitesourceng@gmail.com
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">WhatsApp</h3>
                      <p className="text-gray-400">Quick responses & support</p>
                    </div>
                  </div>
                  <a 
                    href="https://wa.me/17136890528?text=Hello,%20I%20want%20to%20contact%20Elite%20Source"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors font-medium"
                  >
                    +1 (713) 689-0528
                  </a>
                </div>

                {/* Address */}
                <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Visit Us</h3>
                      <p className="text-gray-400">Our location</p>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    Houston, TX<br />
                    United States
                  </p>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Business Hours</h3>
                      <p className="text-gray-400">When we're available</p>
                    </div>
                  </div>
                  <div className="text-gray-300 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                    <p>Sunday: 12:00 PM - 5:00 PM</p>
                    <p className="text-sm text-gray-400 mt-2">Central Time (CT)</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Form */}
              <div className="bg-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent">
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="order">Order Support</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="return">Return/Exchange</option>
                      <option value="sizing">Sizing Help</option>
                      <option value="partnership">Partnership Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>

              {/* Social Media */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                <div className="flex justify-center space-x-6">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61579619709075" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/elitesourceng/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://wa.me/17136890528?text=Hello,%20I%20want%20to%20contact%20Elite%20Source"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-500 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="mailto:elitesourceng@gmail.com?subject=Elite Source Inquiry"
                  className="bg-gold text-black font-bold py-4 px-6 rounded-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>SEND EMAIL</span>
                </a>
                <a
                  href="https://wa.me/17136890528?text=Hello,%20I%20have%20a%20question%20about%20Elite%20Source"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-500 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Customer Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                  <div>
                    <h4 className="font-bold text-white mb-2">Response Times</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• WhatsApp: Usually within 1 hour</li>
                      <li>• Email: Within 24 hours</li>
                      <li>• Contact Form: Within 24 hours</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-2">We Can Help With</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Product information and sizing</li>
                      <li>• Order status and tracking</li>
                      <li>• Returns and exchanges</li>
                      <li>• Personal styling advice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      default:
        return {
          title: 'Information',
          content: <p className="text-gray-300">Content not available.</p>
        };
    }
  };

  const { title, content } = getPageContent();

  return (
    <div className="pt-20 min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-white mb-8 tracking-wide">
            {title}
          </h1>
          {content}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
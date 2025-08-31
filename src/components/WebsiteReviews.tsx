import React from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { websiteReviews } from '../data/websiteReviews';

const WebsiteReviews: React.FC = () => {
  const averageRating = websiteReviews.reduce((acc, review) => acc + review.rating, 0) / websiteReviews.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-wider">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Real experiences from our valued customers who trust Elite Source for their luxury fashion needs
          </p>
          
          {/* Overall Rating */}
          <div className="bg-gray-900 rounded-xl p-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">
                {averageRating.toFixed(1)} / 5.0
              </div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating) ? 'fill-gold text-gold' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Based on {websiteReviews.length} verified customer reviews
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websiteReviews.map((review) => (
            <div key={review.id} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'fill-gold text-gold' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                {review.verified && (
                  <div className="flex items-center space-x-1 bg-green-600/20 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs font-bold">VERIFIED</span>
                  </div>
                )}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                "{review.comment}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div>
                  <p className="font-bold text-white text-sm">{review.customerName}</p>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{review.location}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-6">
            Join thousands of satisfied customers who trust Elite Source for luxury fashion
          </p>
          <button className="bg-gold text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
            START SHOPPING NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default WebsiteReviews;
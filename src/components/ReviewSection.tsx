import React, { useState } from 'react';
import { Review } from '../types';
import { Star, User, ThumbsUp, MessageSquare } from 'lucide-react';

interface ReviewSectionProps {
  reviews: Review[];
  productId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, productId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log('New review:', { ...newReview, productId });
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '', userName: '' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="border-t border-gray-800 pt-12">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-white mb-6">CUSTOMER REVIEWS</h3>
        
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Rating Summary */}
            <div className="bg-gray-900 rounded-xl p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gold mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating) ? 'fill-gold text-gold' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="lg:col-span-2 bg-gray-900 rounded-xl p-6">
              <h4 className="font-bold text-white mb-4">Rating Breakdown</h4>
              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-400 w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gold h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-900 rounded-xl mb-8">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-400 mb-2">No Reviews Yet</h4>
            <p className="text-gray-500">Be the first to review this product</p>
          </div>
        )}

        {/* Write Review Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-gold text-black font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 transition-all duration-300"
          >
            {showReviewForm ? 'CANCEL REVIEW' : 'WRITE A REVIEW'}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-gray-900 rounded-xl p-6 mb-8">
            <h4 className="text-xl font-bold text-white mb-6">Write Your Review</h4>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={newReview.userName}
                  onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rating *
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          rating <= newReview.rating
                            ? 'fill-gold text-gold'
                            : 'text-gray-600 hover:text-gold'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-gold text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-all duration-300"
                >
                  SUBMIT REVIEW
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="border border-gray-600 text-gray-300 font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">{review.userName}</h5>
                      <div className="flex items-center space-x-2">
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
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                            VERIFIED PURCHASE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">
                  {review.comment}
                </p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-gold transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
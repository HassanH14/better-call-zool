// src/components/ReviewForm.js
import React, { useState, useContext } from 'react';
import { reviewAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    setLoading(true);
    try {
      await reviewAPI.create({
        product_id: productId,
        rating,
        comment
      });
      
      alert('Review submitted successfully!');
      setRating(5);
      setComment('');
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="review-form-container">
        <p className="login-prompt">Please login to leave a review</p>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label>Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
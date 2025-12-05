// src/pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, reviewAPI } from '../services/api';
import ReviewForm from '../components/ReviewForm';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductAndReviews();
  }, [id]);

  const fetchProductAndReviews = async () => {
    try {
      const [productRes, reviewsRes] = await Promise.all([
        productAPI.getById(id),
        reviewAPI.getByProduct(id)
      ]);
      setProduct(productRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Product not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.product_id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        product_id: product.id,
        product_name: product.product_name,
        price: product.price,
        image_url: product.image_url,
        quantity
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert('Added to cart!');
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Products
      </button>

      <div className="product-detail-grid">
        <div className="product-image-section">
          {product.image_url ? (
            <img src={product.image_url} alt={product.product_name} />
          ) : (
            <div className="no-image-large">📦</div>
          )}
        </div>

        <div className="product-info-section">
          <span className="product-category-badge">{product.category}</span>
          <h1>{product.product_name}</h1>
          <p className="product-description-full">{product.product_description}</p>
          
          <div className="rating-summary">
            <span className="stars">{'⭐'.repeat(Math.round(calculateAverageRating()))}</span>
            <span className="rating-text">
              {calculateAverageRating()} ({reviews.length} reviews)
            </span>
          </div>

          <div className="price-section">
            <span className="price-large">${parseFloat(product.price).toFixed(2)}</span>
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
          </div>

          <button className="add-to-cart-btn-large" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>
        
        <ReviewForm 
          productId={product.id} 
          onReviewSubmitted={fetchProductAndReviews} 
        />

        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">👤 {review.user_name}</span>
                  <span className="review-stars">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="review-comment">{review.comment}</p>
                <span className="review-date">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
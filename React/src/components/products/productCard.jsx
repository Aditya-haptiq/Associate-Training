import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';

// fallback image for failed product image
const defaultFallbackImage = 'https://images-cdn.ubuy.co.in/667f714856d45d782b06ce5e-style-men-coat-business-men-39-s.jpg';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const [imageSrc, setImageSrc] = useState(product.image || defaultFallbackImage);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ product, size: 'M', quantity: 1 }));
    setFeedbackMessage(`${product.title} added to cart`);
    setTimeout(() => setFeedbackMessage(null), 2000);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      setFeedbackMessage(`${product.title} removed from wishlist`);
    } else {
      dispatch(addToWishlist(product));
      setFeedbackMessage(`${product.title} added to wishlist`);
    }
    setTimeout(() => setFeedbackMessage(null), 2000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="card group overflow-hidden animate-fade-in">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={imageSrc}
            alt={product.title}
            className="w-full h-64 object-cover"
            onError={() => setImageSrc(defaultFallbackImage)}
          />

          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
            <button
              onClick={handleAddToCart}
              className="bg-white text-gray-800 p-3 rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-200 transform hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`p-3 rounded-full transition-colors duration-200 transform hover:scale-110 ${
                isInWishlist
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-gray-800 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 capitalize">{product.category}</span>
            <div className="flex items-center space-x-1">
              {renderStars(product.rating.rate)}
              <span className="text-sm text-gray-500 ml-1">({product.rating.count})</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
            {product.title}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">${product.price}</span>
            <div className="flex items-center space-x-2">
              {product.sizes &&
                product.sizes.slice(0, 3).map((size) => (
                  <span
                    key={size}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                  >
                    {size}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </Link>

      {feedbackMessage && (
        <div className="mt-2 text-sm text-green-600 text-center transition-opacity duration-300">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default ProductCard;

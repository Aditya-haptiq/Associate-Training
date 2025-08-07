import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { Heart, ShoppingCart, Star, Minus, Plus, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const products = useSelector(state => state.products.items);
  const wishlistItems = useSelector(state => state.wishlist.items);

  const product = products.find(p => p.id === parseInt(id));
  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  useEffect(() => {
    if (product && product.image) {
      setSelectedImage(0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ product, size: selectedSize, quantity }));
    setSuccessMessage("Added to cart!");
    setTimeout(() => setSuccessMessage(""), 2500); // auto-clear in 2.5s
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

        <button onClick={() => navigate(-1)} className="flex items-center space-x-2 text-gray-600 mb-4">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to product</span>
        </button>

        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

            {/* Product Image */}
            <div className='p-8'>
              <div className='bg-gray-100 rounded-lg overflow-hidden mb-4'>
                <img src={product.image} alt={product.title} className='w-full h-full object-contain' />
              </div>
            </div>

            {/* Product Info */}
            <div className='p-8'>
              <span className='text-sm text-primary-600 font-medium uppercase'>{product.category}</span>
              <h1 className='text-3xl font-bold text-gray-800 mt-2 mb-4'>{product.title}</h1>

              <div className='mb-6'>
                <span className='text-4xl font-bold text-primary-600'>${product.price}</span>
              </div>

              <p className='text-gray-600 mb-8'>{product.description}</p>

              {/* Size selection */}
              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>Size</h3>
                <div className='flex space-x-3'>
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition-colors duration-200 ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-500 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-primary-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-3'>Quantity</h3>
                <div className='flex items-center space-x-4'>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className='p-2 border rounded-lg'>
                    <Minus className='w-4 h-4' />
                  </button>
                  <span className='text-lg font-medium'>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className='p-2 border rounded-lg'>
                    <Plus className='w-4 h-4' />
                  </button>
                </div>
              </div>

              {/* Inline Feedback */}
              {successMessage && (
                <div className="mb-4 text-green-600 font-medium bg-green-100 px-4 py-2 rounded-lg">
                  {successMessage}
                </div>
              )}

              {/* Buttons */}
              <div className='flex space-x-4'>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg bg-gray-900"
                >
                  <ShoppingCart className='w-5 h-5 text-white' />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleWishlistToggle}  
                  className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                    isInWishlist
                      ? 'border-red-500 bg-red-500 text-white hover:bg-red-600'
                      : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                  }`} 
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

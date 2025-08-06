import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, size: 'M', quantity: 1 }));
    dispatch(removeFromWishlist(product.id));
  };



  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Save items you love so you can find them easily later.
            </p>
            <Link
              to="/products"
              className="btn-primary text-lg px-8 py-3"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
              <p className="text-gray-600 mt-2">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
              </p>
            </div>
            <Link
              to="/products"
              className="btn-secondary"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="card group overflow-hidden">
              <Link to={`/products/${item.id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleMoveToCart(item);
                        }}
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-primary-500 hover:text-white transition-colors duration-200 transform hover:scale-110"
                        title="Move to Cart"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveFromWishlist(item.id);
                        }}
                        className="bg-white text-gray-800 p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200 transform hover:scale-110"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                 
                </div>
              </Link>

              <div className="p-6 h-auto w-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                 
                </div>
                
                <Link to={`/products/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2 hover:text-primary-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    ${item.price}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    disabled={!item.inStock}
                    className="flex-1 bg-gray-900  py-2 px-4 rounded-lg font-medium  flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">Add to Cart</span>
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
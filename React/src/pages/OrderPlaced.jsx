import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 animate-fade-in-up">
        {/* Animated Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and is being processed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-primary-600 text-white font-semibold py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/products')}
            className="w-full border border-primary-600 text-primary-600 font-semibold py-3 rounded-lg hover:bg-primary-50 transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;

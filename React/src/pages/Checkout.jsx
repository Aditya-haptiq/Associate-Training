
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';
import { setShippingInfo, setPaymentInfo } from '../store/slices/checkoutSlice';
import { CreditCard, MapPin, Lock, Smartphone, IndianRupee } from 'lucide-react';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
    walletNumber: '',
  });

  const [selectedPayment, setSelectedPayment] = useState('card');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <Lock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please sign in to checkout</h2>
          <button
            onClick={() => navigate('/auth')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const shippingFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
    const upiFields = ['upiId'];
    const walletFields = ['walletNumber'];

    shippingFields.forEach(field => {
      if (!formData[field]) newErrors[field] = 'This field is required';
    });

    if (selectedPayment === 'card') {
      cardFields.forEach(field => {
        if (!formData[field]) newErrors[field] = 'Required';
      });
    } else if (selectedPayment === 'upi') {
      upiFields.forEach(field => {
        if (!formData[field]) newErrors[field] = 'Required';
      });
    } else if (selectedPayment === 'wallet') {
      walletFields.forEach(field => {
        if (!formData[field]) newErrors[field] = 'Required';
      });
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsProcessing(true);
    dispatch(setShippingInfo({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country
    }));
    dispatch(setPaymentInfo({
      method: selectedPayment,
      data:
        selectedPayment === 'card'
          ? {
              cardNumber: formData.cardNumber,
              expiryDate: formData.expiryDate,
              cvv: formData.cvv,
              cardName: formData.cardName,
            }
          : selectedPayment === 'upi'
          ? { upiId: formData.upiId }
          : { walletNumber: formData.walletNumber }
    }));

    setTimeout(() => {
      dispatch(clearCart());
      setIsProcessing(false);
      alert('Order placed successfully!');
      navigate('/OrderPlaced');
    }, 2000);
  };

  const inputClass = (error) =>
    `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      error ? 'border-red-500' : 'border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Shipping and Payment Sections */}
        <div className="lg:col-span-2 space-y-10">
         {/* Shipping Info */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="text-blue-500 w-6 h-6" />
              <h2 className="text-2xl font-semibold text-gray-800">Shipping Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'].map(field => (
                <div key={field} className={field === 'address' ? 'md:col-span-2' : ''}>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    className={inputClass(errors[field])}
                  />
                  {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="text-blue-500 w-6 h-6" />
              <h2 className="text-2xl font-semibold text-gray-800">Payment Information</h2>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 px-4 py-2 border rounded-md ${
                  selectedPayment === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setSelectedPayment('card')}
              >
                <CreditCard className="inline-block mr-2" /> Card
              </button>
              <button
                className={`flex-1 px-4 py-2 border rounded-md ${
                  selectedPayment === 'upi' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setSelectedPayment('upi')}
              >
                <IndianRupee className="inline-block mr-2" /> UPI
              </button>
              <button
                className={`flex-1 px-4 py-2 border rounded-md ${
                  selectedPayment === 'wallet' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setSelectedPayment('wallet')}
              >
                <Smartphone className="inline-block mr-2" /> Wallet
              </button>
            </div>

            {selectedPayment === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['cardNumber', 'expiryDate', 'cvv', 'cardName'].map(field => (
                  <div key={field} className={field === 'cardName' ? 'md:col-span-2' : ''}>
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      placeholder={field.replace(/([A-Z])/g, ' $1')}
                      className={inputClass(errors[field])}
                    />
                    {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>
            )}

            {selectedPayment === 'upi' && (
              <div>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="Enter your UPI ID"
                  className={inputClass(errors.upiId)}
                />
                {errors.upiId && <p className="text-sm text-red-500 mt-1">{errors.upiId}</p>}
              </div>
            )}

            {selectedPayment === 'wallet' && (
              <div>
                <input
                  type="text"
                  name="walletNumber"
                  value={formData.walletNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Wallet Phone Number"
                  className={inputClass(errors.walletNumber)}
                />
                {errors.walletNumber && <p className="text-sm text-red-500 mt-1">{errors.walletNumber}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-xl shadow-lg lg:sticky top-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
          <div className="divide-y divide-gray-200 space-y-4">
            {cartItems.map(item => (
              <div key={item.cartId} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
                  <div>
                    <h3 className="text-gray-800 font-medium line-clamp-2 text-sm">{item.title}</h3>
                    <p className="text-gray-500 text-xs">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">Your payment is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

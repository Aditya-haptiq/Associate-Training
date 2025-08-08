import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/slices/ProductSlice';
import ProductCard from '../components/products/productCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ShoppingBag, Truck, Shield, RefreshCw } from 'lucide-react';

// Importing images properly
import heroImg from '../assets/hero.jpg';
import zaraImg from '../assets/zara.jpg';
import leviImg from '../assets/levi.png';
import peImg from '../assets/pe.png';
import hmImg from '../assets/hm.png';
import char1 from '../assets/character1.jpg';
import char2 from '../assets/character2.jpg';
import char3 from '../assets/character3.jpg';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(state => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const featuredProducts = products.slice(0, 6);

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-primary-500" />,
      title: "Free Shipping",
      description: "Free shipping on orders over $50"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-500" />,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-primary-500" />,
      title: "Easy Returns",
      description: "30-day return policy"
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-primary-500" />,
      title: "Quality Products",
      description: "Premium quality clothing"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Discover Your Style with Confidence
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              Premium fashion curated for the modern individual—quality, sustainability, and elegance in every piece.
            </p>
            <div className="space-x-4">
              <Link to="/products" className="btn-primary-lg">Shop Now</Link>
              <Link to="/about" className="btn-secondary-lg">Learn More</Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img src={heroImg} alt="Fashionable styles" className="w-full max-w-md rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Shop With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-indigo-100 p-3 rounded-full">{feature.icon}</div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Trusted by Leading Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src={zaraImg} alt="Zara" className="h-15 grayscale hover:grayscale-0 transition duration-300" />
            <img src={leviImg} alt="Levi's" className="h-15 grayscale hover:grayscale-0 transition duration-300" />
            <img src={peImg} alt="Peter England" className="h-15 grayscale hover:grayscale-0 transition duration-300" />
            <img src={hmImg} alt="H&M" className="h-15 grayscale hover:grayscale-0 transition duration-300" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Discover our handpicked selection of trending items</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center">
                <Link to="/products" className="btn-primary text-lg px-8 py-3">View All Products</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Customers Are Saying</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                name: 'Aarav Mehta',
                role: 'Mumbai, India',
                image: char1,
                feedback: 'The fabric and fit are just amazing. Looks premium and feels great to wear.',
              },
              {
                name: 'Naina Sharma',
                role: 'Delhi, India',
                image: char2,
                feedback: 'Customer service was super responsive. Got my issue resolved in a day!',
              },
              {
                name: 'Kabir Gupta',
                role: 'Bangalore, India',
                image: char3,
                feedback: 'I’ve ordered 3 times already. Quality is consistent, and shipping is fast.',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 mx-auto mb-4 rounded-full object-cover ring-2 ring-indigo-500"
                />
                <p className="text-gray-600 italic mb-6">“{t.feedback}”</p>
                <h4 className="font-semibold text-gray-800 text-lg">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Ahead of the Fashion Curve</h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join 10,000+ others to get exclusive style tips, trend alerts, and special offers.
          </p>
          <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              type="submit"
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Subscribe
            </button>
          </form>
          <p className="text-indigo-200 text-sm mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

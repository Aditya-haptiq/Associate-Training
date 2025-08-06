import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/ProductSlice';
import ProductCard from '../components/products/productCard';
import ProductFilters from '../components/products/productFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Products = () => {
  const dispatch = useDispatch();
  const { filteredItems: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 mb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Explore Our Latest Collection</h1>
          <p className="text-lg text-white/90">
            Shop premium quality clothing designed for comfort, style, and confidence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Products</h2>
          <p className="text-gray-600">
            Discover the full range of premium apparel made with love.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <ProductFilters />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Products */}
        {products.length === 0 && !loading && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more items.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

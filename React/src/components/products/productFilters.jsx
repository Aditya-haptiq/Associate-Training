import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setFilterBy, resetFilters } from '../../store/slices/ProductSlice';
import { Filter, SortAsc } from 'lucide-react';

const ProductFilters = () => {
  const dispatch = useDispatch();
  const { sortBy, filterBy } = useSelector(state => state.products);

  const handleSortChange = (value) => {
    dispatch(setSortBy(value));
  };

  const handleFilterChange = (key, value) => {
    dispatch(setFilterBy({ [key]: value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Sort Options */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <SortAsc className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
          </div>
          
          {/* Category Filter */}
          <select
            value={filterBy.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
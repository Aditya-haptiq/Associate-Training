import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ✅ Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response1 = await fetch("https://fakestoreapi.com/products");
    const menClothing = await response1.json();

    const response2 = await fetch("https://fakestoreapi.com/products/category/women%27s%20clothing");
    const womenClothing = await response2.json();

    
    const isValidImage = (url) => {
      return typeof url === 'string' && url.startsWith('https://');
    };

    const fallbackImage = (category) => {
      if (category === "men's clothing") return 'https://picsum.photos/seed/mens/300/300';
      if (category === "women's clothing") return 'https://picsum.photos/seed/womens/300/300';
      return 'https://picsum.photos/300/300';
    };

    // ✅ Enhance products with extra fields and safe image
    const enhancedProducts = [...menClothing, ...womenClothing].map(product => ({
      ...product,
      image: isValidImage(product.image) ? product.image : fallbackImage(product.category),
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Gray', 'Navy'],
      rating: {
        rate: product.rating?.rate || 4,
        count: product.rating?.count || 100
      }
    }));

    return enhancedProducts;
  }
);

// ✅ Initial state
const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  sortBy: 'default',
  filterBy: {
    category: 'all',
    priceRange: [0, 1000],
    inStock: false
  }
};

// ✅ Filters & Sorting helper
const applyFiltersAndSort = (items, filters, sortBy) => {
  let filtered = [...items];

  // Category filter
  if (filters.category !== 'all') {
    filtered = filtered.filter(item => item.category === filters.category);
  }

  // Price range filter
  filtered = filtered.filter(
    item => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]
  );

  // Sorting
  switch (sortBy) {
    case 'price-low-high':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case 'name':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return filtered;
};

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFiltersAndSort(state.items, state.filterBy, action.payload);
    },
    setFilterBy: (state, action) => {
      state.filterBy = { ...state.filterBy, ...action.payload };
      state.filteredItems = applyFiltersAndSort(state.items, state.filterBy, state.sortBy);
    },
    resetFilters: (state) => {
      state.sortBy = 'default';
      state.filterBy = {
        category: 'all',
        priceRange: [0, 1000],
        inStock: false
      };
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setFilterBy, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;

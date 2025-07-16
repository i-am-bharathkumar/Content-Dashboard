import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ContentItem {
  id: string;
  type: 'news' | 'movie' | 'social';
  title: string;
  description: string;
  image: string;
  url?: string;
  publishedAt: string;
  source: string;
  category?: string;
}

interface ContentState {
  items: ContentItem[];
  trending: ContentItem[];
  filteredItems: ContentItem[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  activeFilter: 'all' | 'news' | 'movie' | 'social';
  page: number;
  hasMore: boolean;
}

const initialState: ContentState = {
  items: [],
  trending: [],
  filteredItems: [],
  loading: false,
  error: null,
  searchQuery: '',
  activeFilter: 'all',
  page: 1,
  hasMore: true
};

// Mock API functions
const fetchNewsData = async (categories: string[], page: number = 1) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockNews: ContentItem[] = [
    {
      id: 'news-1',
      type: 'news',
      title: 'Breaking: New AI Technology Revolutionizes Healthcare',
      description: 'Scientists have developed a groundbreaking AI system that can diagnose diseases with 99% accuracy.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'TechNews',
      category: 'technology'
    },
    {
      id: 'news-2',
      type: 'news',
      title: 'Stock Market Reaches New Heights',
      description: 'Major indices hit record highs as investors remain optimistic about economic growth.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'FinanceDaily',
      category: 'business'
    },
    {
      id: 'news-3',
      type: 'news',
      title: 'Climate Summit Announces New Green Initiatives',
      description: 'World leaders commit to ambitious climate goals and sustainable development practices.',
      image: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'EcoNews',
      category: 'environment'
    }
  ];
  
  return mockNews;
};

const fetchMovieData = async (page: number = 1) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const mockMovies: ContentItem[] = [
    {
      id: 'movie-1',
      type: 'movie',
      title: 'The Future Chronicles',
      description: 'A sci-fi thriller about time travel and parallel universes.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'MovieDB'
    },
    {
      id: 'movie-2',
      type: 'movie',
      title: 'Ocean Adventures',
      description: 'An underwater documentary exploring marine life.',
      image: 'https://images.pexels.com/photos/1300510/pexels-photo-1300510.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'MovieDB'
    }
  ];
  
  return mockMovies;
};

const fetchSocialData = async (page: number = 1) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const mockSocial: ContentItem[] = [
    {
      id: 'social-1',
      type: 'social',
      title: 'Amazing sunset from my balcony! 🌅',
      description: 'Beautiful colors painting the sky tonight. Nature never fails to amaze me.',
      image: 'https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'SocialHub'
    },
    {
      id: 'social-2',
      type: 'social',
      title: 'Just finished my morning workout! 💪',
      description: 'Feeling energized and ready to tackle the day. Consistency is key!',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400',
      url: '#',
      publishedAt: new Date().toISOString(),
      source: 'SocialHub'
    }
  ];
  
  return mockSocial;
};

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async ({ categories, page }: { categories: string[], page: number }) => {
    const [news, movies, social] = await Promise.all([
      fetchNewsData(categories, page),
      fetchMovieData(page),
      fetchSocialData(page)
    ]);
    
    return [...news, ...movies, ...social];
  }
);

export const fetchTrending = createAsyncThunk(
  'content/fetchTrending',
  async () => {
    const trending = await fetchNewsData(['trending'], 1);
    return trending.slice(0, 5);
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredItems = state.items.filter(item =>
        item.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        item.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setActiveFilter: (state, action: PayloadAction<'all' | 'news' | 'movie' | 'social'>) => {
      state.activeFilter = action.payload;
      state.filteredItems = action.payload === 'all' 
        ? state.items 
        : state.items.filter(item => item.type === action.payload);
    },
    reorderItems: (state, action: PayloadAction<{ fromIndex: number, toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      const items = [...state.filteredItems];
      const [reorderedItem] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, reorderedItem);
      state.filteredItems = items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        if (state.page === 1) {
          state.items = action.payload;
        } else {
          state.items = [...state.items, ...action.payload];
        }
        state.filteredItems = state.activeFilter === 'all' 
          ? state.items 
          : state.items.filter(item => item.type === state.activeFilter);
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch content';
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending = action.payload;
      });
  }
});

export const { setSearchQuery, setActiveFilter, reorderItems } = contentSlice.actions;
export default contentSlice.reducer;
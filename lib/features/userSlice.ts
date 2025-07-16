import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferences {
  categories: string[];
  language: string;
  country: string;
}

interface UserState {
  preferences: UserPreferences;
  theme: 'light' | 'dark';
  favorites: string[];
  isSettingsOpen: boolean;
}

const initialState: UserState = {
  preferences: {
    categories: ['technology', 'business', 'entertainment'],
    language: 'en',
    country: 'us'
  },
  theme: 'light',
  favorites: [],
  isSettingsOpen: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPreferences: (state, action: PayloadAction<UserPreferences>) => {
      state.preferences = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    toggleSettings: (state) => {
      state.isSettingsOpen = !state.isSettingsOpen;
    }
  }
});

export const { setPreferences, toggleTheme, addFavorite, removeFavorite, toggleSettings } = userSlice.actions;
export default userSlice.reducer;
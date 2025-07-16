import userReducer, { 
  setPreferences, 
  toggleTheme, 
  addFavorite, 
  removeFavorite 
} from '@/lib/features/userSlice';

describe('userSlice', () => {
  const initialState = {
    preferences: {
      categories: ['technology', 'business'],
      language: 'en',
      country: 'us'
    },
    theme: 'light' as const,
    favorites: [],
    isSettingsOpen: false
  };

  it('should handle theme toggle', () => {
    const newState = userReducer(initialState, toggleTheme());
    expect(newState.theme).toBe('dark');
    
    const toggledAgain = userReducer(newState, toggleTheme());
    expect(toggledAgain.theme).toBe('light');
  });

  it('should handle adding favorites', () => {
    const newState = userReducer(initialState, addFavorite('test-item-1'));
    expect(newState.favorites).toContain('test-item-1');
  });

  it('should handle removing favorites', () => {
    const stateWithFavorite = {
      ...initialState,
      favorites: ['test-item-1', 'test-item-2']
    };
    
    const newState = userReducer(stateWithFavorite, removeFavorite('test-item-1'));
    expect(newState.favorites).not.toContain('test-item-1');
    expect(newState.favorites).toContain('test-item-2');
  });

  it('should handle setting preferences', () => {
    const newPreferences = {
      categories: ['sports', 'entertainment'],
      language: 'es',
      country: 'es'
    };
    
    const newState = userReducer(initialState, setPreferences(newPreferences));
    expect(newState.preferences).toEqual(newPreferences);
  });
});
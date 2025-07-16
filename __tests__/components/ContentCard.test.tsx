import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ContentCard from '@/components/dashboard/ContentCard';
import userReducer from '@/lib/features/userSlice';
import { ContentItem } from '@/lib/features/contentSlice';

const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

const mockItem: ContentItem = {
  id: 'test-1',
  type: 'news',
  title: 'Test News Article',
  description: 'This is a test news article description',
  image: 'https://example.com/image.jpg',
  url: 'https://example.com/article',
  publishedAt: new Date().toISOString(),
  source: 'Test Source',
  category: 'technology'
};

const renderWithProvider = (component: React.ReactNode) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

describe('ContentCard', () => {
  it('renders content card with correct information', () => {
    renderWithProvider(<ContentCard item={mockItem} index={0} />);
    
    expect(screen.getByText('Test News Article')).toBeInTheDocument();
    expect(screen.getByText('This is a test news article description')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('news')).toBeInTheDocument();
  });

  it('handles favorite toggle correctly', () => {
    renderWithProvider(<ContentCard item={mockItem} index={0} />);
    
    const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(favoriteButton);
    
    // Test that the favorite state changes
    expect(favoriteButton).toHaveClass('bg-red-500');
  });

  it('displays correct type badge color', () => {
    renderWithProvider(<ContentCard item={mockItem} index={0} />);
    
    const typeBadge = screen.getByText('news');
    expect(typeBadge).toHaveClass('bg-blue-100');
  });
});
# Personalized Content Dashboard

A modern, responsive dashboard for aggregating and managing personalized content from multiple sources including news, movie recommendations, and social media posts.

## 🚀 Features

### Core Features
- **Personalized Content Feed**: Aggregates content from news, movies, and social media based on user preferences
- **Interactive Drag & Drop**: Reorder content cards using smooth drag-and-drop functionality
- **Advanced Search**: Debounced search across all content types with real-time filtering
- **Smart Filtering**: Filter content by type (news, movies, social) with instant updates
- **Favorites System**: Save and manage favorite content items
- **Infinite Scrolling**: Efficient content loading with intersection observer
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### UI/UX Features
- **Dark Mode**: Seamless theme switching with system preference detection
- **Glassmorphism Design**: Modern backdrop-blur effects and translucent surfaces
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Loading States**: Skeleton screens and progressive loading indicators
- **Empty States**: Helpful messaging when no content is available

### Technical Features
- **Redux Toolkit**: Comprehensive state management with persistence
- **TypeScript**: Full type safety across the application
- **Performance Optimized**: Memoized components and efficient re-renders
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Testing**: Unit tests for components and Redux slices

## 🛠️ Technology Stack

- **Framework**: Next.js 13+ with App Router
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS with CSS Variables
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit/core
- **Testing**: Jest + React Testing Library
- **Type Safety**: TypeScript
- **Icons**: Lucide React

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main dashboard page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── Header.tsx     # Top navigation header
│   │   ├── Sidebar.tsx    # Left navigation sidebar
│   │   ├── ContentCard.tsx # Individual content item card
│   │   ├── ContentGrid.tsx # Main content grid with drag-drop
│   │   ├── SortableCard.tsx # Drag-and-drop wrapper component
│   │   ├── SettingsPanel.tsx # User preferences panel
│   │   └── TrendingSection.tsx # Trending content section
│   └── providers/         # Context providers
│       ├── StoreProvider.tsx # Redux store provider
│       └── ThemeProvider.tsx # Theme management provider
├── lib/                   # Utility functions and configurations
│   ├── features/          # Redux slices
│   │   ├── userSlice.ts   # User preferences and settings
│   │   └── contentSlice.ts # Content data and filtering
│   ├── store.ts           # Redux store configuration
│   └── hooks.ts           # Typed Redux hooks
└── __tests__/             # Test files
    ├── components/        # Component tests
    ├── features/          # Redux slice tests
    └── setup.ts           # Test configuration
```

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser with ES2020+ support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personalized-content-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Testing

Run the test suite:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

### Building for Production

```bash
npm run build
npm run start
```

## 🎯 Key Features Walkthrough

### 1. Personalized Content Feed
- Configure content preferences in the settings panel
- Content automatically updates based on selected categories
- Real-time filtering and search capabilities

### 2. Interactive Content Management
- Drag and drop cards to reorder your feed
- Mark content as favorite for quick access
- Share content with integrated social sharing

### 3. Advanced Search & Filtering
- Debounced search with 300ms delay for optimal performance
- Filter by content type (news, movies, social)
- Search across titles, descriptions, and metadata

### 4. Responsive Design
- Mobile-first approach with breakpoints at 768px and 1024px
- Touch-friendly interactions on mobile devices
- Optimized typography and spacing for all screen sizes

### 5. Theme System
- System preference detection
- Smooth transitions between light and dark modes
- Consistent color scheme across all components

## 🧪 Testing Strategy

### Unit Tests
- Component rendering and interaction tests
- Redux slice logic and state management
- Utility function testing

### Integration Tests
- Component interaction with Redux store
- API integration and data flow
- User workflow testing

### E2E Tests (Future Enhancement)
- Complete user journeys
- Cross-browser compatibility
- Performance testing

## 🔧 Configuration

### Environment Variables
The application uses mock APIs by default. To integrate with real APIs:

```env
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_SOCIAL_API_KEY=your_social_api_key
```

### Customization
- Modify content sources in `lib/features/contentSlice.ts`
- Adjust theme colors in `tailwind.config.ts`
- Update content categories in `components/dashboard/SettingsPanel.tsx`

## 📈 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Image Optimization**: Lazy loading and responsive images
- **Memoization**: React.memo and useMemo for expensive operations
- **Debounced Search**: Optimized search with 300ms debounce
- **Infinite Scrolling**: Efficient content loading with intersection observer

## 🔒 Security Considerations

- **XSS Protection**: Content sanitization and CSP headers
- **API Key Security**: Environment variables for sensitive data
- **Input Validation**: Client-side and server-side validation
- **HTTPS**: Secure data transmission

## 🚀 Future Enhancements

- **Real-time Updates**: WebSocket integration for live content
- **Authentication**: User accounts and personalized experiences
- **Internationalization**: Multi-language support with react-i18next
- **PWA Support**: Service workers and offline functionality
- **Analytics**: User behavior tracking and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from modern dashboard interfaces
- Icons by Lucide React
- Stock photos from Pexels
- Testing utilities from React Testing Library

---

Built with ❤️ using Next.js, Redux Toolkit, and Tailwind CSS
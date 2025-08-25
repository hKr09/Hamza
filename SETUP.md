# Shopify AI Social Media App - Frontend Setup

This is a production-ready frontend for a Shopify app that generates AI-powered social media posts from store products.

## 🚀 Features

- **Dashboard**: Credits display, statistics, and quick actions
- **Generate Post**: AI-powered content creation with product selection
- **History**: Post management with filtering and search
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Shopify Polaris**: Professional UI components following Shopify design guidelines

## 🛠️ Tech Stack

- **Remix** - Full-stack React framework
- **React 18** - Modern React with hooks
- **Shopify Polaris** - Shopify's design system
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety (optional)

## 📁 Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── CreditCounter.jsx
│   ├── StatsCard.jsx
│   ├── ProductSelect.jsx
│   ├── PromptTextarea.jsx
│   ├── PlatformSelect.jsx
│   ├── PostPreview.jsx
│   └── HistoryCard.jsx
├── routes/              # App pages
│   ├── _index.jsx      # Redirects to dashboard
│   ├── dashboard.jsx   # Main dashboard
│   ├── generate.jsx    # Post generation
│   └── history.jsx     # Post history
├── root.jsx            # App root with Polaris provider
└── tailwind.css       # Tailwind CSS imports
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Tailwind CSS (if not already installed)

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. Build and Run

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Components Overview

### CreditCounter
- Displays remaining credits with color-coded badges
- Shows warning when credits are low

### StatsCard
- Displays dashboard statistics with icons
- Hover effects and responsive design

### ProductSelect
- Dropdown with product thumbnails and details
- Integrates with Shopify product catalog

### PromptTextarea
- AI prompt input with character count
- Helpful tips and validation

### PlatformSelect
- Multi-select for social media platforms
- Platform-specific descriptions and icons

### PostPreview
- Generated content display
- Action buttons for download, schedule, and post
- Inline caption editing

### HistoryCard
- Post history item with actions
- Status badges and platform indicators
- Reschedule and edit functionality

## 🔧 Configuration

### Tailwind CSS
The app uses Tailwind CSS for custom styling alongside Shopify Polaris. Custom colors and components are defined in `tailwind.css`.

### Mock Data
All components use mock data for demonstration. Replace with actual API calls in production:

```javascript
// Example API integration
const fetchProducts = async () => {
  const response = await fetch('/api/products');
  const products = await response.json();
  setProducts(products);
};
```

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind's responsive utilities
- **Grid layouts** that adapt to screen sizes
- **Navigation** that collapses on small screens
- **Touch-friendly** buttons and interactions

## 🎯 Key Features

### Dashboard
- Credits display with visual indicators
- Quick statistics overview
- Recent activity feed
- Navigation to other sections

### Generate Post
- Product selection with visual previews
- AI prompt customization
- Platform selection
- Real-time content generation
- Post preview with actions

### History
- Comprehensive post library
- Advanced filtering and search
- Status management
- Bulk actions and pagination

## 🔄 State Management

The app uses React hooks for local state management:
- `useState` for component state
- `useEffect` for side effects and data fetching
- `useNavigate` for routing
- `useCallback` for performance optimization

## 🚀 Production Deployment

1. **Build the app**: `npm run build`
2. **Deploy to Shopify**: `npm run deploy`
3. **Configure environment variables**
4. **Set up backend APIs**

## 🧪 Testing

The app is designed to be easily testable:
- Mock data for development
- Clear separation of concerns
- Reusable components
- Consistent API patterns

## 📚 Next Steps

1. **Backend Integration**: Connect to actual AI services
2. **Shopify API**: Integrate with real product catalog
3. **Authentication**: Add user management
4. **Analytics**: Track usage and performance
5. **Advanced Features**: Bulk generation, templates, etc.

## 🤝 Contributing

1. Follow Shopify Polaris design guidelines
2. Use Tailwind CSS for custom styling
3. Maintain responsive design principles
4. Add proper error handling
5. Include loading states for better UX

## 📄 License

This project is part of a Shopify app development workflow.

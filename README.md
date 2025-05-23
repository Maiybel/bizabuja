# Bizabuja

A comprehensive web application to search and explore businesses in Abuja, Nigeria using Google Places API. This project provides a clean, modern interface for discovering restaurants, hotels, banks, hospitals, and other businesses in Nigeria's capital city.

## 🏗️ Project Structure

```
bizabuja/
├── backend/                    # Node.js Express API server
│   ├── .env                   # Environment variables (API keys)
│   ├── package.json           # Backend dependencies
│   ├── server.js              # Main server entry point
│   ├── config/
│   │   └── apiConfig.js       # Google API configuration
│   ├── controllers/
│   │   └── businessController.js  # Business route handlers
│   ├── routes/
│   │   └── businessRoutes.js  # API route definitions
│   └── services/
│       └── googlePlacesService.js # Google Places API integration
├── frontend/                   # Next.js React application
│   ├── .env.local             # Frontend environment variables
│   ├── package.json           # Frontend dependencies
│   ├── next.config.js         # Next.js configuration
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── public/
│   │   └── favicon.ico        # Site favicon
│   └── src/
│       ├── components/        # Reusable React components
│       │   ├── BusinessCard.tsx    # Individual business display
│       │   ├── BusinessList.tsx    # List of businesses with pagination
│       │   ├── SearchBar.tsx       # Search form with filters
│       │   └── Layout.tsx          # Page layout wrapper
│       ├── pages/             # Next.js pages
│       │   ├── _app.tsx            # App component wrapper
│       │   ├── _document.tsx       # Custom document structure
│       │   └── index.tsx           # Home page
│       ├── services/          # API communication layer
│       │   └── api.ts              # API service functions
│       ├── types/             # TypeScript type definitions
│       │   └── index.ts            # Business and API types
│       └── styles/            # Global styling
│           └── globals.css         # Tailwind CSS imports
└── README.md                  # This documentation file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16.x or higher)
- **npm** or **yarn** package manager
- **Google Cloud Platform account** with billing enabled
- **Google Places API key** (see setup instructions below)

### 🔑 Google API Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable billing for your project

2. **Enable the Places API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Places API" and enable it

3. **Create an API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
   - (Optional but recommended) Restrict the API key to Places API only

### 🖥️ Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment variables file**:
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   GOOGLE_API_KEY=your_actual_google_api_key_here
   ```
   
   ⚠️ **Important**: Replace `your_actual_google_api_key_here` with your actual Google API key

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The backend server will start at `http://localhost:5000`

### 🌐 Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment variables file**:
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The frontend application will start at `http://localhost:3000`

## ✨ Features

### 🔍 Search Functionality
- **Keyword Search**: Find businesses by name, landmark, or area
- **Business Type Filtering**: Filter by restaurants, hotels, banks, hospitals, etc.
- **Location-based**: Centered on Abuja coordinates

### 📱 User Interface
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **Interactive Business Cards**: Click-to-view detailed information
- **Loading States**: Smooth loading indicators for better UX

### 📊 Business Information
- **Basic Details**: Name, address, phone number, website
- **Ratings & Reviews**: Star ratings and review counts
- **Opening Hours**: Full weekly schedule when available
- **Business Categories**: Tagged business types
- **Operational Status**: Open/closed status indicators

### 🔄 Advanced Features
- **Pagination**: Seamless loading of additional results
- **Error Handling**: Graceful error messages and recovery
- **API Rate Limiting**: Built-in delays for Google API compliance
- **Caching Ready**: Structure supports result caching implementation

## 🛠️ API Endpoints

### Get Businesses
```
GET /api/businesses
```

**Query Parameters**:
- `keyword` (string, optional) - Search term for business names or descriptions
- `type` (string, optional) - Business type (restaurant, hospital, bank, etc.)
- `pageToken` (string, optional) - Token for pagination (from previous response)
- `lat` (number, optional) - Custom latitude coordinate
- `lng` (number, optional) - Custom longitude coordinate  


**Example**:
```
GET /api/businesses?keyword=restaurant&type=restaurant&radius=10000
```

### Get Business Details
```
GET /api/businesses/:placeId
```

**Parameters**:
- `placeId` (string, required) - Google Places unique identifier

**Example**:
```
GET /api/businesses/ChIJN1t_tDeuEmsRUsoyG83frY4
```

## 📋 Google Places API Limitations

### Rate Limits
- **Free Tier**: 2,500 requests per day
- **Paid Plans**: Higher limits available with billing enabled
- **Request Delay**: Must wait 2-3 seconds between pagination requests

### Data Constraints
- **Maximum Radius**: 50,000 meters (50km)
- **Results Per Page**: Maximum 20 businesses per request
- **Pagination**: Up to 60 total results (3 pages of 20)
- **Coverage**: Limited to businesses indexed by Google

### Best Practices
- **Cache Results**: Store responses to reduce API calls
- **Batch Requests**: Group multiple searches efficiently  
- **Error Handling**: Implement retry logic for failed requests
- **Monitor Usage**: Track API quotas to avoid service interruption

## 🚀 Deployment

### Backend Deployment
1. **Environment Variables**: Set `GOOGLE_API_KEY` in your hosting platform
2. **Start Command**: Use `npm start` for production
3. **Port Configuration**: Ensure `PORT` environment variable is set

### Frontend Deployment
1. **Build the Application**:
   ```bash
   npm run build
   ```
2. **Environment Variables**: Set `NEXT_PUBLIC_API_URL` to your backend URL
3. **Deploy**: Use platforms like Vercel, Netlify, or your preferred hosting service

## 🛡️ Security Considerations

- **API Key Protection**: Never expose your Google API key in frontend code
- **Environment Variables**: Use `.env` files and add them to `.gitignore`
- **API Restrictions**: Limit your Google API key to specific APIs and domains
- **Rate Limiting**: Implement server-side rate limiting for production use

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🆘 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look through existing GitHub issues
2. **Create an Issue**: Report bugs or request features
3. **Documentation**: Review Google Places API documentation
4. **Community**: Join relevant developer communities for additional support

---

**Built with ❤️ for the Abuja business community**
# WebDesa Frontend - React App

This is the React frontend application for the WebDesa project, converted from a vanilla HTML/JavaScript application.

## Features

- **React 18** with modern hooks and functional components
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Vite** as the build tool
- **Axios** for API calls

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx          # Navigation component
├── pages/
│   ├── Home.jsx            # Home page
│   ├── Berita.jsx          # News listing page
│   ├── BacaBerita.jsx      # News detail page
│   ├── Layanan.jsx         # Services page
│   ├── Login.jsx           # Login/Register page
│   ├── Admin.jsx           # Admin panel
│   ├── EditBerita.jsx      # Edit news page
│   ├── EditPeminjaman.jsx  # Edit loan page
│   └── Artikel.jsx         # Articles page
├── utils/
│   ├── auth.js             # Authentication utilities
│   └── config.js           # API configuration
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Integration

The app connects to the backend API at `http://localhost:5000` for:

- User authentication
- News management
- Services and loan applications
- Admin functionality

## Routing

- `/` - Home page
- `/berita` - News listing
- `/berita/:id` - News detail
- `/layanan` - Services page
- `/login` - Login/Register
- `/admin` - Admin panel
- `/edit-berita/:id` - Edit news
- `/edit-peminjaman/:id` - Edit loan
- `/artikel` - Articles

## Authentication

The app uses JWT tokens stored in localStorage for authentication. The Navbar component automatically shows/hides login/logout buttons based on authentication status.

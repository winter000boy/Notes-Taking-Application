# Notes Taking Application

A full-stack note-taking application with authentication, built with React + TypeScript (Frontend) and Node.js + TypeScript + Express (Backend).

## Features

- Email + OTP Authentication
- Google OAuth Integration
- JWT-based Authentication
- Create and Delete Notes
- Responsive Design
- TypeScript Support

## Tech Stack

### Frontend
- React 18
- TypeScript
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Google OAuth

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally or MongoDB Atlas account
- Google OAuth credentials (for Google Sign-in)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd notes-taking-app
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   
   Create `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

   Create `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Start the development servers:
   ```bash
   # Run both frontend and backend
   npm run dev

   # Run frontend only
   npm run start:frontend

   # Run backend only
   npm run start:backend
   ```

## Project Structure

```
.
├── frontend/                # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   └── package.json
│
├── backend/                # Node.js + TypeScript backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # Express routes
│   │   ├── middleware/   # Custom middleware
│   │   └── utils/        # Utility functions
│   └── package.json
│
└── package.json           # Root package.json
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Email signup
- `POST /auth/verify-otp` - OTP verification
- `POST /auth/google` - Google OAuth
- `GET /user/me` - Get user info

### Notes
- `GET /notes` - Get user's notes
- `POST /notes` - Create note
- `DELETE /notes/:id` - Delete note

## Deployment

The application can be deployed to:
- Frontend: Netlify/Vercel
- Backend: Render

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

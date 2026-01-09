# MyAuth - MERN Authentication System

A full-stack MERN (MongoDB, Express, React, Node.js) authentication application with email verification, JWT-based login, and OTP functionality. This project provides a complete authentication system with secure user management, email verification, and password reset features.

## 🎯 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Email Verification**: OTP-based email verification system
- **Password Reset**: Secure password reset functionality via email OTP
- **Cookie-Based Sessions**: Secure HTTP-only cookie authentication
- **Protected Routes**: Middleware-based route protection
- **Toast Notifications**: User-friendly notification system
- **Responsive UI**: Built with React and Tailwind CSS
- **CORS Support**: Secure cross-origin requests handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Nodemailer configuration (Gmail or other email service)

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.1 - UI library
- **Vite** 7.1.6 - Build tool
- **React Router DOM** 7.9.1 - Client-side routing
- **Tailwind CSS** 4.1.13 - Utility-first CSS framework
- **Axios** 1.12.2 - HTTP client
- **React Toastify** 11.0.5 - Notification system
- **React Icons** 5.5.0 - Icon library

### Backend
- **Express** 5.1.0 - Web framework
- **Node.js** - JavaScript runtime
- **MongoDB** - NoSQL database
- **Mongoose** 8.18.1 - MongoDB ODM
- **JWT** (jsonwebtoken 9.0.2) - Token authentication
- **bcryptjs** 3.0.2 - Password hashing
- **Nodemailer** 7.0.6 - Email service
- **Cookie Parser** 1.4.7 - Cookie handling
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 17.2.2 - Environment variables

## 📁 Project Structure

```
myAuth/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── App.jsx                 # Main app component
│   │   ├── App.css                 # App styles
│   │   ├── main.jsx                # Entry point
│   │   ├── index.css               # Global styles
│   │   ├── assets/                 # Static assets
│   │   ├── components/
│   │   │   ├── Header.jsx          # Header component
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   └── MyAppToast.jsx      # Toast notification wrapper
│   │   ├── context/
│   │   │   └── AppContext.jsx      # Global app context
│   │   └── pages/
│   │       ├── Home.jsx            # Home page
│   │       ├── Login.jsx           # Login/Register page
│   │       └── EmailVerify.jsx     # Email verification page
│   ├── index.html                  # HTML template
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint configuration
│   ├── package.json                # Frontend dependencies
│   └── public/                     # Public assets
│
└── server/                          # Express Backend
    ├── server.js                    # Main server file
    ├── package.json                 # Backend dependencies
    ├── config/
    │   ├── mongodb.js              # MongoDB connection setup
    │   └── nodemailer.js           # Email configuration
    ├── controllers/
    │   ├── authController.js       # Authentication logic
    │   └── userController.js       # User management logic
    ├── middleware/
    │   └── userAuth.js             # JWT verification middleware
    ├── models/
    │   └── userModel.js            # User database schema
    └── routes/
        ├── authRoute.js            # Authentication endpoints
        └── userRoute.js            # User endpoints
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/myAuth.git
cd myAuth
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=your_email@gmail.com
```

Start the backend server:

```bash
npm run server    # with nodemon (development)
# or
npm start         # production
```

The server will run on `http://localhost:4000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The client will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/logout` | Logout user | ✅ |
| POST | `/send-verify-otp` | Send email verification OTP | ✅ |
| POST | `/verify-email` | Verify email with OTP | ✅ |
| POST | `/send-reset-otp` | Send password reset OTP | ✅ |
| GET | `/isverified` | Check if email is verified | ✅ |

### User Routes (`/api/user`)

Available user management endpoints (see `userRoute.js` for details)

## 🔐 Authentication Flow

1. **Registration**: User creates account with email and password
2. **Login**: User logs in, receives JWT token (stored in HTTP-only cookie)
3. **Email Verification**: 
   - User requests verification OTP
   - OTP sent via email
   - User verifies email with OTP
4. **Password Reset**:
   - User requests reset OTP
   - OTP sent via email
   - User resets password with OTP

## 🛡️ Security Features

- **JWT Authentication**: Token-based stateless authentication
- **Password Hashing**: bcryptjs for secure password storage
- **HTTP-Only Cookies**: Prevents XSS attacks
- **CORS Protection**: Restricts requests to allowed origins
- **Protected Routes**: Middleware-based authorization
- **Email Verification**: Prevents spam and validates email ownership
- **OTP System**: Additional security layer for critical operations

## 🌐 Environment Configuration

### Frontend
- Default API base: `http://localhost:4000`
- Configured in axios interceptors

### Backend
- CORS allowed origin: `http://localhost:5173`
- MongoDB connection via Mongoose
- Email service via Nodemailer

## 📦 Scripts

### Client
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Server
```bash
npm start        # Start server
npm run server   # Start with nodemon (development)
```

## 🗄️ Database Schema

### User Model
- Email (unique)
- Password (hashed)
- Name
- Verification status
- Created timestamp
- Last login timestamp

## 🐛 Troubleshooting

### Port already in use
```bash
# Change PORT in .env file for backend
# or use different port
```

### MongoDB connection error
- Verify MongoDB is running
- Check connection string in `.env`
- Ensure IP whitelist in MongoDB Atlas

### Email not sending
- Verify SMTP credentials in `.env`
- Check "Less secure app access" settings for Gmail
- Use App Passwords for Gmail (2FA enabled)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Animesh Samantaray**

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

## 🔗 Links

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev) 
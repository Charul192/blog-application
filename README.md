# 📝 Blog Application

A full-stack blog application built with Node.js, Express, and MongoDB that allows users to create, read, and manage blog posts with user authentication and file uploads.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Template Engine:** EJS (Embedded JavaScript)
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Frontend:** Bootstrap 5, HTML5, CSS3
- **Development:** Nodemon for auto-restart

## ✨ Features

- 🔐 **User Authentication**: Sign up, sign in, and secure session management
- 📖 **Blog Management**: Create, view, and manage blog posts
- 🖼️ **Image Upload**: Upload cover images for blog posts
- 💬 **Comments System**: Users can comment on blog posts
- 📱 **Responsive Design**: Bootstrap-powered responsive UI
- 🔒 **Protected Routes**: Authentication middleware for secure access
- 🍪 **Cookie-based Sessions**: Secure user session management

## 📁 Project Structure

```
blog-application/
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
├── middlewares/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── blog.js              # Blog schema and multer config
│   ├── comment.js           # Comment schema
│   └── user.js              # User schema
├── routes/
│   ├── blog.js              # Blog-related routes
│   └── user.js              # User authentication routes
├── services/
│   └── auth.js              # Authentication service
├── views/
│   ├── addBlog.ejs          # Add new blog page
│   ├── blog.ejs             # Individual blog view
│   ├── home.ejs             # Homepage with blog list
│   ├── signin.ejs           # Sign in page
│   ├── signup.ejs           # Sign up page
│   └── partials/            # Reusable EJS components
│       ├── head.ejs
│       ├── nav.ejs
│       └── script.ejs
└── public/
    ├── images/              # Static images
    └── uploads/             # User uploaded files
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [Git](https://git-scm.com/)

### Step-by-step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/melroy12/blog-application.git
   cd blog-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows (if MongoDB is installed as a service)
   net start MongoDB
   
   # Or start manually
   mongod
   ```

4. **Start the application**
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```
   
   For production:
   ```bash
   npm start
   ```

5. **Access the application**
   
   Open your browser and navigate to: `http://localhost:8000`

## 🚀 Usage Guide

### Getting Started

1. **Homepage**: Visit the homepage to see all published blog posts
2. **Sign Up**: Create a new account using the sign-up form
3. **Sign In**: Log in with your credentials
4. **Create Blog**: Once logged in, create new blog posts with images
5. **View Blogs**: Click on any blog card to read the full post
6. **Comments**: Add comments to blog posts (requires authentication)

### Key Routes

- `/` - Homepage with all blogs
- `/user/signup` - User registration
- `/user/signin` - User login
- `/blog/add-new` - Create new blog post
- `/blog/:id` - View individual blog post

### File Upload

The application supports image uploads for blog cover images:
- Supported formats: Common image formats (PNG, JPG, JPEG, etc.)
- Files are stored in `public/uploads/` directory
- Automatic filename generation with timestamps

## 🔧 Configuration

### Database Configuration

The application connects to MongoDB using the following default configuration:
```javascript
mongodb://127.0.0.1:27017/blogify
```

To change the database connection, modify the connection string in `index.js`:
```javascript
mongoose.connect('your-mongodb-connection-string')
```

### Environment Variables

For production deployment, consider using environment variables:
```javascript
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogify';
```

## 📦 Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB object modeling
- `ejs` - Template engine
- `jsonwebtoken` - JWT authentication
- `multer` - File upload handling
- `cookie-parser` - Cookie parsing middleware
- `bootstrap` - CSS framework
- `crypto` - Cryptographic functionality

### Development Dependencies
- `nodemon` - Development server with auto-restart

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Endpoints

### User Routes
- `GET /user/signin` - Sign in page
- `GET /user/signup` - Sign up page
- `POST /user/signin` - Process sign in
- `POST /user/signup` - Process sign up
- `GET /user/logout` - User logout

### Blog Routes
- `GET /blog/add-new` - Add new blog page
- `POST /blog/` - Create new blog post
- `GET /blog/:id` - View specific blog
- `POST /blog/comment/:blogId` - Add comment to blog

## 🔐 Security Features

- JWT-based authentication
- Password hashing
- Protected routes with middleware
- Cookie-based session management
- Input validation and sanitization

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string
   - Verify MongoDB is installed correctly

2. **File Upload Issues**
   - Check `public/uploads/` directory permissions
   - Ensure multer configuration is correct

3. **Authentication Problems**
   - Clear browser cookies
   - Check JWT token generation
   - Verify user credentials

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- MongoDB team for the robust database solution
- Bootstrap team for the responsive CSS framework
- All contributors who help improve this project

---


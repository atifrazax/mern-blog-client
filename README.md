# MERN Blog Application (Client)

A full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** blog application with user authentication, CRUD functionality, and a responsive UI. Users can register, login, create, edit, delete, search and filter by date blogs. Features secure cookie-based authentication, image upload, and pagination.

## Features

- **User Authentication:** Register, login, logout with secure cookies.
- **CRUD Operations:** Create, read, update, and delete blogs.
- **Pagination & Filtering:** Paginate blogs and filter by search or date.
- **Image Upload:** Upload and manage images via Cloudinary API.
- **Top Blogs Section:** Display most liked blogs dynamically.
- **Responsive Design:** Mobile-friendly with Tailwind CSS.
- **Secure:** Uses `httpOnly` and `Secure` cookies for session management.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Cookie-based sessions (`httpOnly` & `Secure`)
- **Cloud Storage:** Cloudinary for image uploads

## Installation

1. **Clone the Server repository:**

```bash
git clone https://github.com/atifrazax/mern-blog-server.git
```

# Install dependencies

# Backend

```bash
cd server
npm install
```

# Frontend

```bash
cd ../client
npm install
```

# Setup Environment Variables - Server

```env
NODE_ENV=production
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

# Setup Environment Variables - Client

```env
VITE_API_URL=http://localhost:5000
```

## Installation

2. **Clone the Client repository:**

```bash
git clone https://github.com/atifrazax/mern-blog-client.git
```

# Run the application

# Backend

```bash
cd server
npm run dev
```

# Frontend

```bash
cd ../client
npm run dev
```

# API Endpoints

### User Routes

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | /me             | Get logged-in user info (auth) |
| GET    | /csrf           | Get CSRF token                 |
| POST   | /register       | Register a new user            |
| POST   | /signin         | Login user                     |
| PATCH  | /update-profile | Update user profile (auth)     |
| POST   | /logout         | Logout user                    |

### Blog Routes

| Method | Endpoint         | Description                        |
| ------ | ---------------- | ---------------------------------- |
| GET    | /blogs           | Get all blogs                      |
| GET    | /top-liked       | Get top liked blogs                |
| GET    | /blog/:id        | Get single blog by ID              |
| GET    | /my-blogs        | Get blogs of logged-in user (auth) |
| POST   | /new-blog        | Create a new blog (auth)           |
| PUT    | /update-blog/:id | Update a blog (auth)               |
| DELETE | /delete-blog/:id | Delete a blog (auth)               |
| PUT    | /like/:id        | Like a blog (auth)                 |
| PUT    | /comment/:id     | Comment on a blog (auth)           |
| GET    | /likes/:id       | Get likes of a blog                |
| GET    | /signature       | Get Cloudinary signature (auth)    |

# Contributions

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request.

```

```

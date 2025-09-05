# Clone the repository
git clone https://github.com/Ganesh0801/libraryManagement.git
cd backend

# Install dependencies
npm install

# Setup environment variables in a .env file
# Example:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# SMTP_HOST=your_smtp_host
# SMTP_PORT=your_smtp_port
# SMTP_USER=your_smtp_user
# SMTP_PASS=your_smtp_password
# PORT=3000

# Run the server
- npm run dev
- Environment Variables
- Variable	Description
- MONGODB_URI	MongoDB connection string
- JWT_SECRET	Secret key for JWT token signing
- SMTP_HOST	SMTP server host
- SMTP_PORT	SMTP port number
- SMTP_USER	SMTP username/email
- SMTP_PASS	SMTP password
- PORT	Server port (default 3000)

#  API Endpoints
#  Authentication
- POST /api/auth/signup - Register new user

- POST /api/auth/signin - User login

- POST /api/auth/forgot-password - Request password reset OTP by username

- POST /api/auth/verify-otp - Verify OTP

- POST /api/auth/reset-password - Reset password via OTP verification

#  Admin (requires JWT authentication)
- GET /api/admin/detail - Get details of the logged-in admin user

- GET /api/admin/overdue-count - Get count of overdue books

- POST /api/admin/change-credentials - Change admin password

- GET /api/admin/counts - Get counts of total users and books

- GET /api/admin/admins - Get list of all admin users

- GET /api/admin/overdue-borrowers - List of users with overdue books

- GET /api/admin/borrowed-returned - Get counts of borrowed and returned books

#  Books (requires JWT authentication)
- GET /api/books - List all books

- POST /api/books - Add a new book

- DELETE /api/books/:id - Delete a book by ID

- PUT /api/books/:id - Update a book by ID

#  Users (requires JWT authentication)
- GET /api/users - List all users

- POST /api/users - Add a new user

- DELETE /api/users/:registrationNumber - Delete a user by registration number

- PUT /api/users/:registrationNumber - Update a user by registration number

#  Technologies Used
- Node.js & Express.js for backend server

- MongoDB with Mongoose for database modeling and queries

- JWT for secure authentication and authorization

- bcrypt for password hashing

- Nodemailer for sending OTP emails

- dotenv for environment variable configuration

#  Project Structure
- text
- /controllers  # Business logic
- /middleware   # Auth and other middlewares
- /models       # Mongoose models for User and Book
- /routes       # API routes
- /utils        # Utility functions (e.g. mailer)
- /server.js    # Entry point of the application
- /.env        # Environment variables
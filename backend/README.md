# Clone the repository
git clone https://github.com/Ganesh0801/libraryManagement.git
cd backend

# Install dependencies
npm install

# Setup environment variables in a .env file
# Example:
# MONGODB_URI=mongodb+srv://ganeshsbsa08_db_user:lbL9viPCgqBljkHO@library.kfj3est.mongodb.net/?retryWrites=true&w=majority&appName=Library
# JWT_SECRET=asdfghjkl1sdfghjsdfghjdfgh
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=465
# SMTP_USER=sdlcreativegroups@gmail.com
# SMTP_PASS=ezhl mefx cyji cirp
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
#  ADMIN LOGIN CREDENTIALS

# REGISTER / SIGNUP
- POST /api/admin/auth/signup - Register New Admin
- JSON 
- Headers not Required

- Payload
| Field          | Type   | Required | Validation Rules                                                                 |
|----------------|--------|----------|----------------------------------------------------------------------------------|
| firstName      | String | Yes      | Must be a string                                                                 |
| lastName       | String | Yes      | Must be a string                                                                 |
| contactNumber  | String | Yes      | Must be exactly 10 digits                                                        |
| email          | String | Yes      | Must be a valid email and end with **@gmail.com**                                |
| username       | String | Yes      | Must be a string                                                                 |
| password       | String | Yes      | Length 6–10, must include at least one special character (e.g., `@`, `#`, `$`)   |



# LOGIN / SIGNIN
- POST /api/admin/auth/signin - Login For Admin
- JSON
- Headers not Required

- Payload
| Field    | Type   | Required | Validation Rules                                                                 |
|----------|--------|----------|----------------------------------------------------------------------------------|
| username | String | Yes      | Must match the **username** used at signup                                       |
| password | String | Yes      | Must match the **password** provided at signup (length 6–10, with a special char) |

### Signin Behavior
- On successful signin, a **JWT token** will be generated.
- This token should be securely stored (e.g., in **HTTP-only cookies**, **localStorage**, or a **database session table**) depending on your security needs.
- The JWT token will be required for accessing protected routes.



# FORGET PASSWORD
- POST /api/admin/auth/forgot-password - Request For forgot-password 
- JSON
- Headers not Required

- Payload
| Field    | Type   | Required | Validation Rules           |
|----------|--------|----------|----------------------------|
| username | String | Yes      | Must be unique and a string |



# VERIFY - OTP
- POST /api/admin/auth/verify-otp - Verify OTP
- JSON
- Headers not Required

- Payload
| Field    | Type   | Required | Validation Rules                        |
|----------|--------|----------|-----------------------------------------|
| username | String | Yes      | Must match the registered username      |
| otp      | Number | Yes      | Must be a 6-digit numeric one-time code |


# RESET PASSWORD
- POST /api/admin/auth/reset-password - Reset password via OTP verification
- JSON
- Headers not Required

- Payload
| Field           | Type   | Required | Validation Rules                                                                 |
|-----------------|--------|----------|----------------------------------------------------------------------------------|
| username        | String | Yes      | Must be the same username used at signup                                         |
| newPassword     | String | Yes      | Length 6–10, must include at least one special character (e.g., `@`, `#`, `$`)   |
| confirmPassword | String | Yes      | Must be identical to `newPassword`                                               |



# ADMIN DASHBOARD  

# GET ADMIN DETAIL
- GET /api/admin/dashboard/detail - Get details of Admin

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload not Required



# GET OVERDUE BOOK COUNT
- GET /api/admin/dashboard/overdue-count - Get count and details of overdue books

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload not Required



# CHANGE ADMIN PASSWORD
- POST /api/admin/dashboard/change-credentials - Change admin password

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- JSON

- Payload 
| Field           | Type   | Required | Validation Rules                                                                 |
|-----------------|--------|----------|----------------------------------------------------------------------------------|
| currentPassword | String | Yes      | Must match the existing password used at signup/login                            |
| newPassword     | String | Yes      | Length 6–10, must include at least one special character (e.g., `@`, `#`, `$`)   |
| confirmPassword | String | Yes      | Must be identical to `newPassword`                                               |




# GET TOTAL BOOKS AND USER COUNTS
- GET /api/admin/dashboard/counts - Get counts of total users and books

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

-  Payload not Required




# GET ADMINS DETAILS LIKE COUNT AND ALL VALUES
- GET /api/admin/dashboard/admins - Get list of all admin users

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload not Required



# GET OVERDUE BORROWERS LIST
- GET /api/admin/dashboard/overdue-borrowers - List of users with overdue books

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload is not Required




# GET TOTAL BORROWED AND RETURNED BOOKS
- GET /api/admin/dashboard/borrowed-returned - Get counts of borrowed and returned books

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload is not Required




# USER MANAGEMENT API

# GET ALL USER
- GET /api/users/ - Get all Users

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload is not Required



# ADD USER
- POST /api/users/ - Add new User

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- JSON

- Payload
| Field             | Type          | Required | Validation Rules                                                                 |
|-------------------|---------------|----------|----------------------------------------------------------------------------------|
| registrationNumber| String        | Yes      | Must be **unique**, required, cannot be empty                                    |
| firstName         | String        | Yes      | Required, must be a non-empty string                                             |
| lastName          | String        | Yes      | Required, must be a non-empty string                                             |
| contactNumber     | String        | Yes      | Must be exactly **10 digits**                                                    |
| email             | String        | Yes      | Must be a valid email and must end with **@gmail.com**                           |
| class             | Number/String | No       | Either a number (≥ 1) or a valid Roman numeral (e.g., `X`, `IX`, `V`)            |
| section           | String        | No       | Must be a string                                                                 |
| gender            | String        | Yes      | Allowed values: **male**, **female**, **others**                                 |
| borrowedBooks     | Array         | No       | List of borrowed books (can be empty)                                            |
| └─ bookId         | String        | Yes      | Unique identifier of the book                                                    |
| └─ title          | String        | Yes      | Title of the borrowed book                                                       |
| └─ borrowedDate   | DateTime      | Yes      | Date when the book was borrowed (ISO 8601 format)                                |
| └─ dueDate        | DateTime      | Yes      | Due date for returning the book (ISO 8601 format)                                |
| └─ isOverdue      | Boolean       | Yes      | Indicates whether the book is overdue                                            |




# UPDATE USER
- PUT /api/users/:registrationNumber - Update User by using registrationNumber

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- JSON

- Payload
| Field             | Type          | Required | Notes                                                                 |
|-------------------|---------------|----------|----------------------------------------------------------------------|
| registrationNumber| String        | Path Param | Used in the URL to identify which user to update                     |
| Any User Field    | Various       | No       | Payload can include **any subset** of user fields to update           |
| └─ class          | Number/String | No       | Example: `"11"` or `"XI"`                                            |
| └─ section        | String        | No       | Example: `"B"`                                                       |
| └─ firstName      | String        | No       | Example: `"Jane"`                                                    |
| └─ lastName       | String        | No       | Example: `"Doe"`                                                     |
| └─ contactNumber  | String        | No       | Must be exactly **10 digits**                                        |
| └─ email          | String        | No       | Must be a valid Gmail address (ending with **@gmail.com**)           |
| └─ gender         | String        | No       | Allowed values: **male**, **female**, **others**                     |
| └─ borrowedBooks  | Array         | No       | Optional list of borrowed books (same structure as in create payload) |




# DELETE USER
- DELETE /api/users/:registrationNumber - Delete User by RegisterNumber

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload is not Required




# BOOK MANAGEMENT API

# GET ALL BOOKS
- GET /api/books/ - Get all books

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload is not Required



# ADD BOOKS
- POST /api/books/ - Add new book

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- JSON

- Payload
| Field          | Type   | Required | Validation Rules                                                                 |
|----------------|--------|----------|----------------------------------------------------------------------------------|
| title          | String | Yes      | Required, cannot be empty                                                        |
| language       | String | Yes      | Required, cannot be empty                                                        |
| category       | String | Yes      | Required, cannot be empty                                                        |
| edition        | String | No       | Optional, must be a string                                                       |
| author         | String | Yes      | Required, cannot be empty                                                        |
| publisherName  | String | No       | Optional, must be a string                                                       |
| availableCopies| Number | Yes      | Must be an integer ≥ 0 (cannot be negative)                                      |




# UPDATE BOOK
- UPDATE /api/books/:id -Update book by id
- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- JSON
| Field          | Type   | Required | Notes                                                                 |
|----------------|--------|----------|----------------------------------------------------------------------|
| id             | String | Path Param | Book ID passed in the URL (`/api/books/:id`)                        |
| Any Book Field | Mixed  | No       | Payload can include **any subset** of book fields to update          |
| └─ title          | String | No       | Example: `"Mathematics 101"`                                         |
| └─ language       | String | No       | Example: `"English"`                                                 |
| └─ category       | String | No       | Example: `"Science"`                                                 |
| └─ edition        | String | No       | Example: `"2nd"`                                                     |
| └─ author         | String | No       | Example: `"John Smith"`                                              |
| └─ publisherName  | String | No       | Example: `"ABC Publications"`                                        |
| └─ availableCopies| Number | No       | Must be an integer ≥ 0 (e.g., `8`)                                   |




# DELETE BOOK
- DELETE /api/books/:id - Delete Book by id

- Header
| Header          | Value Type | Required | Description                                      |
|-----------------|------------|----------|--------------------------------------------------|
| Authorization   | String     | Yes      | Should be in the format: `Bearer <JWT_TOKEN>`    |
| Content-Type    | String     | Yes      | Must be `application/json`                       |

- Payload is not Required


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
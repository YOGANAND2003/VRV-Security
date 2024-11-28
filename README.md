# Role Based Access Control Web Application

## Description

This is an Role Based Access Control Web Application built using **React.js** for the frontend and **Node.js** for the backend. The application allows an admin to manage users, toggle user statuses, and assign roles (Admin, Moderator, User). It supports login functionality with role-based access control.

### Key Features:
- **User Registration**: Allows new users to register.
- **User Login**: Authenticates users and provides JWT tokens for secure access.
- **Admin Dashboard**: Provides an admin interface to view all registered users.
- **Role Management**: Differentiates between admin and regular users, restricting access to certain pages based on roles.
- **Error Handling**: Handles common errors such as unauthorized access and validation errors.
---

## Data Flow

```plaintext
Frontend (React.js) <--> Backend (Node.js + Express.js) <--> Database (MongoDB)
    |                           |                              |
    |--- Registration (POST) --->|                              |
    |                           ---> Validation, Hashing, Saving |
    |--- Login (POST) ----------->|                              |
    |                           ---> Validate, Generate JWT      |
    |--- Dashboard (GET) -------->|                              |
    |                           ---> Fetch User Data             |
    |--- Admin Dashboard (GET) --|                              |
    |                           ---> Fetch All Users (if Admin)  |
```

# Backend Implementation
---

## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: Database to store user data.
- **JWT**: JSON Web Tokens for authentication and session management.
- **Bcrypt.js**: Library to hash passwords before storing them securely in the database.

## Components
1. **Backend (Server-side)**:
- **Authentication**: Verifies user credentials and generates JWT tokens.
- **Authorization**: Ensures users can only access resources permitted to their role (e.g., admins can access the user list).
- **Data Persistence**: Uses MongoDB to store user data securely.
- **API Endpoints**:
    - `/api/register`: Handles new user registration.
    - `/api/login`: Authenticates users and returns a JWT.
    - `/api/dashboard`: Retrieves the user dashboard.
    - `/api/users`: Allows admins to view and manage all users.
2. **Database**:
    - **Technology**: MongoDB
    - **Description**: A NoSQL database to store user data securely.
    - **Responsibilities**:
      - Store user information such as usernames, emails, passwords, and roles.
      - Handle data retrieval for user dashboards and admin pages.

3. **Authentication & Authorization**:
    - **Technology**: JSON Web Tokens (JWT), Bcrypt.js
    - **Description**: Secure the system by authenticating users and validating their identity using JWT tokens.
    - **Responsibilities**:
      - **JWT**: Once a user logs in, a JWT is generated and returned to the client. This token is used for secure access to protected API routes.
      - **Bcrypt.js**: Hashes the user passwords before storing them in the database for security.

## System Flow

### 1. User Registration

- The user submits their details (username, email, password) through the frontend's registration form.
- The request is sent to the backend API (`/api/register`).
- The backend validates the user data, hashes the password using **Bcrypt.js**, and stores the user information in the MongoDB database.
- Upon successful registration, the backend responds with a confirmation message.

### 2. User Login

- After registration, the user logs in using their email and password through the frontend's login form.
- The login credentials are sent to the backend API (`/api/login`).
- The backend checks if the user exists and compares the provided password with the stored hashed password.
- If authentication is successful, a JWT token is generated and returned to the frontend, which stores it (typically in localStorage or a cookie).
- The frontend uses this JWT token for subsequent API requests to access protected routes.

### 3. User Dashboard

- Once logged in, users can access the dashboard through the frontend.
- The frontend sends a request to the backend (`/api/dashboard`) with the JWT token included in the **Authorization** header.
- The backend verifies the JWT token to authenticate the request.
- The backend retrieves the appropriate data (e.g., a welcome message) and sends it back to the frontend for display.

### 4. Admin Dashboard

- Admin users are granted additional privileges, such as viewing all registered users.
- The frontend checks the user's role (e.g., Admin) after login, and if the user has the required permissions, they are redirected to the admin dashboard.
- The frontend sends a request to the backend (`/api/users`) to fetch the list of all users.
- The backend verifies the JWT token and checks if the user has an Admin role before responding with the list of users.

---

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (either locally or using a cloud service like MongoDB Atlas)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/VRV-Security
    cd Backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory with the following content:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/user-management
    JWT_SECRET=your_jwt_secret_key
    ```

4. Start the server:
    ```bash
    npm start
    ```

    This will start the server on port `5000` (or any port defined in `.env`).

### API Endpoints

#### 1. **POST /api/register**
   - Registers a new user.
   - Request Body:
     ```json
     {
       "username": "john_doe",
       "email": "john@example.com",
       "password": "securepassword123",
       "role":"role_selected"
     }
     ```
   - Response:
     ```json
     {
       "message": "User registered successfully"
     }
     ```

#### 2. **POST /api/login**
   - Authenticates the user and returns a JWT token.
   - Request Body:
     ```json
     {
       "email": "john@example.com",
       "password": "securepassword123"
     }
     ```
   - Response:
     ```json
     {
       "token": "JWT_TOKEN_HERE"
     }
     ```

#### 3. **GET /api/protected/admin**
   - Retrieves the dashboard data for an authenticated user.
   - Requires JWT token in the Authorization header.
   - Response:
     ```json
     {
       "message": "Welcome to the admin dashboard",
     }
     ```

#### 4. **GET /api/users**
   - Retrieves all registered users (admin only).
   - Requires JWT token in the Authorization header.
   - Response:
     ```json
     {
       "users": [
         {
           "id": "1",
           "username": "john_doe",
           "email": "john@example.com",
           "role": "Admin"
         },
         {
           "id": "2",
           "username": "jane_doe",
           "email": "jane@example.com",
           "role": "User"
         }
       ]
     }
     ```

#### 5. **GET /api/protected/dashboard**
  - Requires JWT token in the Authorization header
  -Response:
  ```json
  {
    "message": "Welcome user"
  }
  ```


---

# Backend Structure
---
### Backend is structured as follows
```
rbac-auth-system/
├── server.js               # Main entry point for the server
├── .env                    # Environment variables (e.g., database credentials, JWT secret)
├── models/                 # Contains the Mongoose models (e.g., User model)
│   └── user.js             # Defines the User schema with roles and other details
├── routes/                 # API routes for authentication and protected resources
│   ├── auth.js             # Handles authentication routes (login, registration)
│   └── protected.js        # Contains routes that are protected and require role validation
├── middlewares/            # Middleware functions for authentication and authorization
│   ├── verifyJWT.js        # Verifies JWT token in the request
│   └── rbac.js             # Verifies user roles for access control
└── config/                 # Configuration files (e.g., database connection)
    └── db.js               # Database connection setup (MongoDB using Mongoose)
```

---


# Frontend Implementation

---
## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Routing**: React Router
- **API**: Axios for making API requests
- **State Management**: React useState and useEffect hooks

## Components
1. **Frontend (Client-side)**:
    - **Technology**: React.js, Tailwind CSS
    - **Description**: The user-facing part of the system where users can register, log in, and view their dashboard. Admins have additional features to manage users.
    - **Responsibilities**:
      - Displays login, registration, and dashboard pages.
      - Handles form validation, authentication, and display of user data.
      - Manages role-based redirection (e.g., showing the admin dashboard to users with admin roles).
2. **Login.jsx**
   - **Description**: The login component handles user authentication and redirects users based on their roles.
   - **Features**:
     - Handles form submission for user login.
     - Validates the user credentials against the backend (using JWT for authentication).
     - Redirects to the corresponding page based on the user role (Admin → `/admin`, Moderator → `/moderator`, User → `/home`).
   - **Props**: None
   - **State**:
     - `credentials`: Stores the username and password input values.
   - **API Integration**:
     - `loginUser`: API call to verify user credentials and fetch the JWT token.

3. **AdminPage.jsx**
   - **Description**: The admin page component provides the admin with the ability to manage users, including toggling their statuses and updating their roles.
   - **Features**:
     - Displays a table with all users' details (ID, Username, Email, Role, Status).
     - Allows the admin to activate/deactivate user accounts.
     - Provides a dropdown to change user roles (Admin, Moderator, User).
   - **Props**: None
   - **State**:
     - `users`: An array of users fetched from the API.
     - `loading`: A boolean state that indicates if the data is still loading.
   - **API Integration**:
     - `getAllUsers`: Fetches all users from the backend.
     - `updateUserStatus`: Updates the status (active/disabled) of a user.
     - `updateUserRole`: Updates the role of a user (Admin, Moderator, User).
4. **RegisterPage.jsx**
  - **User Input Form**: 
  - The form collects the following fields from the user:
    - **Username**
    - **Email**
    - **Password**
    - **Role** (Admin, Moderator, User)
  - **Validation**: 
    - Ensures all fields are filled.
    - Validates the password length (minimum length requirement) and confirms the password.
    - Displays error messages if validation fails.
  - **Role Selection**: 
    - Users can select the role they wish to assign to the newly created account (Admin, Moderator, or User).
  - **API Integration**: 
    - Sends a POST request to the backend API (`/api/register`) with the user details to create a new user.
    - Upon successful registration, the user is redirected to the login page.
  - **Error Handling**: 
    - If registration fails (e.g., due to duplicate usernames or emails), an error message is displayed.
  - **Success Message**: 
    - After a successful registration, the user is shown a success message and redirected to the login page.

5. **State Management**
  - `username`: Stores the username input by the user.
  - `email`: Stores the email input by the user.
  - `password`: Stores the password input by the user.
  - `confirmPassword`: Stores the confirm password input by the user.
  - `role`: Stores the selected role for the user.
  - `error`: Stores error messages (if any).
  - `success`: A boolean flag to show whether the registration was successful or not.
---
# Frontend is structured as Follows
```
Frontend/
|
|--dist
|    |--output.css
|--public
|--src
|   |--assets
|   |--components
|   |    |--AdminPage.jsx
|   |    |--Dashboard.jsx
|   |    |--Login.jsx
|   |    |--Navbar.jsx
|   |    |--Register.jsx
|   |    |--UserList.jsx
|   |--services
|   |   |--api.js
|   |--App.css
|   |--App.jsx
|   |--index.css
|   |--main.jsx
|--.gitignore
|--package.json
|--tailwind.config.js
```

### Prerequisites

- [Node.js](https://nodejs.org) (>= v14.0.0)
- [npm](https://www.npmjs.com/) (>= v6.0.0)

### Steps to Run Locally

1. **Clone the repository**:

    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

   This will start the application at `http://localhost:5173`.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## Acknowledgments

- React.js for the frontend framework.
- Tailwind CSS for styling.
- JWT for secure authentication.
- Axios for API requests.

## Contact

For any questions or issues, feel free to reach out to me at:  
Email: jammisettyyoganand@gmail.com  
GitHub: [Yoganand](https://github.com/YOGANAND2003)


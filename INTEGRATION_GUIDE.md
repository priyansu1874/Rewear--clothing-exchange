# Frontend-Backend Integration Guide

This document explains how the ReWear frontend has been integrated with the backend authentication system.

## Integration Overview

The frontend now connects to the backend API for user authentication, including signup, login, profile management, and protected routes.

## Key Changes Made

### 1. Authentication Service (`src/services/authService.ts`)
- Created a comprehensive API service to handle all backend communication
- Implements proper error handling with custom `ApiError` class
- Manages JWT tokens in localStorage
- Provides methods for signup, login, profile management, and logout

### 2. Updated AuthContext (`src/contexts/AuthContext.tsx`)
- Modified to use real backend API instead of mock data
- Updated User interface to match backend response structure
- Added proper error handling and loading states
- Maintains backward compatibility with existing UI components

### 3. Updated Authentication Pages

#### Signup Page (`src/pages/auth/Signup.tsx`)
- Changed from single "name" field to separate "firstName" and "lastName" fields
- Updated form validation and error handling
- Now sends proper request format to backend

#### Login Page (`src/pages/auth/Login.tsx`)
- Enhanced error handling to display specific API error messages
- Maintains existing UI/UX while connecting to real backend

### 4. Environment Configuration
- Added `.env` and `.env.example` files for API URL configuration
- Default backend URL: `http://localhost:5000/api`

## API Integration Details

### Request/Response Format

**Signup Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**API Response Format:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-01-12T...",
      "updatedAt": "2025-01-12T..."
    },
    "token": "jwt_token_here"
  }
}
```

### Authentication Flow

1. **Signup/Login**: User submits credentials → API call → Store JWT token → Update user state
2. **Protected Routes**: Check for valid token → Fetch user profile if token exists → Allow/redirect
3. **API Calls**: Include `Authorization: Bearer <token>` header for protected endpoints
4. **Logout**: Call logout endpoint → Remove token from localStorage → Clear user state

## Running the Application

### Prerequisites
1. Backend server running on `http://localhost:5000`
2. MongoDB database connected
3. Environment variables configured

### Frontend Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your backend URL if different from default.

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Backend Setup
1. **Navigate to backend directory:**
   ```bash
   cd ../backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Update MongoDB URI and JWT secret in `.env`.

4. **Start backend server:**
   ```bash
   npm run dev
   ```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Validation**: Strong password requirements enforced
- **Input Validation**: Server-side validation with detailed error messages
- **Protected Routes**: Client-side route protection with automatic redirects
- **Token Management**: Automatic token storage and cleanup

## Error Handling

The integration includes comprehensive error handling:

- **Network Errors**: Displayed as user-friendly messages
- **Validation Errors**: Field-specific error messages from backend
- **Authentication Errors**: Proper handling of invalid credentials
- **Token Expiration**: Automatic logout and redirect to login

## Backwards Compatibility

The integration maintains compatibility with existing UI components:

- **Points System**: Temporary default points value (150) assigned to maintain existing functionality
- **User Interface**: All existing user properties maintained
- **Component Props**: No changes required to existing components

## Future Enhancements

1. **Points System Integration**: Connect to backend points management
2. **Profile Picture Upload**: Implement file upload functionality  
3. **Real-time Updates**: WebSocket integration for live updates
4. **Refresh Token**: Implement refresh token mechanism
5. **Email Verification**: Add email verification flow

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for frontend URL
2. **Connection Refused**: Check if backend server is running on correct port
3. **Token Errors**: Clear localStorage and try logging in again
4. **Validation Errors**: Check request format matches backend expectations

### Debug Steps

1. Check browser network tab for API request/response details
2. Verify backend server logs for error messages
3. Ensure environment variables are loaded correctly
4. Check MongoDB connection in backend

## Testing the Integration

### Test Signup Flow
1. Navigate to `/signup`
2. Fill form with valid data:
   - firstName: "John"
   - lastName: "Doe"  
   - email: "john@example.com"
   - password: "SecurePassword123"
3. Submit and verify successful registration

### Test Login Flow
1. Navigate to `/login`
2. Enter registered credentials
3. Verify successful login and redirect to dashboard

### Test Protected Routes
1. Try accessing `/dashboard` without login (should redirect to `/login`)
2. Login and verify access to protected routes
3. Test logout functionality

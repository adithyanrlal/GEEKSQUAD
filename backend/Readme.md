# Geeksquad Backend API Documentation

## Overview

This documentation provides details about the API endpoints for the Geeksquad backend, specifically focusing on the signup and login functionalities for both consumers and producers.

## Table of Contents

- [Consumer Endpoints](#consumer-endpoints)
  - [Signup](#consumer-signup)
  - [Login](#consumer-login)
- [Producer Endpoints](#producer-endpoints)
  - [Signup](#producer-signup)
  - [Login](#producer-login)

## Consumer Endpoints

### Consumer Signup

**Endpoint:** `POST /consumers/signup`

**Description:** This endpoint allows a new consumer to sign up. The consumer must provide a name, email, and password. The email must be unique and the password must be at least 6 characters long.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "consumer@example.com",
  "password": "password123"
}
```
**Response:**

**Success (201 Created):**
```json
{
    "id": "12345",
    "name": "John Doe",
    "email": "consumer@example.com",
    "createdAt": "2023-10-01T12:00:00Z"
}
```

**Error (400 Bad Request):**
```json
{
    "error": "Email already exists"
}
```

### Consumer Login

**Endpoint:** `POST /consumers/login`

**Description:** This endpoint allows a consumer to log in. The consumer must provide an email and password.

**Request Body:**
```json
{
    "email": "consumer@example.com",
    "password": "password123"
}
```
**Response:**

**Success (200 OK):**
```json
{
        "id": "12345",
        "name": "John Doe",
        "email": "consumer@example.com",
        "token": "jwt-token-here"
}
```

**Error (401 Unauthorized):**
```json
{
        "error": "Invalid email or password"
}
```

## Producer Endpoints

### Producer Signup

**Endpoint:** `POST /producers/signup`

**Description:** This endpoint allows a new producer to sign up. The producer must provide a name, email, and password. The email must be unique and the password must be at least 6 characters long.

**Request Body:**
```json
{
    "name": "Jane Smith",
    "email": "producer@example.com",
    "password": "securepassword"
}
```
**Response:**

**Success (201 Created):**
```json
{
        "id": "67890",
        "name": "Jane Smith",
        "email": "producer@example.com",
        "createdAt": "2023-10-01T12:00:00Z"
}
```

**Error (400 Bad Request):**
```json
{
        "error": "Email already exists"
}
```

### Producer Login

**Endpoint:** `POST /producers/login`

**Description:** This endpoint allows a producer to log in. The producer must provide an email and password.

**Request Body:**
```json
{
        "email": "producer@example.com",
        "password": "securepassword"
}
```
**Response:**

**Success (200 OK):**
```json
{
                "id": "67890",
                "name": "Jane Smith",
                "email": "producer@example.com",
                "token": "jwt-token-here"
}
```

**Error (401 Unauthorized):**
```json
{
                "error": "Invalid email or password"
}
```

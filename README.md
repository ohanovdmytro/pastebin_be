<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="50" alt="Nest Logo" /></a>
</p>
<p align="center">A simple <a href="http://nodejs.org" target="_blank">Node.js</a> and <a href="https://nestjs.com/" target="_blank">NestJS</a> based PasteBin application.</p>

# Description

PasteBin is a web application built with NestJS and Prisma that allows users to create, view, and delete text pastes. It uses JWT for authentication and is designed to be simple and scalable.

# Features

- User Authentication: Register and login with email and password.
- Paste Management: Create, retrieve, and delete pastes.
- User-Specific Pastes: Fetch all pastes created by a logged-in user.

# Installation

1. Clone the repository:

```bash
git clone https://github.com/ohanovdmytro/paste-bin.git
cd paste-bin
```

2. Install dependencies:

```bash
npm install
```

3. Set up Prisma:

```bash
npx prisma migrate dev --name init
```

4. Set up your .env file from .env.example

# Running the App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Endpoints

## Authentication

### Register

- **POST /auth/register**
- **Request Body:**

```json
{
  "email": "example@example.com",
  "password": "yourpassword"
}
```

- **Response:**

```json
{
  "id": 1,
  "email": "example@example.com",
  "createdAt": "2023-06-01T00:00:00.000Z"
}
```

### Login

- **POST /auth/login**
- **Request Body:**

```json
{
  "email": "example@example.com",
  "password": "yourpassword"
}
```

- **Response:**

```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "email": "example@example.com"
  }
}
```

## Paste Management

### Create Paste

- **POST /paste**
- **Request Body:**

```json
{
  "title": "My Paste",
  "content": "This is my paste content"
}
```

- **Response:**

```json
{
  "id": 1,
  "title": "My Paste",
  "content": "This is my paste content",
  "userId": 1,
  "createdAt": "2023-06-01T00:00:00.000Z"
}
```

### Get Paste by ID

- **GET /paste/:id**
- **Response:**

```json
{
  "id": 1,
  "title": "My Paste",
  "content": "This is my paste content",
  "userId": 1,
  "createdAt": "2023-06-01T00:00:00.000Z"
}
```

### Get Pastes by User

- **GET /paste**
- **Response:**

```json
[
  {
    "id": 1,
    "title": "My Paste",
    "content": "This is my paste content",
    "userId": 1,
    "createdAt": "2023-06-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Another Paste",
    "content": "Another paste content",
    "userId": 1,
    "createdAt": "2023-06-01T00:00:00.000Z"
  }
]
```

### Delete Paste

- **DELETE /paste/:id**
- **Response: 204 No Content**

# Contacts

Telegram: https://t.me/ohanovdmytro

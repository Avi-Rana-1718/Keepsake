# Nook - Media Storage API

A NestJS-based media storage API that allows users to manage albums and media files with authentication.

## Features

- 🔐 User authentication
- 📁 Album management
- 🖼️ Media upload and management 
- 🔒 Secure session handling
- 🗃️ PostgreSQL database integration
- 📤 Static file serving

## Prerequisites

- Node.js (LTS version)
- PostgreSQL database
- Docker (optional, for containerization)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
SESSION_SECRET=your_session_secret
BASE_URL=your_base_url
PORT=3000 # optional, defaults to 3000
```

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

## Docker Deployment

The project includes a Dockerfile for containerization:

```bash
# Build the Docker image
docker build -t nook-api .

# Run the container
docker run -p 3000:3000 nook-api
```

## API Endpoints

### Authentication
- `POST /auth/create` - Create new user account
- `POST /auth/login` - User login

### Albums
- `GET /albums` - Get all albums for authenticated user
- `POST /albums/create` - Create new album
- `POST /albums/addMedia` - Add media to album
- `DELETE /albums/delete` - Delete album

### Media
- `GET /media` - Get all media for authenticated user
- `GET /media/:mediaId` - Get specific media
- `GET /media/album/:albumId` - Get all media in album
- `POST /media/upload/:albumId` - Upload media to album

## Project Structure

```
src/
├── common/         # Shared interfaces and enums
├── entities/       # TypeORM entities
├── interceptors/   # HTTP interceptors
├── modules/        # Feature modules
│   ├── auth/      # Authentication
│   ├── albums/    # Album management
│   └── media/     # Media handling
└── main.ts        # Application entry point
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Built With

- [NestJS](https://nestjs.com/) - The web framework
- [TypeORM](https://typeorm.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Express Session](https://www.npmjs.com/package/express-session) - Session management

## License

This project is MIT licensed.
```

This README provides a comprehensive overview of your project, including setup instructions, available endpoints, project structure, and other important information for developers who might work with your codebase.This README provides a comprehensive overview of your project, including setup instructions, available endpoints, project structure, and other important information for developers who might work with your codebase.

Avi-Rana-1718: only half the resposn eis a readme markdown

Workspace: Collecting workspace information# Nook - Media Management API

A NestJS-based REST API for managing media files and albums with secure authentication.

## Features

- User authentication with session management
- Album creation and management
- Media file upload and storage
- CORS enabled for cross-origin requests
- Secure cookie handling
- PostgreSQL database integration
- Static file serving

## Prerequisites

- Node.js (LTS version)
- PostgreSQL database
- Environment variables setup

## Environment Variables

Create a .env file with:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
SESSION_SECRET=your_session_secret
BASE_URL=your_api_base_url
PORT=3000 # optional
```

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/create` - Create new account

### Albums
- `GET /albums` - Get user's albums
- `POST /albums/create` - Create new album
- `POST /albums/addMedia` - Add media to album

### Media
- `GET /media` - Get user's media
- `GET /media/:mediaId` - Get specific media
- `POST /media/upload/:albumId` - Upload media to album

## Docker Support

Build and run with Docker:

```bash
docker build -t nook-api .
docker run -p 3000:3000 nook-api
```

## License

MIT
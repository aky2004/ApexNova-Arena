# ApexNova Arena — Project Report

## Table of Contents
1. [Introduction](#1-introduction)
   1. [Purpose](#11-purpose)
   2. [Scope](#12-scope)
   3. [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
   4. [References](#14-references)
   5. [Overview](#15-overview)
2. [General Description](#2-general-description)
   1. [Product Perspective](#21-product-perspective)
   2. [Product Functions](#22-product-functions)
   3. [User Characteristics](#23-user-characteristics)
   4. [General Constraints](#24-general-constraints)
   5. [Assumptions and Dependencies](#25-assumptions-and-dependencies)
3. [Specific Requirements](#3-specific-requirements)
   1. [External Interface Requirements](#31-external-interface-requirements)
   2. [Functional Requirements](#32-functional-requirements)
   3. [Non-Functional Requirements](#33-non-functional-requirements)
   4. [Design Constraints](#34-design-constraints)
   5. [Other Requirements](#35-other-requirements)
4. [Analysis Models](#4-analysis-models)
   1. [Architecture](#41-architecture)
   2. [Data Flow](#42-data-flow)
   3. [Event Model](#43-event-model)
5. [Project Structure and File Responsibilities](#5-project-structure-and-file-responsibilities)
6. [Deployment and Setup](#6-deployment-and-setup)
7. [References](#7-references)
A. [Appendices](#a-appendices)

---

## 1. Introduction

### 1.1 Purpose
This document describes the ApexNova Arena software product and provides a detailed project report for development, design, and deployment. It is intended for stakeholders, developers, and evaluators who need a complete understanding of the system’s architecture, features, user interactions, and implementation details.

### 1.2 Scope
ApexNova Arena is a full-stack competitive gaming platform built as a web application. It includes:
- A React front-end user interface
- A Laravel back-end API and WebSocket services
- Real-time match rooms, chat, friend management, and leaderboards
- Support for email/OTP registration, Google login, and profile management
- A PostgreSQL database with support for persistent game and leaderboard data

The system is designed to support competitive multiplayer sessions and player engagement through social and real-time features.

### 1.3 Definitions, Acronyms, and Abbreviations
- **API**: Application Programming Interface
- **JWT**: JSON Web Token
- **OTP**: One-Time Password
- **WS**: WebSocket
- **SPA**: Single-Page Application
- **DB**: Database
- **UI**: User Interface
- **SRS**: Software Requirements Specification

### 1.4 References
- Laravel 11 documentation
- React 19 + Vite documentation
- Laravel Reverb / Echo broadcasting docs
- PostgreSQL documentation
- Cloudinary upload API docs
- Firebase Google sign-in docs

### 1.5 Overview
This report is organized into system description, detailed requirements, architecture analysis, file responsibilities, and deployment instructions. It maps the codebase structure directly to the product’s intended functionality.

---

## 2. General Description

### 2.1 Product Perspective
ApexNova Arena is a browser-based gaming ecosystem. The frontend is a React SPA served separately from the Laravel backend. The backend exposes REST endpoints for user, lobby, room, and leaderboard interactions, and uses Laravel Reverb to support real-time broadcasts.

### 2.2 Product Functions
The main product functions include:
- Authentication and authorization (OTP + Google login)
- Player profile management and avatar uploads
- Friends and social connections
- Lobby overview and game discovery
- Match room creation and management
- Real-time chat and invitations
- Score submission and leaderboards
- Analytics for wins, games played, and rank

### 2.3 User Characteristics
Typical users are online gamers with the following needs:
- Fast authentication and secure access
- Instant game invitations and live room updates
- Simple friend discovery and social networking
- Clear leaderboard and achievement visibility
- Responsive UI in modern browsers

### 2.4 General Constraints
- Backend requires PHP 8.3 and Laravel 11
- Frontend requires React 19 with Vite
- Database is PostgreSQL; Redis is used for OTP caching and session support
- Live features rely on WebSocket connectivity
- Avatar upload uses Cloudinary

### 2.5 Assumptions and Dependencies
- The application is expected to run in local development or a cloud environment with access to PostgreSQL, Redis, and Cloudinary
- Email OTP delivery uses an external Resend API
- Google login depends on Firebase credentials
- Frontend and backend use separate environment files for configuration

---

## 3. Specific Requirements

### 3.1 External Interface Requirements
#### 3.1.1 User Interfaces
- React SPA pages: home, login/signup modals, lobby, leaderboard, profile, match room
- Protected routes for authenticated areas
- Real-time notifications and live invite listeners

#### 3.1.2 Hardware Interfaces
- Standard desktop or mobile web browser
- No specialized hardware required

#### 3.1.3 Software Interfaces
- Backend API: `backend/routes/api.php`
- WebSocket broadcast auth: `backend/routes/channels.php`
- Frontend WebSocket client: `frontend/src/core/lib/echo.js`

#### 3.1.4 Communications Interfaces
- HTTP/HTTPS REST calls from frontend to backend
- WebSocket connections for real-time events
- Cloudinary for image uploads
- Firebase / Google OAuth for third-party login

### 3.2 Functional Requirements
#### 3.2.1 Authentication and Registration
- `POST /api/auth/send-otp` sends email OTP to new users
- `POST /api/auth/verify-otp` validates the one-time code
- `POST /api/auth/register` creates new user accounts
- `POST /api/auth/login` signs users in with email and password
- `POST /api/auth/google` signs in via Google OAuth

#### 3.2.2 Profile Management
- `GET /api/profile/me` retrieves current user data
- `POST /api/profile/avatar` uploads and updates user avatar via Cloudinary
- `PATCH /api/profile/update` updates user name and gamer tag
- `POST /api/profile/change-password` updates password securely
- `POST /api/profile/score` submits solo game scores

#### 3.2.3 Social and Lobby
- `GET /api/lobby/overview` displays user lobby, friends, and leaderboard snapshot
- `POST /api/lobby/friends` sends friend requests
- `GET /api/lobby/friends/search` searches players for friend or invite actions
- `POST /api/lobby/friends/accept` and `/reject` process pending friend requests
- `DELETE /api/lobby/friends/{id}` removes friendships

#### 3.2.4 Game Room Lifecycle
- `POST /api/rooms` creates a new game room
- `POST /api/rooms/invite` invites a friend to a room
- `GET /api/rooms/{code}` returns room state
- `POST /api/rooms/{code}/join` joins a waiting room
- `POST /api/rooms/{code}/leave` leaves the room
- `POST /api/rooms/{code}/ready` toggles ready status
- `POST /api/rooms/{code}/start` starts match if host
- `POST /api/rooms/{code}/chat` sends a chat message
- `POST /api/rooms/{code}/score` submits match score
- `GET /api/rooms/{code}/messages` fetches chat history

#### 3.2.5 Leaderboard
- `GET /api/leaderboard` retrieves global ranking data
- Supports filters by game type and time window in backend logic

### 3.3 Non-Functional Requirements
#### 3.3.1 Performance
- Use WebSocket broadcasts for low-latency room updates
- API queries are limited and pagination-ready
- Leaderboard aggregates data efficiently via SQL

#### 3.3.2 Reliability
- Backend logs broadcast failures without crashing
- JWT session rehydration supports page refreshes
- Friend request workflow prevents duplicate or repeated requests quickly

#### 3.3.3 Availability
- Application is deployable as separate frontend and backend services
- Local development supports independent service startup

#### 3.3.4 Security
- JWT guards all protected routes
- Passwords hashed with Laravel secure hashing
- File uploads validated for image file type and size
- WebSocket subscription auth is custom-authorized using JWT

#### 3.3.5 Maintainability
- Clear separation of concerns in frontend module structure
- Reusable utilities and provider patterns for auth and real-time communication
- Backend controllers organized by domain

#### 3.3.6 Portability
- Frontend uses standard web technologies supported by modern browsers
- Backend uses Laravel conventions and can run on any PHP-compatible host

### 3.4 Design Constraints
- Game rooms are limited to max 4 players per room
- Pending game invites expire after 30 seconds
- Friend request re-sends are limited by a 1-minute cooldown
- Only hosts may start a match
- Room status transitions: `waiting` → `active` → `finished`

### 3.5 Other Requirements
- User search must filter out self and existing friends when sending invites
- Match results should award winner points and persist scores
- Room leaving must reassign host if the current host leaves

---

## 4. Analysis Models

### 4.1 Architecture
ApexNova Arena is architected as a two-tier web application:
- Frontend: React SPA with route protection and global state via `AuthContext` and `MatchContext`
- Backend: Laravel API plus WebSocket broadcasting using Reverb

The core architecture patterns are:
- RESTful API endpoints for data operations
- JWT-based auth for user sessions
- WebSocket events for real-time state
- Eloquent models for business entities

### 4.2 Data Flow
1. User authenticates and receives JWT
2. Frontend stores token and user profile in localStorage
3. Authenticated API calls use `Authorization: Bearer` headers
4. Lobby and game data fetches return current user state
5. Game actions update database and broadcast events to connected peers
6. Leaderboard queries aggregate stored game scores

### 4.3 Event Model
Major backend broadcast events include:
- `FriendRequestEvent`: notifies target users of incoming friend requests
- `GameInviteEvent`: notifies invitees of game room invitations
- `RoomUpdated`: updates room participant state and readiness
- `ChatMessageSent`: delivers in-room chat messages

---

## 5. Project Structure and File Responsibilities

### Root
- `docker-compose.yml`: service orchestration for local environment
- `package.json`: workspace metadata and scripts
- `README.md`: project report and documentation

### Backend
- `backend/app/Http/Controllers/AuthController.php`: login, registration, OTP, Google auth
- `backend/app/Http/Controllers/LobbyController.php`: friends, lobby overview, search, pending invites
- `backend/app/Http/Controllers/GameRoomController.php`: room lifecycle, invites, chat, score submission
- `backend/app/Http/Controllers/LeaderboardController.php`: ranking calculations
- `backend/app/Http/Controllers/ProfileController.php`: user profile and avatar upload
- `backend/app/Models/`: domain objects and relationships
- `backend/routes/api.php`: endpoint definitions
- `backend/routes/channels.php`: private broadcast channels

### Frontend
- `frontend/src/main.jsx`: React root and browser router
- `frontend/src/core/App.jsx`: route definitions, global UI wrappers, page composition
- `frontend/src/core/lib/api.js`: HTTP header helper and API base URL
- `frontend/src/core/lib/echo.js`: WebSocket initialization and auth
- `frontend/src/modules/auth/context/AuthContext.jsx`: auth state management
- `frontend/src/modules/shared/components/GlobalInviteListener.jsx`: global event handling for invites
- `frontend/src/modules/dashboard/pages/LobbyPage.jsx`: main lobby dashboard
- `frontend/src/modules/dashboard/pages/LeaderboardPage.jsx`: leaderboard page UI
- `frontend/src/modules/dashboard/pages/ProfilePage.jsx`: profile management UI

---

## 6. Deployment and Setup

### Backend setup
1. `cd backend`
2. `composer install`
3. `cp .env.example .env`
4. `php artisan key:generate`
5. `php artisan migrate --seed`
6. `php artisan serve`
7. `php artisan reverb:start` (optional for real-time service)

### Frontend setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Notes
- `frontend/src/core/lib/api.js` is configured to `http://127.0.0.1:8000/api`
- `frontend/src/core/lib/echo.js` uses the JWT token for WebSocket auth
- Cloudinary and Firebase require valid credentials in environment configuration

---

## 7. References
- Laravel 11 documentation
- React 19 and Vite docs
- Laravel Echo / Reverb docs
- Cloudinary and Firebase OAuth docs

---

## A. Appendices

### A.1 Key Backend Files
- `backend/app/Models/User.php`
- `backend/app/Models/GameRoom.php`
- `backend/app/Models/GameScore.php`
- `backend/app/Events/ChatMessageSent.php`
- `backend/app/Events/RoomUpdated.php`

### A.2 Key Frontend Files
- `frontend/src/modules/auth/components/Signin.jsx`
- `frontend/src/modules/auth/components/Signup.jsx`
- `frontend/src/modules/gaming/pages/MatchRoomPage.jsx`
- `frontend/src/modules/shared/components/Navbar.jsx`
- `frontend/src/modules/shared/components/GlobalInviteListener.jsx`

---

## B. Project Metadata
- Project Name: ApexNova Arena
- Platform: Web-based competitive gaming system
- Backend: Laravel + PHP
- Frontend: React + Vite
- Database: PostgreSQL
- Cache: Redis
- Media Storage: Cloudinary
- Authentication: JWT + OTP + Google OAuth

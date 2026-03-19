# WhatsApp Clone (Microservices + Kafka + Socket.IO)

A full-stack WhatsApp-style clone built with a microservices architecture. It includes API Gateway, Auth Service, Chat Service, and Socket Gateway with Kafka-based eventing, MongoDB for persistence, Redis for presence, and a React frontend.

## Highlights
- Microservices with API Gateway routing
- JWT auth with access + refresh token flow
- Kafka for message events
- Socket.IO for real-time updates
- Redis for online presence
- React dashboard to test all APIs + sockets

## Services Overview
- **API Gateway** (`api-gateway`) - central entry point
- **Auth Service** (`auth-service`) - user registration/login/refresh
- **Chat Service** (`chat-service`) - messages/groups + Kafka producer
- **Socket Gateway** (`socket-gateway`) - Kafka consumer + Socket.IO events
- **Frontend** (`frontend`) - UI for auth/chat/socket testing

## Ports (Local)
- API Gateway: `5004`
- Auth Service: `5000`
- Chat Service: `5001`
- Socket Gateway: `5003`
- Frontend: `5173`
- MongoDB: `27017`
- Redis: `6379`
- Kafka: `9092`

## Architecture (Flow)
1. Client hits **API Gateway**
2. Gateway routes to **Auth** or **Chat**
3. Chat service writes to MongoDB and publishes Kafka event
4. Socket gateway consumes Kafka and emits to clients via Socket.IO
5. Redis tracks online presence

## Environment Files
This repo intentionally contains `.env` files to make it easy to run locally. **Important note:**
- Keeping real secrets in `.env` is unsafe for public sharing
- If sharing on LinkedIn/GitHub, replace secrets with placeholders or test-only values
- Use sample env files in production (example: `.env.example`)

## Local Setup
### 1) Install dependencies
Run inside each service folder:
```bash
npm install
```

### 2) Start infra (Mongo + Redis + Kafka)
```bash
docker compose up -d
```

### 3) Run services (each in its own terminal)
```bash
# Auth Service
cd auth-service
npm run dev

# Chat Service
cd chat-service
npm run dev

# Socket Gateway
cd socket-gateway
npm run dev

# API Gateway
cd api-gateway
npm run dev
```



## API Endpoints (via API Gateway)
Base URL: `http://localhost:5004`

### Auth
- `POST /api/auth/register`
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}
```

- `POST /api/auth/login`
```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

- `POST /api/auth/refresh`
```json
{
  "refreshToken": "PASTE_REFRESH_TOKEN_HERE"
}
```

### Chat (Protected)
Header: `Authorization: Bearer <ACCESS_TOKEN>`

- `POST /api/chat/messages/send`
```json
{
  "senderId": "user_1",
  "receiverId": "user_2",
  "conversationId": "conv_1",
  "text": "Hello from Postman",
  "status": "sent"
}
```

- `POST /api/chat/groups/create`
```json
{
  "name": "My Group",
  "members": ["user_1", "user_2", "user_3"],
  "admin": "user_1"
}
```

## Socket Events
Socket URL: `http://localhost:5003`

Connect with auth:
```json
{
  "token": "PASTE_ACCESS_TOKEN"
}
```

Events:
- `join`
- `typing` `{ "to": "user_2" }`
- `stop_typing` `{ "to": "user_2" }`
- `seen` `{ "to": "user_2", "messageId": "msg_123" }`

## Frontend
A React dashboard is included to test:
- Register/Login
- Access/refresh token flow
- Send message / Create group
- Socket connect + events

Run:
```bash
cd frontend
npm install
npm run dev
```

## Notes for Sharing (LinkedIn/CV)
- This project is designed to demonstrate microservices architecture, real-time communication, and event-driven messaging.
- If you plan to make it public, replace real secrets in `.env` with safe placeholders.

## License
MIT

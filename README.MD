# Video Conferencing Application (Scalable Monolith → Microservices Ready)

A real-time video conferencing platform built to understand backend architecture, WebRTC, and scalable system design.
The system is designed as a modular monolith so it can later be converted into microservices.

---

## 🚀 Features

### Authentication

* Register / Login (JWT based)
* Protected routes

### Meetings

* Create meeting
* Join via meeting ID
* Participant list
* Meeting history

### Real-Time Video (WebRTC)

* Peer to peer video/audio
* Camera on/off
* Mute/unmute
* Auto reconnection

### Chat

* Real-time messaging
* Persistent messages

### Scaling Features

* Room-based socket events
* Redis adapter for multi-instance support
* Active speaker mode (supports ~50 users)

---

## 🏗️ Architecture

Frontend communicates only with backend API & WebSocket server.

Browser ↔ WebRTC ↔ Browser (media)
Browser ↔ Server (signaling + control)

Backend is structured in modules to later convert into microservices.

---

## 🛠️ Tech Stack

### Frontend

* React / Next.js
* WebRTC
* Socket.IO Client
* TailwindCSS

### Backend

* Node.js (Express/NestJS structured modules)
* Socket.IO
* MongoDB Atlas
* Redis (Upstash)

### Deployment

* Frontend → Vercel
* Backend → Render

---

## 📁 Backend Structure

```
backend/
 ├── modules/
 │     ├── auth/
 │     ├── users/
 │     ├── meetings/
 │     ├── chat/
 │
 ├── websocket/
 ├── webrtc/
 ├── config/
 └── app.js
```

---

## 🔌 Environment Variables

### Backend

```
PORT=
MONGO_URI=
JWT_SECRET=
REDIS_URL=
CLIENT_URL=
```

### Frontend

```
NEXT_PUBLIC_API=
NEXT_PUBLIC_SOCKET=
```

---

## ▶️ Running Locally

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🌍 Deployment

1. Push backend to Render Web Service
2. Add environment variables
3. Push frontend to Vercel
4. Update API URLs

---

## 📈 Scalability Design

The server does NOT handle media streaming.
It only manages signaling & events.

Video is peer-to-peer via WebRTC, allowing large rooms with minimal server load.

Optimizations used:

* Active speaker video rendering
* Socket room isolation
* ICE throttling
* Redis adapter

---

## 🔮 Future Microservices Plan

Modules will be separated into services:

* Auth Service
* Meeting Service
* Signaling Service
* Chat Service
* Notification Service

Event communication will use RabbitMQ/Kafka.

---

## 🎯 Learning Goals

This project demonstrates understanding of:

* WebRTC internals
* Real-time systems
* Scalable backend architecture
* Stateful connections
* Event driven design
* Preparation for microservices

---

## 📜 License

Educational project for learning distributed backend architecture.

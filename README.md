# Bracket Brawl

A real-time, 1v1 competitive programming duel platform designed for low-latency matchmaking and secure execution of user-submitted code. Players queue up, match with an opponent, and race to solve an algorithmic challenge.

This project demonstrates the successful integration of a robust REST API, full-duplex WebSocket communications, and a well-structured NoSQL database system.

---

## Tech Stack

- **Frontend:** React (Vite), React Router, CSS Modules, Monaco Editor, Socket.IO-Client
- **Backend:** Node.js, Express.js, Socket.IO
- **Database:** MongoDB, Mongoose (ODM)
- **Code Execution Environment:** Piston API (Multi-language sandbox)
- **Authentication:** JWT (JSON Web Tokens) & bcrypt

---

## Project Architecture

The architecture relies on a **Client-Server model** handling HTTP for stateless operations (Auth, Profiles, Histories) and **WebSockets** for stateful, real-time gaming loops.

### Directory Structure

```
bracket-brawl/
├── client/          # React Frontend application
│   ├── src/
│   │   ├── components/  # Shared layouts (Header, Routes)
│   │   ├── pages/       # Core Views: Home, Arena, Login, Signup
│   │   └── templates/   # Boilerplate code for Monaco Editor
├── server/          # Node.js/Express Backend application
│   ├── controllers/ # HTTP Request handlers (Auth, User)
│   ├── middlewares/ # JWT Verification & Protection
│   ├── models/      # Mongoose Database Schemas (The Core Data Layer)
│   ├── routes/      # Express API endpoints
│   ├── services/    # External API Integrations (Piston Code Execution)
│   └── socket/      # WebSocket Event Listeners & Managers
```

---

## Database Architecture (DBMS Design)

Since this platform is heavily reliant on user tracking and statistics, the NoSQL schema is built relationally using Mongoose `ObjectIds`.

Here are the primary entities managed in the MongoDB database:

### 1. User (`User.js`)

Stores player credentials, statistics, and references to their activity.

- `username`: String (Unique)
- `email`: String (Unique)
- `password`: String (Hashed via bcrypt)
- `rating`: Number (Elo-like rating, defaults to 1200)
- `matches`: Array of `ObjectId` (Refs: Match)
- `submissions`: Array of `ObjectId` (Refs: Submission)
- _Timestamps_: `createdAt`, `updatedAt`

### 2. Match (`Match.js`)

Represents an instance of a 1v1 game between two users. It records the state of the active or passed session.

- `users`: Array of `ObjectId` (Refs: User) [Size: 2]
- `problem`: `ObjectId` (Ref: Problem)
- `submissions`: Array of `ObjectId` (Refs: Submission made during this match)
- `winner`: `ObjectId` (Ref: User) allowing `null` for Draws/Disconnects.
- `status`: String (`"waiting"`, `"ongoing"`, `"completed"`, `"aborted"`)

### 3. Problem (`Problem.js`)

The algorithmic challenges served to users. Test cases are stored directly via a sub-document schema.

- `title`, `description`, `constraints`: Strings
- `difficulty`: String (`easy`, `medium`, `hard`)
- `tags`: Array of Strings
- `sampleTestCases`: Array of Subdocuments `[{input, output, explanation}]`
- `hiddenTestCases`: Array of Subdocuments `[{input, output}]`

### 4. Submission (`Submission.js`)

Documents every piece of code submitted by a user for execution evaluation against the Problem's hidden test cases.

- `user`: `ObjectId` (Ref: User)
- `problem`: `ObjectId` (Ref: Problem)
- `code`: String (Raw source code)
- `language`: String (`c`, `c++`, `java`, `python`, `javascript`)
- `result`: String (`Pending`, `Accepted`, `Wrong Answer`, `Time Limit Exceeded`, etc.)

---

## WebSocket Event Lifecycle (The Match Engine)

Real-time battles are facilitated via Socket.IO. The lifecycle is as follows:

1. **Authentication:** Connecting sockets pass the standard JWT in `auth: { token }`. The server validates this token before allowing the connection.
2. **`join_queue`:** A player emits this event and is placed in an active queue array on the server.
3. **`game_start`:** When 2 players are in the queue, the server generates a unique `roomId`, randomly selects a `Problem` from the DB, and emits `game_start` to both clients with problem data and opponent info.
4. **`submit_code`:** Players write code and hit submit. The server proxies this code to the Piston API to run against hidden test cases.
5. **`execution_result` & `opponent_status`:** Live reporting back to the UI. Displays "Thinking", "Submitting", "Finished".
6. **`game_over`:** Triggers when all test cases return `Accepted`. Server updates both players' Elo `ratings`, logs the `Match` document as completed, sets the `winner`, and broadcasts the specific rating differentials (e.g. `+16` / `-16`).
7. **`opponent_disconnected`:** A failsafe catching dropped connections and cleanly terminating the queue/match to prevent stuck lobbies.

---

## 🌐 REST API Endpoints

### Auth Routes (`/api/auth`)

- `POST /signup`: Hashes password, creates User, returns JWT.
- `POST /login`: Compares bcrypt hash, returns JWT.

### User Routes (`/api/users` - Protected via JWT)

- `GET /profile`: Fetches the active user's stats and current rating.
- `GET /matches`: Reverses through the database pulling `Match` records populated with opponent data.
- `GET /submissions`: Fetches history of all code executions alongside `result` badges.

---

## UI & Frontend Design

- **Minimalist Aesthetic:** A deliberate `#1e1e1e` / `#0f0f0f` dark mode focusing purely on typography and action metrics (`#2ed573` for victory, `#ff4757` for defeat).
- **Security:** Wrap logic utilizes `<ProtectedRoute>` and `<AuthRoute>` components to conditionally redirect users based on `localStorage` JWT validity.
- **Monaco Editor:** Industry-standard syntax highlighting simulating a raw IDE environment.

---

## How to Run Locally

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd bracket-brawl
   ```

2. **Environment Variables:**
   - Server (`server/.env`):
     ```env
     PORT=3001
     MONGO_URI=mongodb://127.0.0.1:27017/bracketBrawl
     JWT_SECRET=your_super_secret_key
     ```
   - Client (`client/.env`):
     ```env
     VITE_SERVER_URL=http://localhost:3001
     ```

3. **Start the Database:**
   Ensure MongoDB goes brrr on your system.
4. **Run the Backend:**

   ```bash
   cd server
   npm install
   npm run dev
   ```

5. **Run the Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

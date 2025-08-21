# MERN Notes App  

A full-stack **Notes Management Application** built using the **MERN (MongoDB, Express.js, React, Node.js)** stack. The app allows users to create, view, update, and delete personal notes.  

---

## 📌 Features  
- User registration and login with JWT authentication  
- Create, read, update, and delete notes  
- Secure backend API using Express and MongoDB  
- Interactive and responsive frontend using React  
- Clean folder structure for scalability  

---

## 🏗️ Tech Stack  
- **Frontend**: React, Axios, CSS/Tailwind/Bootstrap (based on your choice)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (local or MongoDB Atlas)  
- **Authentication**: JWT (JSON Web Tokens)  

---

## ⚙️ Installation and Setup  

### 1. Clone Repository  

git clone https://github.com/your-username/mern-notes-app.git
cd mern-notes-app


2. Backend Setup

cd backend
npm install

Create .env file in the backend folder:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

Start backend server:
npm start

3. Frontend Setup:
   
cd frontend
npm install
npm start
Backend will run on http://localhost:5000

Frontend will run on http://localhost:3000

📡 API Endpoints

Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Authenticate user
GET	/api/notes	Get all notes (per user)
POST	/api/notes	Create a new note
PUT	/api/notes/:id	Update a note
DELETE	/api/notes/:id	Delete a note

📂 Folder Structure

mern-notes-app/
│
├── backend/         # Express server + MongoDB
│   ├── models/      # Database schemas
│   ├── routes/      # API routes
│   ├── controllers/ # Business logic
│   └── server.js    # Entry point
│
├── frontend/        # React client
│   ├── src/
│   │   ├── components/  
│   │   ├── pages/  
│   │   └── App.js
│
└── README.md

📖 Usage

Start backend (npm start inside backend folder).

Start frontend (npm start inside frontend folder).

Register or login to manage your notes.

📌 Future Improvements

Add search & filter functionality

Add categories or tags for notes

Add dark/light mode toggle

Enable deployment (Vercel + Render + MongoDB Atlas)

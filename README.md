# Task Management Application

A full-stack task management application built with MERN stack (MongoDB-free version using in-memory storage).

## Tech Stack

### Frontend
- React.js (with Vite)
- React Hooks (useState, useEffect)
- Axios for API calls
- Bootstrap + Material UI
- Responsive UI

### Backend
- Node.js
- Express.js
- In-memory array storage (tasks.json)

### Version Control
- Git & GitHub

## Features

- View all tasks
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Responsive design
- Real-time updates

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```
   or for development with auto-reload:
   ```
   npm run dev
   ```

The backend server will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend will run on `http://localhost:5173` (default Vite port).

### Testing APIs with Postman

You can test the backend APIs using Postman:

1. **GET /tasks** - Fetch all tasks
   - Method: GET
   - URL: `http://localhost:3000/tasks`

2. **POST /tasks** - Add new task
   - Method: POST
   - URL: `http://localhost:3000/tasks`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "New Task",
       "description": "Task description"
     }
     ```

3. **PUT /tasks/:id** - Update task
   - Method: PUT
   - URL: `http://localhost:3000/tasks/1` (replace 1 with actual task ID)
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
     ```json
     {
       "title": "Updated Task",
       "description": "Updated description",
       "completed": true
     }
     ```

4. **DELETE /tasks/:id** - Delete task
   - Method: DELETE
   - URL: `http://localhost:3000/tasks/1` (replace 1 with actual task ID)

## Project Structure

```
task-management-application/
├── backend/
│   ├── server.js
│   ├── tasks.json
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── README.md
└── .gitignore
```

## Git Commands

To initialize and push to GitHub:

1. Initialize Git repository:
   ```
   git init
   ```

2. Add all files:
   ```
   git add .
   ```

3. Commit changes:
   ```
   git commit -m "Initial commit: Task Management Application"
   ```

4. Create a repository on GitHub and add remote:
   ```
   git remote add origin https://github.com/yourusername/task-management-app.git
   ```

5. Push to GitHub:
   ```
   git push -u origin master
   ```

## Deployment

### Backend Deployment (Render)

1. **Prepare the backend for deployment:**
   - The backend is already configured to use `process.env.PORT`
   - Ensure `package.json` has the correct start script

2. **Deploy to Render:**
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name:** task-management-backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Click "Create Web Service"

3. **Note the deployed URL** (e.g., `https://task-management-backend.onrender.com`)

### Frontend Deployment (Vercel)

1. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Framework Preset:** Vite
     - **Root Directory:** (leave empty - vercel.json will handle it)
     - **Build Command:** (will use vercel.json)
     - **Output Directory:** (will use vercel.json)
   - Add environment variable:
     - **Name:** `VITE_API_URL`
     - **Value:** Your Render backend URL (e.g., `https://task-management-backend.onrender.com`)
   - Click "Deploy"

3. **Access your deployed application** at the Vercel-provided URL

### Alternative Deployment Options

- **Backend:** Heroku, Railway, DigitalOcean App Platform
- **Frontend:** Netlify, GitHub Pages, Firebase Hosting

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend
Render automatically provides the `PORT` environment variable.

## Contributing

Feel free to fork this repository and submit pull requests.
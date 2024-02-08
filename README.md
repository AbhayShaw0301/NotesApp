# NotesApp

Welcome to NotesApp! This is a simple note-taking application where you can create, edit, and delete notes.

## Getting Started

To clone this project and customize it further, follow the steps below:

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js and npm
- MongoDB Compass or any MongoDB client
- Git (optional, if you want to clone the project)

### Setup

1. **Create an Account on MongoDB Cloud:**

   - Go to MongoDB Cloud website: [MongoDB Cloud](https://www.mongodb.com/cloud)
   - Sign up or log in to your account.
   - Set up a cluster (you can follow MongoDB's documentation for detailed instructions).
   - Once the cluster is set up, obtain the connection string.

2. **Clone the Project:**

   You can directly download the source code .zip file from the GitHub repository: [NotesApp](https://github.com/AbhayShaw0301/NotesApp)
   
   Alternatively, you can use the git clone command in the terminal:
   ```bash
     git clone https://github.com/AbhayShaw0301/NotesApp.git
   ```

3. **Install Dependencies:**

- Open your terminal.
- Navigate to the project directory:
  ```
  cd NotesApp
  ```
- Install backend dependencies:
  ```
  cd backend
  npm install
  cd ..
  ```
- Install frontend dependencies:
  ```
  cd frontend
  npm install
  cd ..
  ```

4. **Create .env File:**

- In the `backend` directory, create a new file named `.env`.
- Open the `.env` file and add the following content:
  ```
  PORT=<enter any valid port number>
  MONGO_DB_CONNECTION_STRING=<your MongoDB connection string>
  SESSION_SECRET=<enter any random string>
  ```

5. **Run Backend and Frontend Servers:**

- Start the backend server:
  ```
  cd backend
  npm start
  ```
- Start the frontend server:
  ```
  cd frontend
  npm start
  ```

6. **Access NotesApp in Your Browser:**

- Once both servers are running, open your browser.
- Enter `localhost:3000` in the address bar to access the NoteSy application.

## Contributing

Contributions are welcome! If you want to contribute to this project, feel free to fork the repository and submit a pull request.


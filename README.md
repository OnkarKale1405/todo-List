# Landing page
![image](https://github.com/OnkarKale1405/todo-app/assets/142905417/60439515-1fe8-4480-827a-c150adcf2e4c)

# MERN Stack Todo App

This is a simple Todo application built using the MERN stack.

## Features

- Create, Read, Update, and Delete (CRUD) operations for Todo items.
- User authentication and authorization.
- Todo items are stored in a MongoDB database.
- Frontend built with React and backend with Node.js and Express.js.

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- Node.js
- MongoDB
- Git (optional)

## Getting Started

### 1. Clone the Repository

git clone https://github.com/your-username/mern-todo-app.git
cd mern-todo-app

### 2. Install Dependencies

cd client
npm install
cd ../server
npm install

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory and add the following environment variables:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
SECRET_KEY=your_secret_key

### 4. Start the Server and Client

cd ../server
npm dev

cd ../client
npm start

The server will start at `http://localhost:8000` and the client at `http://localhost:3000`.

### 5. Access the Application

Open your web browser and navigate to `http://localhost:3000` to access the Todo application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

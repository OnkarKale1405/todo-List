import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));
app.use(express.static("public"));
app.use(cookieParser())


// routes import 
import userRouter from "./routes/user.routes.js"
import todoRouter from "./routes/todo.routes.js"
import subTodoRouter from "./routes/subTodo.routes.js"

// routes declaration
app.use("/v1/api/users", userRouter);
app.use("/v1/api/todos", todoRouter);
app.use("/v1/api/subTodos", subTodoRouter);

// ------------ Development ------------------ //

const __dirname1 = path.resolve();
if(process.env.NODE_ENV){
    app.use(express.static(path.join(__dirname1,'/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    })
} else {
    app.get('/', (req, res) => {
        res.send("API is running successfully");
    })
}

// ------------ Development ------------------ //

export { app };
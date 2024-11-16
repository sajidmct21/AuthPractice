import express from "express";
import roleRouter from '../src/routes/role.routes.js'
import userRouter from '../src/routes/user.routes.js'
import authRouter from '../src/routes/auth.routes.js'
import cookieParser from "cookie-parser";
import ErrorHandler from "./middlewares/globalError.middlerware.js";

const app = express();

app.use(express.json());
app.use(cookieParser())

// Register Role Routes
app.use('/api/role', roleRouter)

// Register User Route
app.use('/api/user',userRouter)

// Register Auth Route
app.use('/api/auth',authRouter)

// Error Middleware
app.use(ErrorHandler)

export {app}
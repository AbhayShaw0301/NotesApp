import "dotenv/config";
import express, {NextFunction} from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "../src/routes/user";
import notesRoutes from "../src/routes/notes";
import createHttpError, {isHttpError} from "http-errors";
import session from "express-session";
import env from "../src/util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}))
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// @ts-ignore
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unkown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    // @ts-ignore
    res.status(statusCode).json({error: errorMessage})

});


export default app;
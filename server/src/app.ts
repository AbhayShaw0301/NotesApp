import "dotenv/config";
import express, {NextFunction} from "express";
import morgan from "morgan";

import notesRoutes from "../src/routes/notes";
import createHttpError, {isHttpError} from "http-errors";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/notes",notesRoutes);
app.use((req, res, next) => {
   next(createHttpError(404, "Endpoint not found"));
});

// @ts-ignore
app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
   console.error(error);
   let errorMessage="An unkown error occurred";
   let statusCode=500;
   if(isHttpError(error))
   {
      statusCode=error.status;
      errorMessage=error.message;
   }
   // @ts-ignore
   res.status(statusCode).json({error:errorMessage})

});



export default app;
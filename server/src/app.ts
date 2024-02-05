import "dotenv/config";
import express, {NextFunction} from "express";
import morgan from "morgan";

import notesRoutes from "../src/routes/notes";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/notes",notesRoutes);
app.use((req, res, next) => {
   next(Error( "Endpoint not found"));
});

// @ts-ignore
app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
   console.error(error);
   let errorMessage="An unkown error occurred";
   if(error instanceof Error) errorMessage=error.message;
   // @ts-ignore
   res.status(500).json({error:errorMessage})

});



export default app;
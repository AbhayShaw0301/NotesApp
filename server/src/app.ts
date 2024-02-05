import "dotenv/config";
import express, {NextFunction} from "express";
import NoteModel from "../src/models/note";


const app = express();

app.get("/",async(req,res,next)=>{
   try{
      const notes = await NoteModel.find().exec();
      res.status(200).json(notes);
   }catch (error) {
      next(error);

   }

});
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
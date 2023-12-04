// console.log("gdgdgddd")
import express from "express";
import router from "./routes/routes";
import config from "./config/main-config";
import ErrorHandler from "./middleware/error.middleware";

import connectDatabase from "./config/db-config";
import dotenv from "dotenv"

dotenv.config()
// console.log(process.env)


const app: express.Application= express();

app.use(express.json())

console.log(new Date())
console.log(Date.now())
app.use("/api/v1",router)


///connect t o database
connectDatabase()

app.use(ErrorHandler);


app.listen( config.server.port, ()=>{
    console.log(`App is now running on port:${config.server.port}`)
})
  
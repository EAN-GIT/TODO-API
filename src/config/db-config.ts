import mongoose, { ConnectOptions } from "mongoose"
import config  from "./main-config"

const dbUrl:string = config.database.dbUrl || ""


async function  connectDatabase() {

    try {
            const options : ConnectOptions ={
                
                }

              await  mongoose.connect(dbUrl,options)
            
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
    
}


export default connectDatabase
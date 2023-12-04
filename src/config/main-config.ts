import  * as dotenv from "dotenv";

dotenv.config()

console.log(process.env)
const config ={
    server:{
        port: process.env.PORT,
        mode : process.env.MODE
    },

    database:{
        dbUrl : process.env.DB_URL || 'mongodb://localhost:27017/todo-api-ts'
        
        
    }
}


export default config
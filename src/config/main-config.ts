import  * as dotenv from "dotenv";

dotenv.config()


const config ={
    server:{
        port: process.env.PORT,
        mode : process.env.MODE
    },

    database:{
        dbUrl : process.env.DB_URL || 'mongodb://localhost:27017/todo-api-ts'
        
        
    },
    jwtServices:{
        jwt_secret : process.env.JWT_SECRET
    }
}


export default config
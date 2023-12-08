import { NextFunction, Request,Response} from "express";
import { CustomError } from "../helpers/error.helper";
import config from "../config/main-config";
import jwt from "jsonwebtoken"
import { IncomingHttpHeaders } from 'http'; // Import IncomingHttpHeaders
import { jwtSign } from "../services/jwt.services";

 
// Extend Request type to include a user property
interface CustomRequest extends Request {
    user?: any; 
    headers: IncomingHttpHeaders & { authorization?: string };
  }
  


 export const authMiddleware = async(req:CustomRequest,res:Response,next:NextFunction)=>{

      
    
    try{
      const authHeader = req.headers.authorization;
      
      const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
        console.log
        (token)
        
        if(!token ) {throw new CustomError("Unauthorised:You have to be logged in",403)}

        const jwtSecret = config.jwtServices.jwt_secret;
      console.log(jwtSecret)
        if (jwtSecret === undefined) {
          throw new CustomError("JWT secret is not defined in the configuration.", 500);
        }
        
        const decoded = jwt.verify(token, jwtSecret);
        console.log("rrfff")

        if(!decoded){throw new CustomError("invalid  or expired token",403)}
        // assiggn user to the request obj
        req.user = decoded;

        next()

    }catch(err){
      console.error(err);
next(err)

    }

 }
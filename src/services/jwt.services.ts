import jwt from "jsonwebtoken"
import config from "../config/main-config"


interface Ijwt {
    userId: number
    role: string
}
export const jwtsign=  (body:Ijwt)=>{

    if (!config.jwtServices.jwt_secret) {
        throw new Error("JWT secret is not defined in the configuration.");
      }
    
    const token = jwt.sign(body,config.jwtServices.jwt_secret, { expiresIn: "54h" })
    return token
}
import jwt from "jsonwebtoken";
import config from "../config/main-config";

interface Ijwt {
  userId: string;
}
export const jwtSign = (body: Ijwt) => {
  console.log(body)
    if (!config.jwtServices.jwt_secret) {
    throw new Error("JWT secret is not defined in the configuration.");
  }
//    const {userId} = body

  const token = jwt.sign(body,config.jwtServices.jwt_secret, {
    expiresIn: "54h",
  });
  return token;
};

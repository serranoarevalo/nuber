import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../keys";

export const createJWT = (userId: number): string => {
  const token = jwt.sign(
    {
      id: userId
    },
    JWT_SECRET
  );
  return token;
};

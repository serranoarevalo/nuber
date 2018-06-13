import jwt from "jsonwebtoken";
import User from "../entities/User";
import { JWT_SECRET } from "../keys";

const getUserFromToken = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = await jwt.verify(token, JWT_SECRET);
    const decodedUser = await User.findOne(decoded.id);
    return decodedUser;
  } catch (err) {
    return err;
  }
};

export default getUserFromToken;

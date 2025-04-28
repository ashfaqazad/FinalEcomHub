import jwt from "jsonwebtoken";

export const authenticateUser = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, username, email }
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

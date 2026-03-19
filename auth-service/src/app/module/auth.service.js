import {User} from "./auth.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import {
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt.js";

export const registerUser = async (data) => {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw new Error("name, email, and password are required");
  }

  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed
  });

  const safeUser = user.toObject();
  delete safeUser.password;
  return safeUser;
};

export const loginUser = async (data) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Error("email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const refreshTokenService = async (token) => {
  if (!token) throw new Error("Refresh token is required");
  const user = await User.findOne({ refreshToken: token });
  if (!user) throw new Error("Invalid refresh token");

  const accessToken = generateAccessToken(user);

  return accessToken;
};

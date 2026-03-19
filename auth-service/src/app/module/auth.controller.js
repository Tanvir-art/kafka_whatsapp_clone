import {
  registerUser,
  loginUser,
  refreshTokenService
} from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const tokens = await loginUser(req.body);
    res.json(tokens);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const accessToken = await refreshTokenService(refreshToken);

    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
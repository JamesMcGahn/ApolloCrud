import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

const protect = async (req, res) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  } else {
    token = false;
  }

  if (!token) {
    return false;
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (user?.passwordChangedAt) {
    const changedTime = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
    if (decoded.iat < changedTime) {
      return false;
    }
  }

  if (!user.isActive) {
    return false;
  }
  return user;
};

export default protect;

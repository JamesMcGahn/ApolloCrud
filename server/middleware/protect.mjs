import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

const protect = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  let isHeaderToken = false;
  let decoded;
  let user = false;

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
    isHeaderToken = true;
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  } else {
    token = false;
  }

  if (!token && !next) {
    return false;
  }

  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id);
  } catch (e) {
    if (!next) {
      return false;
    }
  }

  if (!user && !next) {
    return false;
  }

  if (user.role === 'user' && isHeaderToken && !next) {
    return false;
  }

  if (user?.passwordChangedAt && !next) {
    const changedTime = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
    if (decoded.iat < changedTime) {
      res.cookie('jwt', 'expired', {
        expires: new Date(Date.now() + 1 * 1000),
        http: true,
      });
      return false;
    }
  }

  if (!user.isActive && !next) {
    return false;
  }
  if (!next) {
    return user;
  }

  if (next) {
    req.user = user;
    next();
  }
};

export default protect;

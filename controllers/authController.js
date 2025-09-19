import { UserModel } from '../models/User.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { logger } from '../logger/index.js';

export const userLogin = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    logger.warn(`User with the email ${email} does not exist in the system`);
    const error = new Error(
      `User with the email ${email} does not exists in the system, please try signing up first`
    );
    error.statusCode = 404;
    throw error;
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    logger.warn(`Incorrect password for email ${email}`);
    const error = new Error(`Incorrect password for email ${email}`);
    error.statusCode = 400;
    throw error;
  }
  const access_token = jwt.sign(
    {
      UserInfo: {
        user: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  const refresh_token = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '15d' }
  );
  user.refreshToken = refresh_token;
  await user.save();
  res.cookie('jwt', refresh_token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.json({ access_token });
});

import { UserModel } from '../models/User.js';
import { asyncWrapper } from '../utils/asyncWrapper.js';
import bcrypt from 'bcrypt';
import { logger } from '../logger/index.js';

export const registerUser = asyncWrapper(async (req, res) => {
  const { username, email, password } = req.body;
  const duplicate = await UserModel.findOne({ email });
  if (duplicate) {
    logger.warn(`User with the email ${email} already exists in the system`);
    const error = new Error(
      `User with the email ${email} already exists in the system`
    );
    error.statusCode = 409;
    throw error;
  }
  logger.info('HAshing user password');
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });
  return res.json({ msg: 'User registered successfully' });
});

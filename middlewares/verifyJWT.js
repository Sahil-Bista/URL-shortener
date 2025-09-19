import jwt from 'jsonwebtoken';

export const verifyJWT = (req, res) => {
  const authorization =
    req.headers['Authorization'] || req.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authorization.split(' ')[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);
    req.user = decoded.userInfo.user;
    next();
  });
};

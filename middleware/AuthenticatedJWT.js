const jwt = require('jsonwebtoken');

function authenticatedJWT(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ 
      code: 401,
      message: 'Unauthorized - No token provided' 
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        code: 403,
        message: 'Unauthorized - Invalid token' 
      });
    }

    const parseUser = {
      id: user.user.id,
      username: user.user.username,
      email: user.user.email,
      avatar: user.user.avatar,
      googleId: user.user.googleId,
      googleToken: user.user.googleToken,
      roles: user.user.roles,
    }

    req.user = parseUser;  
    next();
  });
}

module.exports = authenticatedJWT;

// It's a package that allows us to create token for authentications
const jwt = require('jsonwebtoken');

// It checks the authentication 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          throw 'Invalid user ID!';
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
};
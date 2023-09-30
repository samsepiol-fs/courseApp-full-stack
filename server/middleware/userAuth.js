const jwt = require("jsonwebtoken");

const SECRET1 = 'S3cr3t1';

const authenticateJwtUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET1, (err, user) => {
        if(err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      })
    } else {
      res.sendStatus(401);
    }
};

module.exports = {
    SECRET1,
    authenticateJwtUser
}
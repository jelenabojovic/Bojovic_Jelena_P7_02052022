const jwt = require("jsonwebtoken");
require("dotenv").config();

// check token authentication
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //token verification
    const decodedToken = jwt.verify(token, process.env.JWTTOKEN);
    const userId = decodedToken.userId;
    // verification if the Id matches the Token
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
const { JWT_SECRET } = require("../configuration/config");
const { getToken } = require("../functions/getToken");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        success: false,
        msg: "Token is required",
      });
    }

    const token = getToken(authorization);

    try {
      const verifyToken = await jwt.verify(token, JWT_SECRET);
      
      if (verifyToken.exp && verifyToken.exp < Date.now() / 1000) {
        return res.status(401).json({
          success: false,
          msg: "Token has expired",
        });
      }

      if (verifyToken.uuid ) {
        req.headers.userId = verifyToken.uuid;
        return next();
      } else {
        return res.status(401).json({
          success: false,
          msg: "Invalid token",
        });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(401).json({
        success: false,
        msg: "Invalid token",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "Server error!",
    });
  }
};
module.exports = authMiddleware;

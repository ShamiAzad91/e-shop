require("dotenv").config();
const jwt = require("jsonwebtoken");


const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res.status(401).json({ msg: "Access denied. No token provided" });
  try {
    token = token.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.SECRET);
    // console.log(decoded.exp, "heee");
    // console.log(Date.now() / 1000, "current date");
    if (Date.now() / 1000 >= decoded.exp) {
      return res.status(403).json({ msg: "Access denied.  token expired" });
    }
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

module.exports = verifyToken;

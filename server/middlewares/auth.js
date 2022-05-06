const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")?.filter(Boolean)?.[1]; // "Bearer xxxxx"
  if (!token) {
    req.headers.isAuthenticated = false;
    req.headers.userId = null;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    // handles expired token and other errors
    req.headers.isAuthenticated = false;
    req.headers.userId = null;
    return next();
  }
  if (!decodedToken) {
    req.headers.isAuthenticated = false;
    req.headers.userId = null;
    return next();
  }
  req.headers.isAuthenticated = true;
  req.headers.userId = decodedToken.data._id;
  next();
};

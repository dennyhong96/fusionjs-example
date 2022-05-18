const jwt = require("jsonwebtoken");

const { parseCookie } = require("../library");

module.exports = async function auth(ctx, next) {
  const req = ctx.request;
  const cookies = parseCookie(req.header.cookie);

  const token = cookies["AUTH_TOKEN"];
  if (!token) {
    req.headers.isAuthenticated = false;
    req.headers.userId = null;
    return await next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    // handles expired token and other errors
    req.headers.isAuthenticated = false;
    req.headers.userId = null;
    return await next();
  }
  if (!decodedToken) {
    req.headers.isAuthenticated = false;
    req.headers.userId = null;
    return await next();
  }
  req.headers.isAuthenticated = true;
  req.headers.userId = decodedToken.data._id;
  await next();
};

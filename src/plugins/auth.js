const jwt = require("jsonwebtoken");

module.exports = async function auth(ctx, next) {
  const req = ctx.request;
  if (ctx.path === "/graphql") {
    const token = req.headers["authorization"]
      ?.split(" ")
      ?.filter(Boolean)?.[1]; // "Bearer xxxxx"
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
  } else {
    await next();
  }
};

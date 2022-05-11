const getInitialAuthState = require("./auth");

module.exports = setInitialState = async (ctx) => {
  // Set initial redux state
  return {
    auth: await getInitialAuthState(ctx),
  };
};

const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
const url = require('url');

module.exports = options => {
  return async function adminAuth(ctx, next) {
    const pathName = url.parse(ctx.request.url).pathname;
    let tokenInfo = auth(ctx.request);
    if (
      jwt.verify(tokenInfo, "12345") ||
      pathName === "/api/login" ||
      pathName === "/api/logout" ||
      pathName === "/admin/verify"
    ) {
      await next();
    } else {
      ctx.body = {
        msg: "token错误"
      };
    }
  };
};

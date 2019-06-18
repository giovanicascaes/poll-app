"use strict";

const Token = use("App/Models/Token");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Role {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next, properties) {
    const [type, accessToken] = request.header("Authorization").split(" ");
    const token = await Token.with("user")
      .where({ type: type.toLowerCase(), token: accessToken })
      .first();
    if (!properties.includes(token.toJSON().user.role)) {
      return response.status(401).json({
        message: "Not an admin"
      });
    }
    await next();
  }
}

module.exports = Role;

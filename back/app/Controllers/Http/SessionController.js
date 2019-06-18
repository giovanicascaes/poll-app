"use strict";

const Token = use("App/Models/Token");
const User = use("App/Models/User");

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.only(["email", "password"]);
    const tokenData = await auth.attempt(email, password);
    const token = await Token.create(tokenData);
    const user = await User.findBy("email", email);
    await token.user().associate(user);
    await token.load("user");
    return token;
  }
}

module.exports = SessionController;

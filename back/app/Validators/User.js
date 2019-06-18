"use strict";

const { ROLE_ADMIN, ROLE_USER } = require("../config/roles");

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required",
      email: "required|unique:users|email",
      password: "required|confirmed",
      role: `required|in:${ROLE_ADMIN},${ROLE_USER}`
    };
  }
}

module.exports = User;

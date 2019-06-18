"use strict";

class Vote {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      option_id: "required",
      user_id: "required"
    };
  }
}

module.exports = Vote;

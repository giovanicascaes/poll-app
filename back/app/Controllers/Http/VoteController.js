"use strict";

const campaignBusiness = require("../../business/campaign");

class VoteController {
  async store({ request }) {
    const { option_id: optionId, user_id: userId } = request.only([
      "option_id",
      "user_id"
    ]);
    const vote = await campaignBusiness.storeVote(optionId, userId);
    return vote;
  }
}

module.exports = VoteController;

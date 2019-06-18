"use strict";

const voteBusiness = require("../../business/campaign");

const Token = use("App/Models/Token");
const CampaignOption = use("App/Models/CampaignOption");

class PollController {
  constructor({ socket, request }) {
    this.socket = socket;
    const { campaignId, userId } = request.only(["campaignId", "userId"]);
    this.userId = userId;
    voteBusiness
      .getResults(campaignId)
      .then(results => socket.emit("init", results));
  }

  async onVote(optionId) {
    await voteBusiness.storeVote(optionId, this.userId);
    this.socket.broadcastToAll("vote", optionId);
  }
}

module.exports = PollController;

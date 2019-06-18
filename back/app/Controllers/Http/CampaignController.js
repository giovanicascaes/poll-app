"use strict";

const ObjectID = require("mongodb").ObjectID;

const campaignBusiness = require("../../business/campaign");

const Campaign = use("App/Models/Campaign");
const Vote = use("App/Models/Vote");

const Database = use("Database");

class CampaignController {
  async store({ request }) {
    const { options, ...rest } = request.only([
      "name",
      "due_date",
      "due_time",
      "options"
    ]);
    const campaign = await Campaign.create({ ...rest });
    await campaign
      .options()
      .createMany(options.map(({ option, image }) => ({ option, image })));
    await campaign.load("options");
    return campaign;
  }

  async index() {
    const campaigns = await Campaign.all();
    return campaigns;
  }

  async show({ request, response, params }) {
    const campaign = await Campaign.where("_id", params.id)
      .with("options.votes")
      .first();
    if (campaign === null) {
      response.status(404).send({
        message: "Campaign not found"
      });
      return;
    }
    const campaignJson = campaign.toJSON();
    const campaignJsonWithVotesCount = {
      ...campaignJson,
      options: campaignJson.options.map(option => ({
        ...option,
        votes_count: option.votes.length
      }))
    };
    const { userId } = request.only(["userId"]);
    if (!userId) {
      return campaignJsonWithVotesCount;
    }
    let userHasVoted = false;
    for (let option of campaignJson.options) {
      const vote = await Vote.where({
        campaign_option_id: option._id,
        user_id: userId
      }).first();
      if (vote !== null) {
        userHasVoted = true;
        break;
      }
    }
    return {
      ...campaignJsonWithVotesCount,
      userHasVoted
    };
  }

  async showResults({ params }) {
    return await campaignBusiness.getResults(params.id);
  }
}

module.exports = CampaignController;

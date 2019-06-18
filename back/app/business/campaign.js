const Vote = use("App/Models/Vote");
const Campaign = use("App/Models/Campaign");
const CampaignOption = use("App/Models/CampaignOption");
const User = use("App/Models/User");

module.exports = {
  storeVote: async function(optionId, userId) {
    const vote = new Vote();
    await vote.save();
    const campaignOption = await CampaignOption.find(optionId);
    await vote.campaignOption().associate(campaignOption);
    const user = await User.find(userId);
    await vote.user().associate(user);
    return vote;
  },
  getResults: async function(campaignId) {
    const campaign = await Campaign.where("_id", campaignId)
      .with("options.votes")
      .first();

    return campaign.toJSON().options.map(option => ({
      _id: option._id,
      votes: option.votes.length
    }));
  }
};

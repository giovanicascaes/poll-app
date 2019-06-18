"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Vote extends Model {
  campaignOption() {
    return this.belongsTo("App/Models/CampaignOption");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }

  static get objectIDs() {
    return ["_id", "campaign_option_id", "user_id"];
  }
}

module.exports = Vote;

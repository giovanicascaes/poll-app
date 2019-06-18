"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class CampaignOption extends Model {
  campaign() {
    return this.belongsTo("App/Models/Campaign");
  }

  votes() {
    return this.hasMany("App/Models/Vote");
  }
}

module.exports = CampaignOption;

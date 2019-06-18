"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Campaign extends Model {
  options() {
    return this.hasMany("App/Models/CampaignOption");
  }
}

module.exports = Campaign;

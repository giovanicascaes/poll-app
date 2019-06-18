"use strict";

class CampaignStore {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: "required",
      due_date: "required|date",
      due_time: "required|time",
      options: "required|array|min:2",
      "options.*.option": "required"
    };
  }
}

module.exports = CampaignStore;

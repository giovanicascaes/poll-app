"use strict";

const { ROLE_ADMIN } = require("../app/config/roles");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("sessions", "SessionController.store").validator("Session");
Route.get("campaigns", "CampaignController.index");
Route.get("/campaigns/:id", "CampaignController.show");
Route.get("/campaigns/:id/results", "CampaignController.showResults");
Route.post("users", "UserController.store").validator("User");
Route.group(() => {
  Route.post("votes", "VoteController.store").validator("Vote");
  Route.post("campaigns", "CampaignController.store")
    .validator("Campaign")
    .middleware([`role:${ROLE_ADMIN}`]);
}).middleware(["auth"]);

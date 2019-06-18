import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import store from "./store";
import Home from "./scenes/Home";
import Login from "./scenes/Login";
import NewUser from "./scenes/NewUser";
import Campaign from "./scenes/Campaign";
import NewCampaign from "./scenes/NewCampaign";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/newuser" component={NewUser} />
          <Route exact path="/campaign/:id" component={Campaign} />
          <Route exact path="/newcampaign" component={NewCampaign} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

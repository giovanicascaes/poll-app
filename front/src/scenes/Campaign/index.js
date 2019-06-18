import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import Ws from "@adonisjs/websocket-client";
import moment from "moment";

import NavBar from "../../components/NavBar";
import {
  fetchCampaign,
  vote,
  increaseVoteCount
} from "../../store/actionCreators";
import { API_WS_URL } from "../../config/constants";
import { isLoading } from "../../store/reducers/loading";
import { FETCH_CAMPAIGN } from "../../store/actions";
import placeholderImage from "../../assets/img/placeholder.png";

class Campaign extends Component {
  state = {
    selectedOptionId: null,
    showResults: false,
    isCampaignDue: false,
    formattedDueDateTime: null
  };

  componentDidMount() {
    const {
      fetchCampaign,
      match: {
        params: { id }
      },
      userId
    } = this.props;
    if (userId !== null) {
      fetchCampaign(id, userId);
    } else {
      fetchCampaign(id);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      campaign,
      tokenData,
      userId,
      fetching,
      increaseVoteCount
    } = this.props;
    if (prevProps.fetching && !fetching && campaign !== null) {
      if (tokenData !== null) {
        const ws = Ws(API_WS_URL, {
          query: { campaignId: campaign._id, userId }
        });
        ws.withJwtToken(tokenData.token).connect();
        const poll = ws.subscribe("poll");
        poll.on("vote", increaseVoteCount);
        this.ws = ws;
      }
      const dueDateTime = moment(`${campaign.due_date} ${campaign.due_time}`);
      const now = moment();
      this.setState({
        isCampaignDue: dueDateTime.isBefore(now),
        formattedDueDateTime: dueDateTime.format("DD/MM/YYYY HH:mm")
      });
    }
  }

  componentWillUnmount() {
    if (this.ws) {
      this.ws.close();
    }
  }

  _onClickOption = optionId => {
    const { tokenData, campaign } = this.props;
    if (
      tokenData !== null &&
      !campaign.userHasVoted &&
      !this.state.isCampaignDue
    ) {
      this.setState({ selectedOptionId: optionId });
    }
  };

  _vote = () => {
    this.ws.getSubscription("poll").emit("vote", this.state.selectedOptionId);
    this.props.vote();
    this.setState({ selectedOptionId: null });
  };

  _toggleResults = () => {
    this.setState({ showResults: !this.state.showResults });
  };

  render() {
    const { campaign, tokenData } = this.props;
    const {
      selectedOptionId,
      showResults,
      isCampaignDue,
      formattedDueDateTime
    } = this.state;
    return (
      <>
        <NavBar />
        {campaign === null && <span>Carregando...</span>}
        {campaign !== null && (
          <Jumbotron fluid>
            <h2>{campaign.name}</h2>
            <p>Data/Hora limite: {formattedDueDateTime}</p>
            <ListGroup>
              {campaign.options.map(option => (
                <ListGroup.Item
                  action={
                    tokenData !== null &&
                    !campaign.userHasVoted &&
                    !isCampaignDue
                  }
                  onClick={() => this._onClickOption(option._id)}
                  active={selectedOptionId === option._id}
                  key={option._id}
                >
                  {option.image !== null && (
                    <img
                      alt="imagem_opcao"
                      src={option.image}
                      width="100"
                      height="100"
                    />
                  )}
                  {option.image === null && (
                    <img
                      alt="imagem_opcao_default"
                      src={placeholderImage}
                      width="100"
                      height="100"
                    />
                  )}
                  {option.option}{" "}
                  {/* TODO Show a loading for the votes count */}
                  {showResults && <span>{option.votes_count}</span>}
                </ListGroup.Item>
              ))}
            </ListGroup>
            {tokenData !== null && !campaign.userHasVoted && !isCampaignDue && (
              <Button disabled={selectedOptionId === null} onClick={this._vote}>
                Votar
              </Button>
            )}
            <Button onClick={this._toggleResults}>
              {showResults ? "Ocultar Resultado" : "Mostrar Resultado"}
            </Button>
          </Jumbotron>
        )}
      </>
    );
  }
}

const mapStateToProps = ({
  campaign: { campaign },
  auth: {
    tokenData,
    user: { id }
  },
  loading
}) => ({
  campaign,
  tokenData,
  userId: id,
  fetching: isLoading(loading, FETCH_CAMPAIGN)
});

const mapDispatchToProps = {
  fetchCampaign,
  vote,
  increaseVoteCount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campaign);

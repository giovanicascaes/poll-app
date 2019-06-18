import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { fetchCampaigns } from "../../store/actionCreators";
import NavBar from "../../components/NavBar";

const Container = styled.div`
  padding: 20px;
`;

function Home({ campaigns, fetchCampaigns }) {
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return (
    <div>
      <NavBar />
      {campaigns.length === 0 && <span>Carregando...</span>}
      {campaigns.length > 0 && (
        <Container>
          <ListGroup>
            {campaigns.map(campaign => (
              <ListGroup.Item key={campaign._id}>
                <Link to={`/campaign/${campaign._id}`}>{campaign.name}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      )}
    </div>
  );
}

const mapStateToProps = ({
  campaign: { campaigns },
  auth: {
    tokenData,
    user: { name, role }
  }
}) => ({
  campaigns,
  loggedIn: tokenData !== null,
  userName: name,
  isAdmin: role === "ROLE_ADMIN"
});

const mapDispatchToProps = {
  fetchCampaigns
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

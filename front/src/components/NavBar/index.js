import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function NavBar({ loggedIn, isAdmin, userName }) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/">Home</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          {!loggedIn && (
            <>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/newuser">Cadastrar-se</Link>
              </Nav.Link>
            </>
          )}
          {isAdmin && (
            <>
              <Nav.Link>
                <Link to="/newuser">Novo Usuário</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/newcampaign">Nova Campanha</Link>
              </Nav.Link>
            </>
          )}
        </Nav>
        {userName !== null && (
          <Navbar.Text>
            {/* TODO Implementar logout */}
            Logado como: {userName} | <Link to="/">Sair</Link>
          </Navbar.Text>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = ({
  auth: {
    tokenData,
    user: { name, role }
  }
}) => ({
  loggedIn: tokenData !== null,
  userName: name,
  isAdmin: role === "ROLE_ADMIN"
});

export default connect(mapStateToProps)(NavBar);

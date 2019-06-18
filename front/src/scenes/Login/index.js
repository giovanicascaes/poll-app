import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../store/actionCreators";
import { LOGIN } from "../../store/actions";
import { isLoading } from "../../store/reducers/loading";
import NavBar from "../../components/NavBar";
import { usePrevious } from "../../utils/react";

const Container = styled(Jumbotron)`
  width: 500px;
`;

function Login({ login, tokenData, logingIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function _submit(e) {
    e.preventDefault();
    login(email, password);
  }

  function _clearErrorMessage() {
    setErrorMessage("");
  }

  const prevLogingIn = usePrevious(logingIn);

  useEffect(() => {
    if (prevLogingIn && !logingIn && tokenData === null) {
      setErrorMessage("Email ou senha inválidos");
    }
  }, [tokenData, logingIn, prevLogingIn]);

  if (tokenData !== null) {
    return <Redirect push to="/" />;
  }

  return (
    <>
      <NavBar />
      <Container>
        <h1>Entrar</h1>
        {errorMessage !== "" && <Alert variant="warning">{errorMessage}</Alert>}
        <Form onSubmit={_submit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={_clearErrorMessage}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={_clearErrorMessage}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={logingIn}>
            Entrar
          </Button>
        </Form>
      </Container>
    </>
  );
}

const mapStateToProps = ({ auth: { tokenData }, loading }) => ({
  tokenData,
  logingIn: isLoading(loading, LOGIN)
});

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

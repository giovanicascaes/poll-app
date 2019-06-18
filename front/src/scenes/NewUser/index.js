import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { signup } from "../../store/actionCreators";
import { SIGNUP } from "../../store/actions";
import { isLoading } from "../../store/reducers/loading";
import { isFailure } from "../../store/reducers/request";
import NavBar from "../../components/NavBar";
import { usePrevious } from "../../utils/react";

const Container = styled(Jumbotron)`
  width: 500px;
`;

function NewUser({ signup, tokenData, signUpFailed, signingUp, isAdmin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState(isAdmin ? "" : "ROLE_USER");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function _submit(e) {
    e.preventDefault();
    setSuccessMessage("");
    signup(name, email, password, passwordConfirmation, role);
  }

  function _clearMessage() {
    setErrorMessage("");
    setSuccessMessage("");
  }

  function _onChangeRole(e) {
    setRole(e.target.value);
    _clearMessage();
  }

  const prevSigningUp = usePrevious(signingUp);

  useEffect(() => {
    if (prevSigningUp && !signingUp) {
      if (signUpFailed) {
        setErrorMessage("Preencha todos os campos corretamente!");
      } else if (isAdmin) {
        setSuccessMessage("Usuário criado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setRole("");
      }
    }
  }, [signingUp, prevSigningUp, signUpFailed, isAdmin]);

  if (tokenData !== null && !isAdmin) {
    return <Redirect push to="/" />;
  }

  return (
    <>
      <NavBar />
      <Container>
        <h1>Novo Usuário</h1>
        {errorMessage !== "" && <Alert variant="warning">{errorMessage}</Alert>}
        {successMessage !== "" && (
          <Alert variant="success">{successMessage}</Alert>
        )}
        <Form onSubmit={_submit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={_clearMessage}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={_clearMessage}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={_clearMessage}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPasswordConfirmation">
            <Form.Label>Confirmação da senha</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              onKeyDown={_clearMessage}
            />
          </Form.Group>

          {isAdmin && (
            <Form.Group controlId="formBasicRole">
              <Form.Label>Perfil</Form.Label>
              <Form.Control as="select" value={role} onChange={_onChangeRole}>
                <option value="">Selecione</option>
                <option>ROLE_ADMIN</option>
                <option>ROLE_USER</option>
              </Form.Control>
            </Form.Group>
          )}

          <Button variant="primary" type="submit" disabled={signingUp}>
            Concluir
          </Button>
        </Form>
      </Container>
    </>
  );
}

const mapStateToProps = ({
  auth: {
    tokenData,
    user: { role }
  },
  request,
  loading
}) => ({
  tokenData,
  signUpFailed: isFailure(request, SIGNUP),
  signingUp: isLoading(loading, SIGNUP),
  isAdmin: role === "ROLE_ADMIN"
});

const mapDispatchToProps = {
  signup
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUser);

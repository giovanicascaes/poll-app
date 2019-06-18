import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import NavBar from "../../components/NavBar";
import { createCampaign } from "../../store/actionCreators";
import { CREATE_CAMPAIGN } from "../../store/actions";
import { isFailure } from "../../store/reducers/request";
import { isLoading } from "../../store/reducers/loading";
import { usePrevious } from "../../utils/react";

function NewCampaign({ createCampaign, creating, createFailed }) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [options, setOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function _addOption() {
    setOptions(prevOptions => [...prevOptions, {}]);
  }

  function _onChangeOption(e, index) {
    let newOptionsArray = [...options];
    newOptionsArray[index].option = e.target.value;
    setOptions(newOptionsArray);
  }

  function _onUpload(e, index) {
    _clearMessage();
    var fileReader = new FileReader();
    fileReader.addEventListener("load", function(e) {
      let newOptionsArray = [...options];
      newOptionsArray[index].image = e.target.result;
      setOptions(newOptionsArray);
    });
    fileReader.readAsDataURL(e.target.files[0]);
  }

  function _onSubmit(e) {
    e.preventDefault();
    setSuccessMessage("");
    createCampaign({ name, dueDate, dueTime, options });
  }

  function _clearMessage() {
    setErrorMessage("");
    setSuccessMessage("");
  }

  const prevCreating = usePrevious(creating);

  useEffect(() => {
    if (prevCreating && !creating) {
      if (createFailed) {
        setErrorMessage("Preencha todos os campos corretamente!");
      } else {
        setSuccessMessage("Campanha criada com sucesso!");
        setName("");
        setDueDate("");
        setDueTime("");
        setOptions([]);
      }
    }
  }, [createFailed, creating, prevCreating]);

  return (
    <>
      <NavBar />
      <Jumbotron fluid>
        <h1>Nova Campanha</h1>
        {errorMessage !== "" && <Alert variant="warning">{errorMessage}</Alert>}
        {successMessage !== "" && (
          <Alert variant="success">{successMessage}</Alert>
        )}
        <Form enctype="multipart/form-data" onSubmit={_onSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Nome da campanha</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={_clearMessage}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDueDate">
            <Form.Label>Data final</Form.Label>
            <Form.Control
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              type="date"
              onKeyDown={_clearMessage}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDueTime">
            <Form.Label>Hora final</Form.Label>
            <Form.Control
              value={dueTime}
              onChange={e => setDueTime(e.target.value)}
              type="time"
              onKeyDown={_clearMessage}
            />
          </Form.Group>

          <Button variant="primary" onClick={_addOption}>
            Adicionar Candidato
          </Button>

          <Form.Label>Candidatos</Form.Label>
          {options.map((option, index) => (
            <>
              <Form.Control
                onChange={e => _onUpload(e, index)}
                type="file"
                accept="image/*"
                name="image"
              />
              <Form.Control
                value={option.option}
                onChange={e => _onChangeOption(e, index)}
                onKeyDown={_clearMessage}
              />
            </>
          ))}

          <Button variant="primary" type="submit">
            Criar Campanha
          </Button>
        </Form>
      </Jumbotron>
    </>
  );
}

const mapStateToProps = ({ request, loading }) => ({
  createFailed: isFailure(request, CREATE_CAMPAIGN),
  creating: isLoading(loading, CREATE_CAMPAIGN)
});

const mapDispatchToProps = {
  createCampaign
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCampaign);

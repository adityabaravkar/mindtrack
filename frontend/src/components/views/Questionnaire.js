import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "react-phone-number-input/style.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import { jwtApiCall } from "../../config";
import { toast } from "react-toastify";

function Questionarie() {
  const [answer, setAnswer] = useState();
  const [question, setQuestion] = useState();
  const [sessionId, setSessionId] = useState();
  const history = useHistory();

  const formSubmit = (event) => {
    event.preventDefault();
    const body = {
      response: answer,
      session: sessionId,
    };
    jwtApiCall.post(`/assess`, body).then((res) => {
      const result = res.data;
      if (result.status === "complete") {
        toast.info("Your Susceptibility score: " + result.score, {
          position: toast.POSITION.TOP_CENTER,
        });
        history.replace("/patient/result");
      }
      setQuestion(result.question);
      setAnswer();
    });
  };

  const onValueChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    document.title = "Questionnaire";
    jwtApiCall.get(`/start`).then((res) => {
      const result = res.data;
      setQuestion(result.question);
      setSessionId(result.session);
    });
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h1">Questionnaire</Card.Title>
              </Card.Header>

              <Card.Body>
                <form onSubmit={formSubmit}>
                  <div>
                    <text>
                      Over the last 2 weeks, how often have you been bothered by
                      the following problem?
                    </text>
                    <br />
                    <h3> Q. {question}</h3>
                    <div className="radio">
                      <h4 className="text-success">
                        <input
                          type="radio"
                          value="0"
                          checked={answer === "0"}
                          onChange={onValueChangeAnswer}
                          className="m-2"
                        />
                        Not at all
                      </h4>
                    </div>

                    <div className="radio">
                      <h4 className="text-info">
                        <input
                          type="radio"
                          value="1"
                          checked={answer === "1"}
                          onChange={onValueChangeAnswer}
                          className="m-2"
                        />
                        Several days
                      </h4>
                    </div>

                    <div className="radio">
                      <h4 className="text-warning">
                        <input
                          type="radio"
                          value="2"
                          checked={answer === "2"}
                          onChange={onValueChangeAnswer}
                          className="m-2"
                        />
                        More than half the days
                      </h4>
                    </div>

                    <div className="radio">
                      <h4 className="text-danger">
                        <input
                          type="radio"
                          value="3"
                          checked={answer === "3"}
                          onChange={onValueChangeAnswer}
                          className="m-2"
                        />
                        Nearly every day
                      </h4>
                    </div>
                  </div>

                  <br />

                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Questionarie;

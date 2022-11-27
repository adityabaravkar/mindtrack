import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Authentication } from "../../services/authentication";

function Questionarie() {
  const [answer, setAnswer] = useState();
  const [question, setQuestion] = useState();
  const [questionCode, setQuestionCode] = useState();
  const [sessionId, setSessionId] = useState();
  const [isComplete, setIsComplete] = useState();

  const formSubmit = (event) => {
    event.preventDefault();
    const body = {
      code: questionCode,
      response: answer,
      session: sessionId,
    };
    axios
      .post(`http://vast-taiga-12338.herokuapp.com/assess`, body)
      .then((res) => {
        const result = res.data;
        if (result.status === "complete") {
          alert("Your standardized score: " + result.score);
          setIsComplete(true);
        }
        setQuestion(result.question);
        setQuestionCode(result.code);
      });
  };

  const onValueChangeAnswer = (event) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    document.title = "Questionnaire";
    axios
      .get(
        `http://vast-taiga-12338.herokuapp.com/start/${Authentication.userId}`
      )
      .then((res) => {
        const result = res.data;
        //console.log("User details", result);
        setQuestion(result.question);
        setQuestionCode(result.code);
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
                <Card.Title as="h4">Questionnaire</Card.Title>
              </Card.Header>

              <Card.Body>
                <form onSubmit={formSubmit}>
                  <div>
                    <text>
                      Over the last 2 weeks, how often have you been bothered by
                      the following problem?
                    </text>
                    <br />
                    <text> Q. {question}</text>
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          value="0"
                          checked={answer === "0"}
                          onChange={onValueChangeAnswer}
                        />
                        Not at all
                      </label>
                    </div>

                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          value="1"
                          checked={answer === "1"}
                          onChange={onValueChangeAnswer}
                        />
                        Several days
                      </label>
                    </div>

                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          value="2"
                          checked={answer === "2"}
                          onChange={onValueChangeAnswer}
                        />
                        More than half the days
                      </label>
                    </div>

                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          value="3"
                          checked={answer === "3"}
                          onChange={onValueChangeAnswer}
                        />
                        Nearly every day
                      </label>
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

import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function Questionarie() {
  const [answer, setAnswer] = useState();
  const [question, setQuestion] = useState();
  const [questionCode, setQuestionCode] = useState();
  const [isComplete, setIsComplete] = useState();

  const formSubmit = (event) => {
    event.preventDefault();
    const body = {
      code: questionCode,
      response: answer,
    };
    axios
      .post(`http://127.0.0.1:8080/assess`, body, { withCredentials: true })
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
      .get(`http://127.0.0.1:8080/assess`, { withCredentials: true })
      .then((res) => {
        const result = res.data;
        //console.log("User details", result);
        setQuestion(result.question);
        setQuestionCode(result.code);
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

                  <button className="btn btn-default" type="submit">
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

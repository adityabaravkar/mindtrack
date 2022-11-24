import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { Authentication } from "../../services/authentication";
import axios from "axios";

function User() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPin] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    document.title = "User Profile";
    const userId = Authentication.userId;
    // const queryParams = {
    //   userId: userId,
    // };
    // const params = new URLSearchParams(queryParams);
    // axios.get(`http://localhost:8081/getFriendCount/${this.state.UserID}`)
    axios.get(`http://localhost:9000/detail/${userId}`).then((res) => {
      const result = res.data;
      console.log("User details", result);
    });
    setEmail("abc@mail.com");
    setFirstName("ABC");
    setLastName("XYZ");
    setAddress("123 LMN Road");
    setCity("San Jose");
    setCountry("United States");
    setPin(123456);
    setContact("9995551235");
  }, []);

  const updateUser = (e) => {
    e.preventDefault();
    console.log(
      "user updated details: ",
      firstName,
      lastName,
      address,
      city,
      country,
      pin,
      contact
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateUser}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Email (disabled)</label>
                        <Form.Control
                          defaultValue={email}
                          disabled
                          placeholder="Email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group controlId="firstName">
                        <label>First Name</label>
                        <Form.Control
                          defaultValue={firstName}
                          placeholder="Company"
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group controlId="lastName">
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue={lastName}
                          placeholder="Last Name"
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group controlId="address">
                        <label>Address</label>
                        <Form.Control
                          defaultValue={address}
                          placeholder="Home Address"
                          type="text"
                          onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group controlId="city">
                        <label>City</label>
                        <Form.Control
                          defaultValue={city}
                          placeholder="City"
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group controlId="country">
                        <label>Country</label>
                        <Form.Control
                          defaultValue={country}
                          placeholder="Country"
                          type="text"
                          onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group controlId="pin">
                        <label>Postal Code</label>
                        <Form.Control
                          defaultValue={pin}
                          placeholder="Postal Code"
                          type="number"
                          onChange={(e) => setPin(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="5">
                      {/* <Form.Group controlId="contact"> */}
                      <label>Contact Number</label>
                      {/* <Form.Control
                          defaultValue={contact}
                          placeholder="Contact"
                          type="text"
                          onChange={(e) => setContact(e.target.value)}
                        ></Form.Control> */}
                      <PhoneInput
                        placeholder="Contact Number"
                        value={contact}
                        onChange={setContact}
                      />
                      {/* </Form.Group> */}
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;

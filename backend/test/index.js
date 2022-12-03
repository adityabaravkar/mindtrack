const request = require("supertest")(
  "https://powerful-sierra-68989.herokuapp.com"
);
const expect = require("chai").expect;

describe("API requests", function () {
  it("returns patient details", async function () {
    const response = await request.get("/detail/6381246a5d630fd7e03981e6");

    expect(response.status).to.eql(200);
    expect(response.body.role).to.eql("patient");
  });

  it("allows an user to save profile data", async function () {
    const postResponse = await request.post("/update").send({
      id: "6381246a5d630fd7e03981e6",
      email: "abc@abc.com",
      firstName: "abs",
      role: "patient",
    });

    expect(postResponse.status).to.eql(202);
  });

  it("throws an exception due to already used email", async function () {
    const postResponse = await request.post("/signup").send({
      email: "abc@abc.com",
      firstName: "abs",
      role: "patient",
      password: "abc",
    });

    expect(postResponse.status).to.eql(400);
  });

  it("it should get the doctors list", async function () {
    const response = await request.get("/getDoctors");

    expect(response.status).to.eql(200);
    expect(response.body.length).to.greaterThan(0);
  });

  it("it should get the patients for doctor list", async function () {
    const response = await request.get(
      "/myPatients?id=6381246a5d630fd7e03981e6"
    );

    expect(response.status).to.eql(200);
    expect(response.body.length).to.eql(0);
  });
});

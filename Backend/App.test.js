const request = require("supertest");

const app = require("./src/index");

describe("Test example", () => {
  test("signIn", (done) => {
    request(app)
      .post("/users/signin")
      .send({
        Email: "may1@gmail.com",
        Password: "123",
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        (res.body.statusCode = 0), (res.body.message = "Success");
      })
      .end((err, res) => {
        if (err) return done(err);
        else return done();
      });
    // Even more logic goes here
  });
  test("CreateFlight", (done) => {
    request(app)
      .post("/flights/")
      .send({
        FlightNumber: 11,
        DepartureDate: "1/1/2022",
        ArrivalDate: "1/1/2022",
        DepartureTime: "12:00",
        ArrivalTime: "15:00",
        EconomySeats: 24,
        BusinessSeats: 24,
        FirstClassSeats: 24,
        ArrivalAirport: "Berlin",
        DepartureAirport: "Cairo",
        Price: 180,
        TripDuration: "3hours",
        BaggageAllowance: 40,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        (res.body.statusCode = 0), (res.body.message = "Success");
      })
      .end((err, res) => {
        if (err) return done(err);
        else return done();
      });
    // Even more logic goes here
  });
  // More things come here
});

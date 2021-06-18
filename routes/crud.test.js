const express = require("express"); // import express
const personRoute = require("./persons.js"); //import file we are testing
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const app = express(); //an instance of an express app, a 'fake' express app
// const sequelize = new Sequelize('safetyNet', process.env.DB_USER, process.env.DB_PASS,{
//   host: process.env.DB_HOST,
//   dialect: 'mysql'
// });
app.use("/persons", personRoute); //routes

describe("testing-server-routes", () => {
  it("GET /states - success", async () => {
    const { body } = await request(app).get("/persons"); //uses the request function that calls on express app instance
    expect(body).toContain([
      {
        firstName: "Jamie",
        lastName: "Peters",
        address: "908 73rd St	Culver",
        zip: "97451",
        phone: "841-874-7462",
        email: "jpeter@email.com"
      }
    ]);
  });
});
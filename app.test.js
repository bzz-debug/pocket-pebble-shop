const request = require("supertest");
const app = require("./api/app.js");

test("404: Responds with error object if non-existent endpoint given", () => {
  return request(app)
    .get("/notARoute")
    .expect(404)
    .then(({ body }) => {
      expect(body).toEqual({ status: 404, msg: "Non-existent endpoint" });
    });
});

describe("GET /api/items", () => {
  test("returns a list of the available items", () => {
    return request(app)
      .get("/api/items")
      .expect(200)
      .then(({ body }) => {
        expect(body.items).toEqual("I have no idea");
      });
  });
});
// describe("GET/api/items:item_id");
// describe.todo("GET/api/items (sorting queries");
// describe("POST /api/orders");

// describe("POST /pay", () => {
//   test("responds with a confirmation message", () => {
//     return request(app).post("/pay").send;
//   });
// });
// describe("/complete-order");
//how to test these endpoints? - I will need to look into this separately. The model.paypal.js functions require access tokens and all sorts, so testing these might be different. Or, they might be altogether unnecessary since I have tested them myself in the sandbox.

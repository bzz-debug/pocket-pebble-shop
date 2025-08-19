const express = require("express");
const app = express();
const { createOrder, capturePayment } = require("./model.paypal.js");
const {
  payment,
  completeOrder,
  getItems,
  getItemById,
} = require("./controller.js");
const path = require("path");
const cors = require("cors");

//dont forget error catching

app.use("/images", express.static(path.join(__dirname, "../assets")));
//if images dont render, come back to check this

app.get("/", (req, res) => {
  res.render("index");
});
app.use(cors());
app.get("/api/items", getItems);
app.get("/api/items/:item_id", getItemById);

app.post("/pay", payment);

app.get("/complete-order", completeOrder);

app.get("/cancel-order", (req, res) => {
  res.send("order canceled");
});

//put this at the end as it is a catch-all
app.all(/(.*)/, (req, res) => {
  res.status(404).send({ status: 404, msg: "Non-existent endpoint" });
});

module.exports = app;

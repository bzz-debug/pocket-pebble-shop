import express from "express";
//import dotenv?? - 13:53 on video
import "./services/paypal.js";
import { capturePayment, createOrder } from "./services/paypal.js";

const app = express();

app.listen(8080, () => console.log("server running"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/pay", (req, res) => {
  createOrder()
    .then((url) => {
      res.redirect(url);
    })
    .catch((error) => {
      res.send("Error: " + error);
    });
});

app.get("/complete-order", (req, res) => {
  return capturePayment(req.query.token)
    .then((result) => {
      res.send(`Order Complete! Order ID: ${result.id}`);
    })
    .catch((error) => {
      res.send("Error: " + error);
    });
});

app.get("/cancel-order", (req, res) => {
  res.send("order canceled");
});

//cant get the payment to actually go through and affect the balance on paypal sandbox

const { createOrder, capturePayment } = require("./model.paypal.js");

const { selectItems } = require("./model.js");

exports.payment = (req, res) => {
  return createOrder()
    .then((url) => {
      res.redirect(url);
    })
    .catch((error) => {
      res.send("Error: " + error);
    });
};

exports.completeOrder = (req, res) => {
  return capturePayment(req.query.token)
    .then((result) => {
      res.send(`Order Complete! Order ID: ${result.id}`);
    })
    .catch((error) => {
      res.send("Error: " + error);
    });
};

exports.getItems = (req, res, next) => {
  console.log("in the controller");
  return selectItems()
    .then((items) => {
      //   console.log(items);
      res.status(200).send({ items });
    })
    .catch((err) => {
      next(err);
    });
};

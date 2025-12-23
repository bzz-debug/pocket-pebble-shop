const { createOrder, capturePayment } = require("./model.paypal.js");

const { selectItems, selectItemById, addItems } = require("./model.js");

exports.payment = (req, res) => {
  console.log("🚀 Payment endpoint hit!");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Body:", req.body);
  console.log("🧪 createOrder type:", typeof createOrder);
  console.log(
    "🧪 createOrder function:",
    createOrder.toString().substring(0, 100)
  );
  const { totalPrice } = req.body;
  return createOrder(totalPrice)
    .then((url) => {
      console.log("🔗 Redirecting to PayPal:", url);
      res.redirect(url);
    })
    .catch((error) => {
      console.log("❌ Error in payment controller:", error);
      res.send("Error: " + error);
    });
};

exports.completeOrder = (req, res) => {
  return capturePayment(req.query.token)
    .then((result) => {
      // res.send(`Order Complete! Order ID: ${result.id}`);
      res.redirect(`http://localhost:5173/order-confirmation`);
    })
    .catch((error) => {
      res.send("Error: " + error);
    });
};

exports.getItems = (req, res, next) => {
  return selectItems()
    .then((items) => {
      console.log(items);
      res.status(200).send({ items });
    })
    .catch((err) => {
      next(err);
    });
};
//should I combine these two into one???
exports.getItemById = (req, res, next) => {
  // console.log("in the controller");
  const id = req.params.item_id;
  console.log(id);
  return selectItemById(id)
    .then((item) => {
      res.status(200).send({ item });
    })
    .catch((err) => {
      next(err);
    });
};

exports.addItem = (req, res, next) => {
  const { name, price, imgUrl, description } = req.body;
  console.log(name, description, price, imgUrl);

  return addItems(name, price, imgUrl, description)
    .then((item) => {
      res.status(201).send({ msg: "item added to the database" });
    })
    .catch((err) => {
      next(err);
    });
};

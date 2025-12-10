require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { addUsers } = require("./model.js");
require("../services/passport.js");
const pgSession = require("connect-pg-simple")(session);
//how does this work?
const { ensureAuthenticated } = require("../services/middlewares/auth.js");

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
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//dont forget error catching

app.use("/images", express.static(path.join(__dirname, "../assets")));
app.use(express.json());

app.use(
  session({
    secret: "PP2025",
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      conString: process.env.DATABASE_URL,
    }),
    cookie: {
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
//if images dont render, come back to check this

// app.get("/", (req, res) => {
//   res.render("index");
// });
app.get("/api/items", getItems);
app.get("/api/items/:item_id", getItemById);

app.post("/pay", payment);

app.get("/complete-order", completeOrder);

app.get("/cancel-order", (req, res) => {
  res.send("order canceled");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await addUsers(email, hashedPassword);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "SomeThing went wrong" });
  }
});
//come back and delete this when you are happy with the login details - to prevent malicious actors adding another admin account and being able to alter the shop.

app.post("/login", async (req, res) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.status(500).json({ error });
    }

    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (error) => {
      if (error) {
        return res.status(500).json({ error });
      }
      return res
        .status(200)
        .json({ id: user.admin_id, name: user.admin_email });
    });
  })(req, res);
});

app.get("/session-info", ensureAuthenticated, (req, res) => {
  res.json({ id: req.user.admin_id, email: req.user.admin_email });
});

//put this at the end as it is a catch-all

app.get("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.status(204).send();
  });
});

app.all(/(.*)/, (req, res) => {
  res.status(404).send({ status: 404, msg: "Non-existent endpoint" });
});
module.exports = app;

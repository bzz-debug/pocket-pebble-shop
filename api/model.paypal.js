const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

function generateAccessToken() {
  return axios({
    url: process.env.PAYPAL_BASE_URL + "/v1/oauth2/token",
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
  }).then((response) => {
    console.log(response.data.access_token);
    return response.data.access_token;
  });
  //make sure to error handle here
}

const createOrder = (totalPrice) => {
  console.log("🎯 createOrder function called with:", totalPrice);
  console.log("🌐 PAYPAL_BASE_URL:", process.env.PAYPAL_BASE_URL);
  console.log(
    "🔑 PAYPAL_CLIENT_ID:",
    process.env.PAYPAL_CLIENT_ID ? "SET" : "MISSING"
  );
  console.log(
    "🔒 PAYPAL_SECRET:",
    process.env.PAYPAL_SECRET ? "SET" : "MISSING"
  );
  console.log("🏠 BASE_URL:", process.env.BASE_URL);
  return generateAccessToken()
    .then((accessToken) => {
      console.log("✅ Got access token, making PayPal order...");
      console.log("💰 Total price:", totalPrice);

      return axios({
        url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
        data: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              items: [
                {
                  name: "basket",
                  description: "whole basket amount",
                  quantity: 1,
                  unit_amount: {
                    currency_code: "GBP",
                    value: `${totalPrice}`,
                  },
                },
              ],
              amount: {
                currency_code: "GBP",
                value: `${totalPrice}`,
                breakdown: {
                  item_total: {
                    currency_code: "GBP",
                    value: `${totalPrice}`,
                  },
                },
              },
            },
          ],
          application_context: {
            return_url: process.env.BASE_URL + "/complete-order",
            cancel_url: process.env.BASE_URL + "/cancel-order",
            user_action: "PAY_NOW",
            brand_name: "Pocket Pebbles",
          },
        }),
      });
    })
    .then((response) => {
      console.log("📦 PayPal response:", response.data);
      return response.data.links.find((link) => link.rel === "approve").href;
    })
    .catch((error) => {
      console.log(
        "❌ Error in createOrder:",
        error.response?.data || error.message
      );
      throw error;
    });
};

const capturePayment = (orderId) => {
  console.log("Capturing payment: ", orderId);
  return generateAccessToken()
    .then((accessToken) => {
      return axios({
        url:
          process.env.PAYPAL_BASE_URL +
          `/v2/checkout/orders/${orderId}/capture`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      });
    })
    .then((response) => {
      console.log("Capture Response: ", response.data);
      return response.data;
    });
};

module.exports = { createOrder, capturePayment };

// createOrder().then((result) => console.log(result));

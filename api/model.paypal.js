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

const createOrder = () => {
  return generateAccessToken()
    .then((accessToken) => {
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
                  name: "robin pebble",
                  description: "when robins appear, loved ones are near",
                  quantity: 1,
                  unit_amount: {
                    currency_code: "GBP",
                    value: "5",
                  },
                },
              ],
              amount: {
                currency_code: "GBP",
                value: "5",
                breakdown: {
                  item_total: {
                    currency_code: "GBP",
                    value: "5",
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
            //can I just have the endpoint here, like I did in the html file with
          },
        }),
      });
    })
    .then((response) => {
      //   console.log(response.data);
      return response.data.links.find((link) => link.rel === "approve").href;
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

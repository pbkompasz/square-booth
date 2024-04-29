console.log("asd");
const { Client, Environment } = require("square");

const client = new Client({
  bearerAuthCredentials: {
    accessToken:
      "EAAAl-ACR-kc5ZH-WCGXvJqBrHVcvlrPMqtqizZ5-TcjNHxWsxxDHlgvG769Id6c",
  },
  squareVersion: "2024-04-17",
  timeout: 60000,
  additionalHeaders: {},
  userAgentDetail: "",
  environment: Environment.Sandbox,
});

const { locationsApi } = client;
locationsApi.listLocations().then((listLocationsResponse) => {
  let locations = listLocationsResponse.result.locations;

  client.checkoutApi
    .createPaymentLink({
      // idempotencyKey: "{UNIQUE_KEY}",
      order: {
        locationId: locations[0].id,
        lineItems: [
          {
            name: "60,000 mile maintenance",
            quantity: "1",
            note: "1st line item note",
            basePriceMoney: {
              amount: 30000,
              currency: "GBP",
            },
          },
        ],
      },
    })
    .then((response) => {
      console.log(response.result);
    })
    .catch((error) => {
      console.log(error);
    });
});

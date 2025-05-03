const fetch = require("node-fetch");
require("dotenv").config();

async function enviarSMS(to, message) {
  const username = process.env.AFRICA_TALKING_USERNAME;
  const apiKey = process.env.AFRICA_TALKING_API_KEY;

  const url = "https://api.africastalking.com/version1/messaging";
  const params = new URLSearchParams({
    username,
    to,
    message
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "apiKey": apiKey,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  const data = await response.json();
  console.log(data);
  return data;
}

module.exports = enviarSMS;

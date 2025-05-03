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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        apiKey,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    const data = await response.json();

    if (data.SMSMessageData && data.SMSMessageData.Message === "Sent to 1/1 Total Cost:") {
      console.log("SMS enviado com sucesso.");
    } else {
      console.log("Resposta da API:", data);
    }

    return data;
  } catch (error) {
    console.error("Erro ao enviar SMS:", error);
    return null;
  }
}

module.exports = enviarSMS;

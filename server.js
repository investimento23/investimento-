const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const enviarSMS = require("./enviarSMS");
const Investimento = require("./models/Investimento");

const app = express();
app.use(bodyParser.json());

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado."))
.catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Endpoint de teste
app.get("/", (req, res) => {
  res.send("Servidor ativo.");
});

// Criar investimento
app.post("/investir", async (req, res) => {
  const { telefone, valor } = req.body;
  if (!telefone || !valor || valor < 100) {
    return res.status(400).json({ error: "Telefone e valor (mínimo 100) são obrigatórios." });
  }

  const referencia = "REF" + Math.floor(Math.random() * 1000000);
  const novoInvestimento = new Investimento({ telefone, valor, referencia });
  await novoInvestimento.save();

  // Dados dos métodos de pagamento
  const mpesa = process.env.MPESA_NUMBER;
  const emola = process.env.EMOLA_NUMBER;
  const paypal = process.env.PAYPAL_EMAIL;

  const mensagem = `Investimento de ${valor} MZN criado com sucesso!
Deposite para:
M-Pesa: ${mpesa}
e-Mola: ${emola}
PayPal: ${paypal}
Use o código ${referencia} ao confirmar.`;

  await enviarSMS(telefone, mensagem);

  res.json({ sucesso: true, referencia });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

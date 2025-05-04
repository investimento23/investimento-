const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth"); // Importando as rotas de autenticação
const investimentoRoutes = require("./routes/investimento"); // Rota de investimentos
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB conectado."))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Usar as rotas de autenticação
app.use("/api/auth", authRoutes); // Rota de autenticação

// Usar a rota de investimento
app.use("/api/investir", investimentoRoutes); // Rota de investimento

// Endpoint de teste
app.get("/", (req, res) => {
  res.send("Servidor ativo.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

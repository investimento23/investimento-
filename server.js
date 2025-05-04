const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const investimentoRoutes = require("./routes/investimento");
const txunaRoutes = require("./routes/txuna");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB conectado."))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Rotas
app.use("/api/auth", authRoutes);         // Registro e login
app.use("/api/investir", investimentoRoutes); // Investimentos
app.use("/api/txuna", txunaRoutes);       // Txuna

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor ativo.");
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

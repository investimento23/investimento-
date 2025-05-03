const mongoose = require("mongoose");

const investimentoSchema = new mongoose.Schema({
  telefone: { type: String, required: true },
  valor: { type: Number, required: true },
  referencia: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Investimento", investimentoSchema);

const mongoose = require("mongoose");

const InvestimentoSchema = new mongoose.Schema({
  telefone: String,
  valor: Number,
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Investimento", InvestimentoSchema);
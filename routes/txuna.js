const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const TxunaSchema = new mongoose.Schema({
  telefone: String,
  data: {
    type: Date,
    default: Date.now
  }
});

const Txuna = mongoose.model("Txuna", TxunaSchema);

router.post("/", function (req, res) {
  const telefone = req.body.telefone;

  const novo = new Txuna({ telefone: telefone });
  novo.save(function (err) {
    if (err) return res.status(500).json({ erro: "Erro ao registrar txuna" });
    res.json({ mensagem: "Txuna registrada com sucesso!" });
  });
});

router.get("/", function (req, res) {
  Txuna.find().sort({ data: -1 }).exec(function (err, docs) {
    if (err) return res.status(500).json({ erro: "Erro ao listar txuna" });
    res.json(docs);
  });
});

module.exports = router;

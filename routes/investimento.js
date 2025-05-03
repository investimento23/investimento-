const express = require("express");
const router = express.Router();
const Investimento = require("../models/Investimento");

const africastalking = require("africastalking")({
  apiKey: process.env.AFRICA_TALKING_API_KEY,
  username: process.env.AFRICA_TALKING_USERNAME
});

const sms = africastalking.SMS;

router.post("/", function (req, res) {
  const telefone = req.body.telefone;
  const valor = req.body.valor;

  const novo = new Investimento({ telefone: telefone, valor: valor });
  novo.save(function (err) {
    if (err) return res.status(500).json({ erro: "Erro ao salvar" });

    sms.send({
      to: [telefone],
      message: "Recebido: " + valor + " MZN. Código: REF" + Date.now()
    }).then(function (response) {
      res.json({ sucesso: true, dados: response });
    }).catch(function (err) {
      res.status(500).json({ erro: "Erro ao enviar SMS", detalhe: err.message });
    });
  });
});

router.get("/", function (req, res) {
  Investimento.find().sort({ data: -1 }).exec(function (err, docs) {
    if (err) return res.status(500).json({ erro: "Erro ao listar" });
    res.json(docs);
  });
});

module.exports = router;

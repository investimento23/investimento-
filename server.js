// server.js const express = require("express"); const mongoose = require("mongoose"); const bodyParser = require("body-parser"); const jwt = require("jsonwebtoken"); const bcrypt = require("bcryptjs"); require("dotenv").config();

const User = require("./models/User"); const Investimento = require("./models/Investimento"); const enviarSMS = require("./enviarSMS");

const app = express(); app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, });

app.get("/", (req, res) => { res.send("Servidor ativo com autenticação."); });

// Registrar app.post("/register", async (req, res) => { const { telefone, senha } = req.body; const hash = await bcrypt.hash(senha, 10); const user = new User({ telefone, senha: hash }); await user.save(); res.json({ sucesso: true }); });

// Login app.post("/login", async (req, res) => { const { telefone, senha } = req.body; const user = await User.findOne({ telefone }); if (!user || !(await bcrypt.compare(senha, user.senha))) { return res.status(401).json({ error: "Credenciais inválidas" }); } const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); res.json({ token }); });

// Middleware de autenticação function auth(req, res, next) { const token = req.headers.authorization; if (!token) return res.sendStatus(401); jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { if (err) return res.sendStatus(403); req.userId = decoded.id; next(); }); }

// Criar investimento (autenticado) app.post("/investir", auth, async (req, res) => { const { valor } = req.body; if (!valor || valor < 100) { return res.status(400).json({ error: "Valor mínimo é 100 MZN." }); } const referencia = "REF" + Math.floor(Math.random() * 1000000); const investimento = new Investimento({ userId: req.userId, valor, referencia }); await investimento.save(); const user = await User.findById(req.userId);

const mensagem = Investimento de ${valor} MZN criado. Referência: ${referencia}; await enviarSMS(user.telefone, mensagem);

res.json({ sucesso: true, referencia }); });

const PORT = process.env.PORT || 3000; app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));

                                         

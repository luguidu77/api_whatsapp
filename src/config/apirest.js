const express = require("express");
const {
  envioController,
  verificarEstadoEnvioController,
  traeTodosLosEnvios,
} = require("../controller/envio.controller");

//middleware
const apirest = express();
apirest.use(express.json());

// verifica envios
apirest.post("/envio", envioController);

// verificar estados de envios ( check)
apirest.get("/check", verificarEstadoEnvioController);

// trae todos los envios
apirest.get("/envios", traeTodosLosEnvios);

apirest.get("/", (req, res) => {
  res.send(`<h1> esto es un h1 que tal desde la apirest</h1>`);
});

module.exports = apirest;

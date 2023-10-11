const { enviarMensajeWPS } = require("../config/wsp/inicializarWSP");
const {
  guardarNuevoMensajeService,
  actualizarEstadoEnviadoService,
  existeErrorEnvioService,
  getTodosLosEnvios,
} = require("../services/envio.service");

const envioController = async (req, res) => {
  const { numero, mensaje } = req.body;
  try {
    // al inicio cuando me envien la peticions necesito guardar en la base de datos si ha habido algun error
    const mensajeDB = await guardarNuevoMensajeService(numero, mensaje);
    // envio por wathsapp
    const respuesta = await enviarMensajeWPS(numero, mensaje);
    // si la respuesta es ok
    if (respuesta) {
      //actualizo estado enviado service, con id y true (enviado con exito)
      await actualizarEstadoEnviadoService(mensajeDB._id, true);

      res.send({ mensaje: "Mensaje enviado" });
    } else {
      res.send({ mensaje: " Mensaje no enviado" });
    }
  } catch (error) {
    const errorController = "Error al enviar mensaje a ...";
    console.error(errorController, error);
    res.status(500).send({ mensaje: errorController });
  }
};

// controlador de verificar envios (check)
const verificarEstadoEnvioController = async (req, res) => {
  try {
    const errorEnvio = await existeErrorEnvioService(false);
    if (errorEnvio) {
      res.status(500).send({ mensaje: " Error" });
      return;
    }

    res.status(200).send({ mensaje: " ok" });
  } catch (error) {
    const errorController = "Error al verificar el estado de envio";
    console.error(errorController, error);
    res.status(500).send({ mensaje: errorController });
    return;
  }
};

const traeTodosLosEnvios = async (req, res) => {
  try {
    const todosLosEnvios = await getTodosLosEnvios();

    console.log(todosLosEnvios);

    res.status(200).send({ mensaje: todosLosEnvios });
    return todosLosEnvios;
  } catch (error) {}
};

module.exports = {
  envioController,
  verificarEstadoEnvioController,
  traeTodosLosEnvios,
};

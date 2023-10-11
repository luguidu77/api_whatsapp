const Mensaje = require("../model/Mensaje");

const guardarNuevoMensajeService = async (numero, mensaje) => {
  try {
    const nuevoMsg = new Mensaje({
      numero,
      mensaje,
    });

    return await nuevoMsg.save();
  } catch (error) {
    const errorService = " Error al guardar el nuevo mensaje";
    console.error(errorService, error);
    throw new Error(errorService);
  }
};

const actualizarEstadoEnviadoService = async (id, enviado) => {
  try {
    await Mensaje.updateOne({ _id: id }, { enviado });
  } catch (error) {
    const errorService = " Error al actualizar el nuevo mensaje";
    console.error(errorService, error);
    throw new Error(errorService);
  }
};

const existeErrorEnvioService = async (enviado) => {
  try {
    // comprueba si no hay documentos en la base de datos
    const count = await Mensaje.countDocuments({});
    if (count == 0) {
      return false; // false => responde OK
    }

    const mensajes = await Mensaje.find({ enviado });
    return mensajes.length > 0; // true => responde Error
  } catch (error) {
    const errorService =
      " Error al verificar si existen mensajes con error de envio";
    console.error(errorService, error);
    throw new Error(errorService);
  }
};

const getTodosLosEnvios = async () => {
  try {
    // comprueba si no hay documentos en la base de datos
    const count = await Mensaje.countDocuments({});
    if (count == 0) {
      return false; // false => responde OK
    }
    const mensajes = await Mensaje.find();
    return mensajes; // true => responde Error
  } catch (error) {
    const errorService =
      " Error al verificar si existen mensajes con error de envio";
    console.error(errorService, error);
    throw new Error(errorService);
  }
};

// trae solo los que no fueron enviados => await Mensaje.find({enviado: false});

module.exports = {
  guardarNuevoMensajeService,
  actualizarEstadoEnviadoService,
  existeErrorEnvioService,
  getTodosLosEnvios,
};

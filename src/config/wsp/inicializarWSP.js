const { Client, LocalAuth, RemoteAuth } = require("whatsapp-web.js");

const qrcode = require("qrcode-terminal");
const { enviarMensajeRecibido } = require("../webhook");

let clientWSP = null;

const inicializarWSP = async () => {
  clientWSP = new Client({
    authStrategy: new LocalAuth(),
    /* puppeteer:{
      headless: true,
      arg: [
        '--no-sandbox',
        '--disable-setuid-sanbox'
      ]
    } */
  });

  clientWSP.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  clientWSP.on("authenticated", () => {
    console.log("Autenticado");
  });

  clientWSP.on("auth_failure", (msg) => {
    console.error("Fallo de autentificacion", msg);
  });

  clientWSP.on("loading_screen", (porcentaje, mensaje) => {
    console.log(`Cargando: ${porcentaje} - ${mensaje}`);
  });

  clientWSP.on("ready", () => {
    console.log("Client is ready!");
  });

  clientWSP.on("message", async (message) => {
    if (message.body === "😎") {
      const name = await message.getContact();
      message.react("😘");
      
      message.reply(name.name);
    }
    if (message.body === "😘") {
      message.reply("Besos");
    }
  });

  clientWSP.on("message", (message) => {
    console.log("enviando mensaje a una webhook cualquiera");
    console.log(message);
    if (message) {
      enviarMensajeRecibido(message.from, message.body);
    }
  });

  await clientWSP.initialize();
};

const enviarMensajeWPS = async (numero, mensaje) => {
  try {
    numero = numero + "@c.us";
    const respuesta = await clientWSP.sendMessage(numero, mensaje);
    return respuesta;
  } catch (error) {
    const mensajeError = "Error al enviar mensaje a ...";
    console.error(mensajeError, error);
  }
};

module.exports = {
  inicializarWSP,
  enviarMensajeWPS,
};

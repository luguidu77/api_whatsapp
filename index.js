/*
API REST de Whatsapp en NodeJS con Docker
https://www.youtube.com/watch?v=YV216SEM0H8&t=3331s */
const { Client, LocalAuth, RemoteAuth } = require("whatsapp-web.js");

const qrcode = require("qrcode-terminal");

const apirest = require("./src/config/apirest.js");

const { inicializarWSP } = require("./src/config/wsp/inicializarWSP.js");
const { iniciarDB } = require("./src/config/db/conexionMongoDB.js");

/* const http = require("http");
const app = express(); // Crea una instancia de Express.
 */
// MONGODB ############################################
//const MONGODB_URI = process.env.MONGODB_URI;
let client = null;
let store;
(async () => {
  try {
    await inicializarWSP(); // VERIFICAMOS INICIALIZACION WHATSAPP
    await iniciarDB(); // INICIA BASE DE DATOS

    apirest.listen(3000, () => {
      console.log("Servidor escuchando en el puerto 3000");
    });

    /// base MONGODB en internet MONGO ATLAS
    /* console.log(MONGODB_URI);

    mongoose.connect(MONGODB_URI).then(async () => {
      store = new MongoStore({ mongoose: mongoose });
      console.log("conectado a mongoDB");
    }); */
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

const createWhatsappSession = async (id) => {
  /*  client = new Client({
    authStrategy: new LocalAuth(),
  }); */
  client = new Client({
    puppeteer: { headless: true },
    authStrategy: new RemoteAuth({
      clientId: id,
      store: store,
      backupSyncIntervalsMs: 800000,
    }),
  });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", () => {
    console.log("Autenticado");
  });
  client.on("auth_failure", (msg) => {
    console.error("Fallo de autentificacion", msg);
  });
  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.on("remote_session_saved", () => {
    console.log("remote session saved");
  });

  await client.initialize();
};

const getWhatsappSession = async (id, socket) => {
  const client = new Client({
    puppeteer: { headless: false },
    authStrategy: new RemoteAuth({
      clientId: id,
      store: store,
    }),
  });

  client.on("ready", () => {
    console.log("cliente listo");
    socket.emit("ready", {
      id,
      message: "cliente esta listo",
    });
  });

  client.on("qr", (qr) => {
    socket.emit("qr", {
      qr,
      message: "tu usuario ha cerrado sesion y este es el QR",
    });
  });
};

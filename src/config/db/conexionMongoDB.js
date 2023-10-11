const { default: mongoose } = require("mongoose");
const { MongoStore } = require("wwebjs-mongo");
require("dotenv").config();

//CONEXION Y DESCONEXION BASE DE DATOS
const iniciarDB = async () => {
  try {
    await mongoose
      .connect("mongodb://mongodbwsp:27017/whatsapp")
      .then(() => console.log("Conexion a MongoDB existosa"))
      .catch((e) => console.error("Conexion a MongoDB existosa")); //? ejecuta mongod para verirficar que esta en el proyecto. no cabiar 127.0.0.1 por localhost porque no funciona
    //?local>>>

    //? MongoDB Atlas online
    mongoose
      .connect(process.env.MONGODB_URI, { dbName: "whatsapp" })
      .then(async () => {
        const store = new MongoStore({ mongoose: mongoose });
        console.log("conectado a mongoDB");
      });
  } catch (error) {
    const mensajeError = "Error al conectar a MongoDB";
    console.error(mensajeError, error);
    throw new Error(mensajeError);
  }
};

const cerrarDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("Desconexion MongoDB existosa");
  } catch (error) {
    const mensajeError = "Error al cerrar a MongoDB";
    console.error(mensajeError, error);
    throw new Error(mensajeError);
  }
};

module.exports = {
  iniciarDB,
  cerrarDB,
};

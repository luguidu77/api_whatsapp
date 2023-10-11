/*
  Un webhook es un mensaje automatizado que se envía a 
 una aplicación externa cuando ocurre un evento. A nivel más técnico,
 un webhook es una devolución de llamada HTTP o una petición HTTP POST generada
 por la notificación de un evento. 
 
  Seria otra aplicacion web (**Express.js) que escucha por uno de sus puertos (en este ej., el webhook que se cree escuchara
 por el puerto 8080 direccion /webhook),y ésta responderá ejecutando una accion deseada.
 En este ejemplo le estoy enviando a la webhook en formato json, el nº telefono y el mensaje que recibe mi 
 dispositivo desde otros  usuarios whatsapp.
 

 **Express.js se utiliza para crear API (interfaz de programación de aplicaciones) 
 y aplicaciones móviles. Se encarga de los detalles vitales del backend, como las sesiones,
 la gestión de errores y el enrutamiento. Si quieres algo que sea capaz de gestionar peticiones 
 y respuestas http variadas y múltiples para URLs especificadas, entonces Express.js es la
 mejor opción para tu desarrollo de aplicaciones de negocio.

 */

const enviarMensajeRecibido = async (numero, mensaje) => {
  try {
    const URL = "http://localhost:8080/webhook";

    const opciones = {
      method: "POST",
      body: JSON.stringify({ numero, mensaje }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const respuesta = await fetch(URL, opciones);

    if (respuesta.statusText != "OK") {
      throw new Error("Error en la respuesta de la API Webhook");
    }
    await respuesta.json();

    console.log("Respuesta exitosa de la API Webhook");
  } catch (error) {
    const mensajeError = "Error al enviar mensaje al numero";
    //throw new Error(mensajeError);
  }
};

module.exports = {
  enviarMensajeRecibido,
};

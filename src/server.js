/**
 * Este archivo es el punto de entrada de la aplicación.
 * Cuando ejecutamos el comando `npm start`, este archivo se ejecuta.
 * Separamos el servidor de la lógica de la aplicación para hacer el código más modular
 * y fácil de mantener, y testeable cuando necesitamos escribir múltiples pruebas.
 *
 * Básicamente, no necesitas tocar este archivo, a menos que desees cambiar el número de puerto
 * o agregar algunas configuraciones al servidor.
 */

const app = require("./index.js"); // Importa la aplicación desde el archivo index.js

// Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola cuando se inicia correctamente
app.listen(3000, () => console.log("¡Servidor iniciado 🚀🆙✔ en el puerto 3000!"));

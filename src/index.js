// Importa los módulos necesarios
const express = require('express'); // Importa el módulo 'express' para crear una aplicación Express
const cors = require('cors'); // Importa el módulo 'cors' para habilitar el intercambio de recursos entre diferentes orígenes
const app = express(); // Crea una instancia de la aplicación Express

// Middlewares globales
app.use(cors()); // Utiliza el middleware 'cors' para permitir solicitudes de diferentes orígenes
app.use(express.json()); // Utiliza el middleware 'express.json()' para analizar el cuerpo de las solicitudes como JSON

// Importa las rutas de los diferentes recursos
const usuarioRouter = require('./routes/usuario'); // Importa las rutas relacionadas con los usuarios desde el archivo correspondiente
const personajeRouter = require('./routes/personaje'); // Importa las rutas relacionadas con los personajes desde el archivo correspondiente
const artefactoRouter = require('./routes/artefacto'); // Importa las rutas relacionadas con los artefactos desde el archivo correspondiente

// Usa las rutas importadas para manejar las solicitudes relacionadas con cada recurso
app.use('/usuarios', usuarioRouter); // Utiliza las rutas del usuario en la ruta '/usuarios'
app.use('/personajes', personajeRouter); // Utiliza las rutas del personaje en la ruta '/personajes'
app.use('/artefactos', artefactoRouter); // Utiliza las rutas del artefacto en la ruta '/artefactos'

// Exporta la aplicación para que pueda ser utilizada en otros archivos
module.exports = app;

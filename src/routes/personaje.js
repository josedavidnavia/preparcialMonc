const express = require('express');  // Importa el framework Express para crear rutas y gestionar solicitudes HTTP
const router = express.Router();      // Crea un nuevo enrutador utilizando Express

const z = require('zod');             // Importa el módulo 'zod' para trabajar con esquemas de validación de datos

// Importa el modelo de personaje desde el archivo correspondiente
const Personaje = require('../models/personaje.js');

// Importa los datos de usuarios, personajes y artefactos desde la base de datos
const {usuarios, personajes, artefactos} = require('../database/db.js');

// Importa el esquema de validación para los personajes desde el archivo correspondiente
const schemaPersonaje = require('../schemas/personaje.js');

// Ruta para obtener todos los personajes
router.get('/', (req, res) => {
    res.send(personajes);  // Envía todos los personajes almacenados como respuesta
});

// Ruta para obtener un personaje por su ID
router.get('/:id', (req, res) => {
    // Busca el personaje en la lista de personajes utilizando su ID
    const personaje = personajes.find(personaje => personaje.id === req.params.id);

    // Si el personaje no se encuentra, devuelve un código de estado 404 con un mensaje
    if (!personaje) {
        res.status(404).send('El personaje no fue encontrado');
    }

    // Si se encuentra el personaje, lo envía como respuesta con un código de estado 200 (OK)
    res.status(200).send(personaje);
});

// Ruta para crear un nuevo personaje
router.post('/', (req, res) => {
    try {
        // Verifica que los datos recibidos cumplan con el esquema de personaje definido
        schemaPersonaje.safeParse(req.body);

        // Crea un nuevo objeto Personaje con los datos recibidos y lo agrega a la lista de personajes
        const nuevoPersonaje = {...req.body};
        const asObject = new Personaje(nuevoPersonaje.id, nuevoPersonaje.nombre, nuevoPersonaje.nivel, nuevoPersonaje.clase, nuevoPersonaje.usuario_id);
        personajes.push(asObject);

        // Responde con el personaje creado y un código de estado 201 (creado satisfactoriamente)
        res.status(201).send(asObject);

    } catch (error) {
        // Si hay errores de validación, envía los mensajes de error como respuesta
        res.send(error.errors);
    }
});

// Ruta para actualizar un personaje por su ID (no implementada en este código)
router.put('/:id', (req, res) => {
    // Esta sección del código está vacía y debe ser implementada para permitir la actualización de personajes
});

// Ruta para eliminar un personaje por su ID (no implementada en este código)
router.delete('/:id', (req, res) => {
    // Esta sección del código está vacía y debe ser implementada para permitir la eliminación de personajes
});

module.exports = router;  // Exporta el enrutador para que pueda ser utilizado en otros archivos

const express = require('express');  // Importa el framework Express para crear rutas y gestionar solicitudes HTTP
const router = express.Router();      // Crea un nuevo enrutador utilizando Express

const z = require('zod');             // Importa el módulo 'zod' para trabajar con esquemas de validación de datos

// Importa el modelo de artefacto desde el archivo correspondiente
const Artefacto = require('../models/artefacto.js');

// Importa los datos de usuarios, personajes y artefactos desde la base de datos
const {usuarios, personajes, artefactos} = require('../database/db.js');

// Importa el esquema de validación para los artefactos desde el archivo correspondiente
const schemaArtefacto = require('../schemas/artefacto.js');

// Ruta para obtener todos los artefactos
router.get('/', (req, res) => {
    res.send(artefactos);  // Envía todos los artefactos almacenados como respuesta
});

// Ruta para obtener un artefacto por su ID
router.get('/:id', (req, res) => {
    // Busca el artefacto en la lista de artefactos utilizando su ID
    const artefacto = artefactos.find(artefacto => artefacto.id === req.params.id);

    // Si el artefacto no se encuentra, devuelve un código de estado 404 con un mensaje
    if (!artefacto) {
        res.status(404).send('El artefacto no fue encontrado');
    }

    // Si se encuentra el artefacto, lo envía como respuesta
    res.send(artefacto);
});

// Ruta para crear un nuevo artefacto
router.post('/', (req, res) => {
    try {
        // Verifica que los datos recibidos cumplan con el esquema de artefacto definido
        schemaArtefacto.safeParse(req.body);

        // Crea un nuevo objeto Artefacto con los datos recibidos y lo agrega a la lista de artefactos
        const nuevoArtefacto = {...req.body};
        const asObject = new Artefacto(nuevoArtefacto.id, nuevoArtefacto.nombre, nuevoArtefacto.tipo, nuevoArtefacto.modalidad, nuevoArtefacto.personaje_id);
        artefactos.push(asObject);

        // Agrega el artefacto al inventario del personaje correspondiente
        const personaje = personajes.find(personaje => personaje.id === nuevoArtefacto.personaje_id);
        if (personaje) {
            personaje.inventario.push(asObject);
        } else {
            // Si el personaje no se encuentra, devuelve un código de estado 404 con un mensaje
            res.status(404).send('No fue posible crear el artefacto, el personaje no fue encontrado');
        }

        // Responde con el artefacto creado y un código de estado 201 (creado satisfactoriamente)
        res.status(201).send(asObject);

    } catch (error) {
        // Si hay errores de validación, envía los mensajes de error como respuesta
        res.send(error.errors);
    }
});

// Ruta para actualizar un artefacto (no implementada en este código)
router.put('/', (req, res) => {
    // Esta sección del código está vacía y debe ser implementada para permitir la actualización de artefactos
});

// Ruta para eliminar un artefacto por su ID (no implementada en este código)
router.delete('/:id', (req, res) => {
    // Esta sección del código está vacía y debe ser implementada para permitir la eliminación de artefactos
});

module.exports = router;  // Exporta el enrutador para que pueda ser utilizado en otros archivos

const express = require('express');  // Importa el framework Express para crear rutas y gestionar solicitudes HTTP
const router = express.Router();      // Crea un nuevo enrutador utilizando Express

// Importa el modelo de usuario desde el archivo correspondiente
const Usuario = require('../models/usuario.js');

// Importa los datos de usuarios, personajes y artefactos desde la base de datos
const {usuarios, personajes, artefactos} = require('../database/db.js');

// Importa el esquema de validación para los usuarios desde el archivo correspondiente
const schemaUsuario = require('../schemas/usuario.js');

// Ruta para obtener todos los usuarios
router.get('/', (req, res) => {
    res.send(usuarios);  // Envía todos los usuarios almacenados como respuesta
});

// Ruta para obtener un usuario por su ID
router.get('/:id', (req, res) => {
    // Busca el usuario en la lista de usuarios utilizando su ID
    const usuario = usuarios.find(usuario => usuario.id === req.params.id);

    // Si el usuario no se encuentra, devuelve un código de estado 404 con un mensaje
    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado');
    }

    // Si se encuentra el usuario, lo envía como respuesta con un código de estado 200 (OK)
    res.send(usuario);
});

// Ruta para crear un nuevo usuario
router.post('/', (req, res) => {
    try {
        // Verifica que los datos recibidos cumplan con el esquema de usuario definido
        schemaUsuario.safeParse(req.body);

        // Crea un nuevo objeto Usuario con los datos recibidos y lo agrega a la lista de usuarios
        const nuevoUsuario = {...req.body};
        const asObject = new Usuario(nuevoUsuario.id, nuevoUsuario.nombre, nuevoUsuario.apellido, nuevoUsuario.correo);
        usuarios.push(asObject);

        // Responde con el usuario creado y un código de estado 201 (creado satisfactoriamente)
        res.status(201).send(asObject);

    } catch (error) {
        // Si hay errores de validación, envía los mensajes de error como respuesta
        res.send(error.errors);
    }
});

// Ruta para actualizar un usuario por su ID
router.put('/:id', (req, res) => {
    // Busca el usuario en la lista de usuarios utilizando su ID
    const usuario = usuarios.find(usuario => usuario.id === req.params.id);

    // Si el usuario no se encuentra, devuelve un código de estado 404 con un mensaje
    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado');
    }

    try {
        // Verifica que los datos recibidos cumplan con el esquema de usuario definido
        schemaUsuario.safeParse(req.body);

        // Actualiza la información del usuario con los datos recibidos
        const nuevaInfo = {...req.body};
        usuario.nombre = nuevaInfo.nombre;
        usuario.apellido = nuevaInfo.apellido;
        usuario.correo = nuevaInfo.correo;

        // Responde con el usuario actualizado y un código de estado 200 (OK)
        res.status(200).send(usuario);

    } catch (error) {
        // Si hay errores de validación, envía los mensajes de error como respuesta
        res.send(error.errors);
    }
});

// Ruta para eliminar un usuario por su ID
router.delete('/:id', (req, res) => {
    // Busca el usuario en la lista de usuarios utilizando su ID
    const usuario = usuarios.find(usuario => usuario.id === req.params.id);

    // Si el usuario no se encuentra, devuelve un código de estado 404 con un mensaje
    if (!usuario) {
        res.status(404).send('El usuario no fue encontrado');
    }

    // Obtiene el índice del usuario en la lista de usuarios y lo elimina
    const index = usuarios.indexOf(usuario);
    usuarios.splice(index, 1);

    // Responde con un mensaje indicando que el usuario fue eliminado con éxito y un código de estado 200 (OK)
    res.status(200).send({"mensaje": "Usuario fue eliminado con éxito"});
});

module.exports = router;  // Exporta el enrutador para que pueda ser utilizado en otros archivos

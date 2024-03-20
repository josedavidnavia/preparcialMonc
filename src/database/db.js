/**
 * The database is a simple array of objects. Each object is a record in the database.
 * 
Este archivo exporta tres arrays vacíos: usuarios, personajes y artefactos. Estos arrays sirven como bases de datos simples para almacenar registros relacionados con usuarios, personajes y artefactos respectivamente.

Cada vez que se agregue un nuevo usuario, personaje o artefacto a la aplicación, se añadirá un objeto correspondiente a uno de estos arrays.
 */

const usuarios = [];
const personajes = [];
const artefactos = [];

module.exports = {usuarios, personajes, artefactos};



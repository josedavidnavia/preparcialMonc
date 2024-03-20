/**
 * Importa el módulo 'supertest', que se utiliza para realizar solicitudes HTTP a la aplicación.
 */
const request = require('supertest');

/**
 * Importa la aplicación principal desde el archivo index.js en la carpeta src.
 */
const app = require('../src/index.js');

/**
 * Describe un conjunto de pruebas para la API relacionada con los artefactos.
 */
describe('API /artefacto', () => {
  // Test case 1
  test('Debería crear un artefacto', async () => {
    // Crea un nuevo objeto de usuario
    const usuario = {
      id: '123456789',
      nombre: 'John',
      apellido: 'Doe',
      correo: 'johndoe@example.com',
    };
    // Crea un nuevo objeto de personaje
    const personaje = {
      id: '1',
      nombre: 'kraken',
      nivel: 5,
      clase: "tanque",
      usuario_id: "123456789"
    };
    // Crea un nuevo objeto de artefacto
    const artefacto = {
      id: "1",
      nombre: "Espada del augurio ⚔",
      modalidad: "Ataque",
      personaje_id: "1"
    };

    // Envía una solicitud POST a los puntos finales
    await request(app).post('/usuarios').send(usuario);
    await request(app).post('/personajes').send(personaje);
    // Envía una solicitud POST al punto final /usuarios
    const res = await request(app).post('/artefactos').send(artefacto);

    // Verifica la respuesta
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toEqual(artefacto.id);
    expect(res.body.nombre).toEqual(artefacto.nombre);
    expect(res.body.modalidad).toEqual(artefacto.modalidad);
    expect(res.body.personaje_id).toEqual(artefacto.personaje_id);
  });
  // Test case 2
  // Test case 3
  // Test case 4
});

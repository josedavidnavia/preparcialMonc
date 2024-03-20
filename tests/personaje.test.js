/**
 * Importa el módulo 'supertest', que se utiliza para realizar solicitudes HTTP a la aplicación.
 */
const request = require('supertest');

/**
 * Importa la aplicación principal desde el archivo index.js en la carpeta src.
 */
const app = require('../src/index.js');

/**
 * Describe un conjunto de pruebas para la API relacionada con los personajes.
 */
describe('API /personaje', () => {
  // Test case 1
  test('Debería crear un personaje', async () => {
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
    // Envía una solicitud POST al punto final /usuarios para establecer el estado inicial
    const initialStateDefinition = await request(app).post('/usuarios').send(usuario);
    // Envía una solicitud POST al punto final /personajes para crear un personaje
    const res = await request(app).post('/personajes').send(personaje);

    // Verifica la respuesta
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toEqual(personaje.id);
    expect(res.body.nombre).toEqual(personaje.nombre);
    expect(res.body.nivel).toEqual(personaje.nivel);
    expect(res.body.clase).toEqual(personaje.clase);
    expect(res.body.usuario_id).toEqual(personaje.usuario_id);
  });

  // Test case 2
  // Test case 3
  // Test case 4
});

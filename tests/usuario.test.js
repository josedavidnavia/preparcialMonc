/**
 * Importa el módulo 'supertest', que se utiliza para realizar solicitudes HTTP a la aplicación.
 */
const request = require('supertest');

/**
 * Importa la aplicación principal desde el archivo index.js en la carpeta src.
 */
const app = require('../src/index.js');

/**
 * Describe un conjunto de pruebas para la API relacionada con los usuarios.
 */
describe('API /usuario', () => {
   // Test case 1
   test('Debería crear un usuario', async () => {
      // Crea un nuevo objeto de usuario con datos de ejemplo
      const usuario = {
         id: '123456789',
         nombre: 'John',
         apellido: 'Doe',
         correo: 'johndoe@example.com',
      };
      // Envía una solicitud POST al punto final /usuarios para crear un nuevo usuario
      const res = await request(app)
         .post('/usuarios')
         .send(usuario);
      // Verifica la respuesta
      expect(res.statusCode).toEqual(201);
      expect(res.body.id).toEqual(usuario.id);
      expect(res.body.nombre).toEqual(usuario.nombre);
      expect(res.body.apellido).toEqual(usuario.apellido);
      expect(res.body.correo).toEqual(usuario.correo);
   });

   // Test case 2
   test('Debería retornar una lista de usuarios', async () => {
      // Envía una solicitud GET al punto final /usuarios para obtener todos los usuarios
      const res = await request(app).get('/usuarios');
      // Verifica la respuesta
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
   });

   // Test case 3
   test('Debería actualizar un usuario existente', async () => {
      const usuarioId = '123456789';
      const updatedUsuario = {
         nombre: 'Updated Name',
         correo: 'updatedemail@example.com'
      };
      // Envía una solicitud PUT al punto final /usuarios/:id para actualizar un usuario existente
      const res = await request(app).put(`/usuarios/${usuarioId}`).send(updatedUsuario);
      // Verifica la respuesta
      expect(res.statusCode).toEqual(200);
      expect(res.body.nombre).toEqual(updatedUsuario.nombre);
      expect(res.body.correo).toEqual(updatedUsuario.correo);
   });

   // Test case 4
   test('Debería borrar un usuario existente', async () => {
      const usuarioId = '123456789';
      // Envía una solicitud DELETE al punto final /usuarios/:id para eliminar un usuario existente
      const res = await request(app).delete(`/usuarios/${usuarioId}`);
      // Verifica la respuesta
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('mensaje', 'Usuario fue eliminado con éxito');
   });
});

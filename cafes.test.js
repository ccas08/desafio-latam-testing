const request = require('supertest');
const app = require('./app');

describe('Pruebas para la API de Cafés', () => {

    it('GET /cafes debe devolver status 200 y un array con al menos un objeto', async () => {
        const response = await request(app).get('/cafes');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('DELETE /cafes/:id debe devolver 404 si el café no existe', async () => {
        const response = await request(app).delete('/cafes/999');
        expect(response.status).toBe(404);
    });

    it('POST /cafes debe agregar un nuevo café y devolver 201', async () => {
        const nuevoCafe = { id: 3, nombre: 'Latte' };
        const response = await request(app).post('/cafes').send(nuevoCafe);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(nuevoCafe);
    });

    it('PUT /cafes/:id debe devolver 400 si los IDs no coinciden', async () => {
        const cafeActualizado = { id: 2, nombre: 'Cappuccino' };
        const response = await request(app).put('/cafes/1').send(cafeActualizado);
        expect(response.status).toBe(400);
    });

});

const request = require('supertest');
const app = require('../../src/app');
const conn = require('../../src/database/conn');

describe('ONG', () => {
    beforeEach( async () => {
        await conn.migrate.rollback();
        await conn.migrate.latest();
    });

    afterAll( async () => {
        await conn.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD2",
            email: "contato@teste.com",
            wpp: "43999990000",
            cidade: "Santos",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
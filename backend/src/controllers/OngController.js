const uniqueId = require('../utils/genereateUniqueId');
const conn = require('../database/conn');

module.exports = {
    async index(request, response) {
        const ongs = await conn('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response) {
        const {name, email, wpp, cidade, uf} = request.body;

        const id = uniqueId();

        await conn('ongs').insert({
            id,
            name,
            email,
            wpp,
            cidade,
            uf
        })

        return response.json({id});
    }
}
const knex = require('../database/connection');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json('Não autorizado');

    try {
        const token = authorization.replace('Bearer ', '').trim();
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const userExists = await knex('users').where({ id }).first();
        if (!userExists) return res.status(404).json('Usuário não encontrado.');

        const { password, ...user } = userExists;
        req.user = user;
        next();
    } catch {
        return res.status(400).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
};

module.exports = {
    auth
}

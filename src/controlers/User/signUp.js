const knex = require('../../database/connection');
const bcrypt = require('bcrypt');
const signUpSchema = require('../../validations/signUpSchema');

const signUp = async (req, res) => {
    const { first_name, last_name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) return res.status(400).json({ message: "As senhas informadas não conferem." });

    try {
        await signUpSchema.validate(req.body);

        const userExists = await knex('users').where({ email }).first();
        if (userExists) return res.status(400).json({ message: "O email já está cadastrado." });

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await knex('users')
            .insert({
                first_name,
                last_name,
                email,
                phone: '',
                cpf: '',
                password: encryptedPassword
            })
            .returning('*');

        if (!user) return res.status(400).json({ mensagem: "O usuário não foi cadastrado." });

        return res.status(200).json(user[0]);
    } catch (error) {
        return res.status(400).json({ message: `${error.message}` });
    }
};

module.exports = {
    signUp
};
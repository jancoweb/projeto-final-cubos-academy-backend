const knex = require('../../database/connection');
const bcrypt = require('bcrypt');
const editUserSchema = require('../../validations/editUserSchema');

const editUser = async (req, res) => {
  let { password } = req.body;
  const { first_name, last_name, email, cpf, phone, confirmPassword } = req.body;
  const { id } = req.user;

  if (password && password !== confirmPassword) return res.status(400).json({ message: "As senhas informadas não conferem." })

  if (!first_name && !last_name && !email && !cpf && !phone && !password) {
    return res
      .status(404)
      .json({ message: 'É obrigatório informar ao menos um campo para atualização' });
  }

  try {
    await editUserSchema.validate(req.body);

    const userExists = await knex('users').where({ id }).first();
    if (!userExists) return res.status(404).json({ message: 'Usuário não encontrado.' });

    if (password)
      password = await bcrypt.hash(password, 10);

    if (email && email !== req.user.email) {
      const emailExists = await knex('users')
        .where({ email })
        .first();

      if (emailExists) return res.status(404).json({ message: 'O email já existe.' });
    }

    const editedUser = await knex('users')
      .where({ id })
      .update({
        first_name,
        last_name,
        email,
        cpf,
        phone,
        password
      });

    if (!editedUser) return res.status(400).json({ message: "Não foi possível atualizar o usuário." });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
};

module.exports = { editUser }
const knex = require('../../database/connection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginSchema = require('../../validations/loginSchema');
const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    await loginSchema.validate(req.body);

    const userLogged = await knex('users').where({ email }).first()
    if (!userLogged) return res.status(404).json({ message: 'O usuario não foi encontrado' });

    const pw = await bcrypt.compare(password, userLogged.password)
    if (pw === false) return res.status(401).json({ message: 'Email ou senha incorretos' });

    const token = jwt.sign({ id: userLogged.id }, jwtSecret);

    const user = {
      id: userLogged.id,
      name: userLogged.name,
      email: userLogged.email
    }

    const response = { user, token };

    return res.status(200).json(response);

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });

  }
}

module.exports = { login }

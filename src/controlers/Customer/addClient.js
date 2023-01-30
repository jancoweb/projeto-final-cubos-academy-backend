const knex = require('../../database/connection');
const addClientSchema = require('../../validations/addClientSchema');

const addClient = async (req, res) => {
  const { name, email, cpf, phone, street, district, city, state, zip_code, address_complement } = req.body;

  try {
    await addClientSchema.validate(req.body);

    const client = {
      name,
      email,
      cpf,
      phone
    }

    const newClient = await knex('clients').insert({ ...client }).returning('*');

    if (!newClient) return res.status(400).json({ message: 'Não foi possível cadastrar cliente' })

    const clientAddress = {
      client_id: newClient[0].id,
      street,
      district,
      city,
      state,
      zip_code,
      address_complement
    }

    const newClientAddress = await knex('client_address').insert({ ...clientAddress }).returning('*');

    return res.status(200).json({ client: newClient[0], address: newClientAddress[0] })

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
}

module.exports = { addClient }
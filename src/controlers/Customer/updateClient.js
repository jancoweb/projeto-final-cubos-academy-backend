const knex = require("../../database/connection");
const addClientSchema = require("../../validations/addClientSchema");

const updateClient = async (req, res) => {
  const { id: clientId, name, charge_status, email, cpf, phone, street, district, city, state, zip_code, address_complement } = req.body;

  try {
    await addClientSchema.validate(req.body);

    const updatedClient = await knex('clients').where({ id: clientId }).update({
      name,
      email,
      cpf,
      phone,
      charge_status: charge_status || true
    }).returning('*');

    if (!updatedClient) return res.status(400).json({ message: "O cliente não foi atualizado." });

    const updatedAddress = await knex('client_address').where({ client_id: clientId }).update({
      street: street || '',
      district: district || '',
      city: city || '',
      state: state || '',
      zip_code: zip_code || '',
      address_complement: address_complement || ''
    }).returning('*');

    return res.status(200).json({ client: updatedClient, address: updatedAddress });

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
};

module.exports = { updateClient }
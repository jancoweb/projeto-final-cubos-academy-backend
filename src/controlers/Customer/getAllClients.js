const knex = require("../../database/connection");

const getAllClients = async (req, res) => {

  try {
    const allClients = await knex('clients')
      .leftJoin('client_address', 'clients.id', 'client_address.client_id')
      .select(
        'clients.id',
        'clients.name',
        'clients.email',
        'clients.cpf',
        'clients.phone',
        'clients.date',
        'clients.charge_status',
        'client_address.street',
        'client_address.district',
        'client_address.city',
        'client_address.state',
        'client_address.zip_code',
        'client_address.address_complement'
      )

    return res.status(200).json(allClients);

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
};

module.exports = { getAllClients }
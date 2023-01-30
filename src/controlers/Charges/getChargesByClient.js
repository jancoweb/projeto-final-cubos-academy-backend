const knex = require("../../database/connection");

const getChargesByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const clientCharges = await knex(`charges`)
      .leftJoin('clients', 'charges.client_id', 'clients.id')
      .select(
        'charges.id',
        'charges.client_id',
        'clients.name',
        'charges.description',
        'charges.status',
        'charges.value',
        'charges.duedate',
      )
      .where({ client_id: clientId });

    return res.status(200).json(clientCharges);

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = { getChargesByClient }
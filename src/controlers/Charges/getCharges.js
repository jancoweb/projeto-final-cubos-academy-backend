const knex = require("../../database/connection");

const getAllCharges = async (req, res) => {

  try {
    const allCharges = await knex(`charges`)
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

    return res.status(200).json(allCharges);

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = { getAllCharges }
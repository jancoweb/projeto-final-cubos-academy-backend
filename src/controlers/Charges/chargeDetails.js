const knex = require("../../database/connection");

const chargeDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const charge = await knex('charges').where({ id: id }).returning('*');

    if (!charge) return res.status(404).json({ message: "Não foi possível encontrar a cobrança" });

    return res.status(200).json(charge[0]);
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = { chargeDetails }
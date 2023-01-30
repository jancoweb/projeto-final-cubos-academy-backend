const knex = require("../../database/connection");

const deleteCharge = async (req, res) => {
  const { id: chargeId } = req.params;

  try {
    const deletedCharge = await knex('charges').where({ id: chargeId }).del(['id']);

    if (!deletedCharge) return res.status(400).json({ message: `Não foi possível excluir a cobrança` });

    return res.status(200).send();

  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = { deleteCharge }
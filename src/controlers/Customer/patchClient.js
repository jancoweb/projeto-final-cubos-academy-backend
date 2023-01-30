const knex = require("../../database/connection");

const patchStatus = async (req, res) => {
  const { id: clientId } = req.params;
  const { status } = req.body;

  try {
    const patch = await knex('clients').where({ id: clientId }).update({ charge_status: status });
    return res.status(200).json(patch)
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = { patchStatus }
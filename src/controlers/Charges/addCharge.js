const knex = require('../../database/connection');
const addChargeSchema = require('../../validations/addChargeSchema');

const addCharge = async (req, res) => {
  const { clientId, description, status, dueDate } = req.body;
  let { value } = req.body;

  const year = dueDate.slice(0, 4);
  const month = dueDate.slice(5, 7);
  const day = dueDate.slice(8, 10);

  value = Number(value).toFixed(2);
  value = value.replace('.', '');

  try {
    await addChargeSchema.validate(req.body);

    const charge = await knex('charges').insert({
      client_id: clientId,
      description,
      status,
      value,
      duedate: new Date(year, Number(month) - 1, day)
    }).returning('*');

    if (!charge) return res.status(400).json({ message: "Não foi possível cadastrar esta cobrança" });

    return res.status(200).json(charge[0]);
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` })
  }
}

module.exports = { addCharge }
const knex = require("../../database/connection");
const addChargeSchema = require("../../validations/addChargeSchema");

const editCharge = async (req, res) => {
  const { id: chargeId } = req.params;
  const { description, status, dueDate } = req.body;
  let { value } = req.body;

  const year = dueDate.slice(0, 4);
  const month = dueDate.slice(5, 7);
  const day = dueDate.slice(8, 10);


  value = Number(value).toFixed(2);
  value = value.replace('.', '');

  try {

    await addChargeSchema.validate(req.body);

    const chargeExist = await knex('charges').where({ id: chargeId }).first();

    if (!chargeExist) return res.status(404).json({ message: "Não foi possível encontrar a cobrança." })

    const editedCharge = await knex('charges').where({ id: chargeId }).update({
      description,
      status,
      value,
      duedate: new Date(year, Number(month) - 1, day)
    });

    if (!editedCharge) return res.status(400).json({ message: "Não foi possível editar a cobrança." });

    return res.status(200).json({ message: "Cobrança alterada com sucesso." })
  } catch (error) {
    return res.status(400).json({ message: `${error.message}` });
  }
}

module.exports = { editCharge }
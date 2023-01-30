const yup = require('./yup');

const addChargeSchema = yup.object().shape({
  description: yup.string().required("Descrição é obrigatória"),
  status: yup.boolean().required("Status é obrigatório"),
  value: yup.string().required("Valor é obrigatório"),
  dueDate: yup.date().required("Data de vencimento obrigatória")
});

module.exports = addChargeSchema;
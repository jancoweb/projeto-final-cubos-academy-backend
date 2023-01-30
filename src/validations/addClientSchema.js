const yup = require('./yup');

const addClientSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email().required("O e-mail é obrigatório."),
  cpf: yup.string().required("O CPF é obrigatório"),
  phone: yup.string().required("O número de telefone é obrigatório"),
  street: yup.string(),
  district: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zip_code: yup.string(),
  address_complement: yup.string()
});

module.exports = addClientSchema;
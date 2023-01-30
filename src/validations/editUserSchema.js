const yup = require('./yup');

const editUserSchema = yup.object().shape({
  first_name: yup.string().required("O campo nome é obrigatório"),
  last_name: yup.string().required("O campo sobrenome é obrigatório"),
  email: yup.string().email().required("O campo E-mail é obrigatório"),
  confirmPassword: yup.string().required("Os campos de senha são obrigatórios")
});

module.exports = editUserSchema;
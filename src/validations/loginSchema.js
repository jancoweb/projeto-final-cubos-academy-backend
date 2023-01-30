const yup = require('./yup');

const loginSchema = yup.object().shape({
    email: yup.string().email("O E-mail deve ser válido").required("O e-mail é obrigatório."),
    password: yup.string().required("A senha é obrigatória.")
});

module.exports = loginSchema;
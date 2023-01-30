const yup = require('./yup');

const signUpSchema = yup.object().shape({
    first_name: yup.string().required("O nome é obrigatório."),
    last_name: yup.string().required("O sobrenome é obrigatório."),
    email: yup.string().email().required("O e-mail é obrigatório."),
    password: yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos').required("A senha é obrigatória."),
    confirmPassword: yup.string().required("A confirmação de senha é obrigatória.")
});

module.exports = signUpSchema;
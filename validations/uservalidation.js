const yup = require('yup')

const userSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(10).required()

});

module.exports = userSchema;
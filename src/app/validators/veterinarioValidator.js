const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            nome: Joi.string().required(),
            sexo: Joi.string().required().length(1),
            telefone: Joi.array().required(),
            email: Joi.array().required(),
            usuario: Joi.string().length(24),
            tipoUsuario: Joi.string().length(1),
            enderecosVeterinario: Joi.array().required(),
        })
    })
}
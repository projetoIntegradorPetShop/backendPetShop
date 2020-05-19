const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            nome: Joi.string().required(),
            raca: Joi.string().required(),
            cor: Joi.string().required(),
            sexo: Joi.string().required().length(1),
            dataNascimento: Joi.string().required().length(10),
            responsavelAnimal: Joi.array().required(),
        })
    })
}
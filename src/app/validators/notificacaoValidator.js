const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            remetente: Joi.string().required().length(24),
            destinatario: Joi.array().required() ,
            titulo: Joi.string().required(),
            corpo: Joi.string().required(),
            prioridade: Joi.string().required(),
            status: Joi.string() ,
            categoria: Joi.string().required(),
            backgroundColor: Joi.string().required(),
        })
    })
}
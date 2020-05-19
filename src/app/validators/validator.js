const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    listar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        }),
    }),

    detalhar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown()
    }),

    atualizar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
    }),

    deletar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown()
    })
}
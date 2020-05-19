const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            animal: Joi.string().required().length(24),
            veterinario: Joi.string().required().length(24),
            servico: Joi.string().required().length(24),
            data: Joi.string().required(),
            horario: Joi.string().required(),
            dataAgendamento: Joi.date(),            
        })
    }),
    listarData: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            data: Joi.string().required().length(10),

        })
    })
}
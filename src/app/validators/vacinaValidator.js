const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            nome: Joi.string().required(),
            utilidade: Joi.array().required(),
            tempoReaplicacao: Joi.number().required(),
            periodoReaplicacao: Joi.string().required(),
            dataReaplicacao: Joi.date(),
            dataValidade: Joi.string().required().length(10),
            statusValidade: Joi.string(),
            tempoMinimoAvisoValidade: Joi.number().required(),
            periodoMinimoAvisoValidade: Joi.string().required(),
            dataMinimaAvisoValidade: Joi.string().length(10),
        })
    })

}
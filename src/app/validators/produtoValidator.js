const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            nome: Joi.string().required(),
            descricao: Joi.string().required(),
            valor: Joi.number().required(),
            unidade: Joi.string().required(),
            estoque: Joi.number().integer().required(),
            estoqueMinimoRecomendado: Joi.number().integer().required().min(0),
            statusEstoque: Joi.string(),
            dataValidade: Joi.string().required().length(10),
            statusValidade: Joi.string(),
            tempoMinimoAvisoValidade: Joi.number().required(),
            periodoMinimoAvisoValidade: Joi.string().required(),
            dataMinimaAvisoValidade: Joi.string().length(10),
        })
    })
}
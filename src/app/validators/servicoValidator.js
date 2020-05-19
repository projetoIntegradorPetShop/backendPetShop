const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            descricao: Joi.string().required(),
            complemento: Joi.string().required(),
            valor: Joi.number().required(),
            tempoServico: Joi.number().integer().required(),
            periodoServico: Joi.string().required(),
        })
    })
}
const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required().regex(/^Bearer {1}/),//Verificar a sintaxe do token
        }).unknown(),
        [Segments.BODY]: Joi.object({
            cliente: Joi.string().required().length(24),
            servico: Joi.array().required(),
            produto: Joi.array().required(),
            valorServico: Joi.number(),
            valorProduto: Joi.number(),
            quantidadeServico: Joi.number().required(),
            quantidadeProduto: Joi.number().required(),
            formaPagamentoServico: Joi.string().required().length(1),
            formaPagamentoProduto: Joi.string().required().length(1),
            percentualServico: Joi.number().required(),
            percentualProduto: Joi.number().required(),
            totalServico: Joi.number(),
            totalProduto: Joi.number(),
            total: Joi.number(),
        })
    })
}
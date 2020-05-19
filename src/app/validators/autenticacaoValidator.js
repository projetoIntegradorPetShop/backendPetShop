const { celebrate, Segments, Joi } = require('celebrate')

module.exports = {
    cadastrar: () => celebrate({
        [Segments.BODY]: Joi.object({
            nomeUsuario: Joi.string().required(),
            email: Joi.string().email().required(),
            tipoUsuario: Joi.string().required(),
            senha: Joi.string().required(),
        })
    }),
    entrar: () => celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
            senha: Joi.string().required(),
        })
    }),
    esqueciSenha: () => celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
        })
    }),
    redefinirSenha: () => celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
            senha: Joi.string().required(),
            token: Joi.string().required().length(40),
        })
    })
}
const jwt = require('jsonwebtoken');
const configuracoesAutenticacao = require('../../config/autenticacao.json');

module.exports = (req, res, next) => {
    const headerAutenticacao = req.headers.authorization;

    if (!headerAutenticacao)
        return res.status(401).send({ error: 'Não foi informado TOKEN para autenticação' });

    const partes = headerAutenticacao.split(' ');

    if (!partes.length === 2)
        return res.status(401).send({ error: 'Erro de TOKEN' });

    const [scheme, token] = partes;
    console.log('md')
    console.log(scheme)

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'TOKEN malformatado' });

    jwt.verify(token, configuracoesAutenticacao.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'TOKEN inválido' });
        req.usuarioId = decoded.id;
        return next();
    });

};
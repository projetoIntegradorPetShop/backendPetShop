const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // para envio de email, por enquanto sem utilizar, ideia de enviar o token por email.

const configuracoesAutenticacao = require('../../config/autenticacao');

//importar schema, tabela de usuarios
const Usuario = require('../models/usuario');

const router = express.Router();

function gerarToken(params = {}) {
    return jwt.sign(params, configuracoesAutenticacao.secret, {
        expiresIn: 21600
    });
}
module.exports = {
    async cadastrar(req, res) {
        const { nomeUsuario, email, senha, tipoUsuario } = req.body;
        try {
            //Para não deixar mais de um usuário se cadastrar com o mesmo e-mail
            if (await Usuario.findOne({ email }))
                return res.status(400).send({ Erro: 'Usuário já existe' })

            //Para senha não aparecer a senha
            const usuario = await Usuario.create({ nomeUsuario, email, senha, tipoUsuario });
            usuario.senha = undefined;

            //Aparecer o cadastro do usuário, exceto a senha
            return res.send({ nomeUsuario, email, senha, tipoUsuario, token: gerarToken({ id: usuario.id }) });

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao cadastrar usuário' });
        }
    },
    async entrar(req, res) {
        //autenticacao com e email e senha, se for usuario e senha, trocar aqui!!
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email }).select('+senha');

        if (!usuario)
            return res.status(400).send({ Erro: 'Usuário não existe' });

        if (!await bcrypt.compare(senha, usuario.senha))
            return res.status(400).send({ Erro: 'Senha inválida' });

        usuario.senha = undefined;

        const token = gerarToken();

        res.send({ usuario, token: gerarToken({ id: usuario.id }) });
    },
    async esqueciSenha(req, res) {
        const { email } = req.body;

        try {

            const usuario = await Usuario.findOne({ email });

            if (!usuario)
                return res.status(400).send({ Erro: 'Usuário não encontrado' });

            const token = crypto.randomBytes(20).toString('hex');

            const horarioExpiracaoToken = new Date();
            horarioExpiracaoToken.setHours(horarioExpiracaoToken.getHours() + 1);

            await Usuario.findByIdAndUpdate(usuario.id, {
                '$set': {
                    tokenRedefinicaoSenha: token,
                    horarioExpiracaoTokenRedefinicaoSenha: horarioExpiracaoToken,
                }
            });
            console.log('\n\nToken de Redefinição de Senha: ')
            console.log(token);
            console.log('\n\n');

            const mailer = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                secure: false,
                auth: {
                    user: "aa53b3e2ec9d9d",
                    pass: "2fed4f1dfdd971"
                }
            });

            mailer.sendMail({
                from: "Contato <contato@pi.com.br>",
                to: email,
                subject: "Token de Redefinição de Senha",
                text: "Olá! Estou te enviado este token de redefinição de senha!",
                html: "Olá! Estou te enviado este token de redefinição de senha! " + token,

            }).then(message => {
                console.log(message);
            }).catch(err => {
                if (err)
                    console.log(err);
                return res.status(400).send({ Erro: 'Não é possível enviar o email de redefinição de senha' });
            })

            res.send({ resposta: 'Token enviado por email. Token enviado no console.' });
        } catch (err) {
            res.status(400).send({ Erro: 'Erro ao redefinir a senha, tente novamente' });
        }
    },
    async redefinirSenha(req, res) {
        const { email, token, senha } = req.body;

        try {
            const usuario = await Usuario.findOne({ email }).select('+tokenRedefinicaoSenha horarioExpiracaoTokenRedefinicaoSenha');

            if (!usuario)
                return res.status(400).send({ Erro: 'Usuário não encontrado' });

            if (token !== usuario.tokenRedefinicaoSenha)
                return res.status(400).send({ Erro: 'Token inválido' });

            const horarioAtual = new Date();

            if (horarioAtual > usuario.horarioExpiracaoTokenRedefinicaoSenha)
                return res.status(400).send({ Erro: 'O token expirou, gere um novo' });

            usuario.senha = senha;

            await usuario.save();
            res.send({ resposta: 'Sucesso. Tente fazer login novamente.' });


        } catch (err) {
            res.status(400).send({ Erro: 'Não foi possível redefinir a senha, tente novamente ' })
        }
    },
    async listar(req, res) {
        try {
            const usuario = await Usuario.find();
            return res.send(usuario);
        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao listar os usuários' })
        }
    },
    async filtrarTipoUsuario(req, res) {
        try {
            const tipoUsuario = req.body.usuario;
            const usuario = await Usuario.find({ tipoUsuario });
            return res.send(usuario);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async detalhar(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.usuarioId);
            return res.send(usuario);
        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao visualizar detalhes do usuario' })
        }
    },
    async deletar(req, res) {
        try {
            await Usuario.findByIdAndRemove(req.params.usuarioId);
            return res.send();

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao deletar usuário' })
        }
    }
}
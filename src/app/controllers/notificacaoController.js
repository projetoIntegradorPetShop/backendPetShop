const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');

//Importando os bancos de dados
const Notificacao = require('../models/Notificacao')

const router = express.Router();

router.use(middlewareAutenticacao);

module.exports = {
    async cadastrar(req, res) {
        try {
            const notificacao = await Notificacao.create({ ...req.body });
            return res.send(notificacao);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro ao cadastrar notificação' });
        }
    },

    async listar(req, res) {
        try {
            const { page = 1 } = req.query;
            const notificacao = await Notificacao.find();
            return res.send(notificacao);
        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao listar as notificações' })
        }
    },
    async filtrarCategoriaNotificao(req, res) {
        try {
            const categoria = req.body.categoria;
            const notificacao = await Notificacao.find({ notificacao });
            return res.send(notificacao);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarStatusNotificao(req, res) {
        try {
            const status = req.body.status;
            const notificacao = await Notificacao.find({ status });
            return res.send(notificacao);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },



    async detalhar(req, res) {
        try {

            const notificacao = await Notificacao.findById(req.params.notificacaoId);
            return res.send(notificacao)

        } catch (err) {
            return res.status(400).send('Erro ao visualizar notificação! Tente novamente.')
        }
    },
    async atualizar(req, res) {
        try {
            const notificacao = await Notificacao.findByIdAndUpdate(req.params.notificacaoId, req.body, { new: true });
            await notificacao.save();
            return res.send(notificacao);

        } catch (err) {
            return res.status(400).send('Erro ao atualizar notificação! Tente novamente.');
        }
    },
    async deletar(req, res) {
        try {
            await Notificacao.findByIdAndRemove(req.params.id);
            return res.send();

        } catch (err) {
            return res.status(400).send('Erro ao excluir notificação! Tente novamente.')
        }
    }
}

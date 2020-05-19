const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');

//Importando os bancos de dados
const Servico = require('../models/Servico')

const router = express.Router();

router.use(middlewareAutenticacao);

module.exports = {
    async cadastrar(req, res) {
        try {
            const servico = await Servico.create({ ...req.body });
            return res.send(servico);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro ao cadastrar serviço' });
        }
    },
    async listar(req, res) {
        try {
            const { page = 1 } = req.query;

            const servico = await Servico.find();
            return res.send(servico);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao listar os serviços' })
        }
    },
    async filtrarValor(req, res) {
        try {
            const valor = req.body.valor;
            const servico = await Servico.find({ valor });
            return res.send(servico);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarTempoExecucao(req, res) {
        try {
            const tempoServico = req.body.tempoServico;
            const periodoServico = req.body.periodoServico;

            const servico = await Servico.find({ tempoServico, periodoServico });
            return res.send(servico);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async detalhar(req, res) {
        try {

            const servico = await Servico.findById(req.params.servicoId);
            return res.send(servico);

        } catch (err) {
            return res.status(400).send('Erro ao visualizar serviço! Tente novamente.')
        }
    },
    async atualizar(req, res) {
        try {
            const servico = await Servico.findByIdAndUpdate(req.params.servicoId, req.body, { new: true });
            await servico.save();
            return res.send(servico);

        } catch (err) {
            return res.status(400).send('Erro ao atualizar serviço! Tente novamente.');
        }
    },
    async deletar(req, res) {
        try {
            await Servico.findByIdAndRemove(req.params.id);
            return res.send();

        } catch (err) {
            return res.status(400).send('Erro ao excluir serviço! Tente novamente.')
        }
    }
}

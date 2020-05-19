const express = require('express');
const moment = require('moment');

const calculaData = require('../utils/calculaData');
const middlewareAutenticacao = require('../middlewares/autenticacao');

//Importando os bancos de dados
const Vacina = require('../models/Vacina')

const router = express.Router();

router.use(middlewareAutenticacao);

module.exports = {
    async cadastrar(req, res) {
        try {
            const { nome, utilidade, tempoReaplicacao, periodoReaplicacao, dataValidade, periodoMinimoAvisoValidade, tempoMinimoAvisoValidade } = req.body;
            const dataReaplicacao = await calculaData.calculaData("+", Date.now(), tempoReaplicacao, periodoReaplicacao);
            const dataMinimaAvisoValidade = await calculaData.calculaData("-", dataValidade, tempoMinimoAvisoValidade, periodoMinimoAvisoValidade);
            const dataReaplicacaoFormatada = moment(dataReaplicacao).format('DD/MM/YYYY').toString();
            const dataValidadeFormatada = moment(dataValidade).format('DD/MM/YYYY').toString();
            const dataMinimaAvisoValidadeFormatada = moment(dataMinimaAvisoValidade).format('DD/MM/YYYY').toString();
            const vacina = await Vacina.create({ nome, utilidade, dataValidade: dataValidadeFormatada, tempoReaplicacao, periodoReaplicacao, dataReaplicacao: dataReaplicacaoFormatada, periodoMinimoAvisoValidade, tempoMinimoAvisoValidade, dataMinimaAvisoValidade: dataMinimaAvisoValidadeFormatada });
            return res.send('Vacina cadastrada com sucesso!');
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao cadastrar vacina! Tente novamente.');
        }
    },
    async listar(req, res) {
        try {
            const vacinas = await Vacina.find();
            return res.send(vacinas);
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao listar vacinas! Tente novamente.')
        }
    },
    async filtrarNome(req, res) {
        try {
            const nome = req.body.nome;
            const vacina = await Vacina.find({ nome });
            return res.send(vacina);
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao visualizar vacina(s)! Tente novamente.')
        }
    },
    async filtrarUtilidade(req, res) {
        try {
            const utilidade = req.body.utilidade;
            const vacina = await Vacina.find({ utilidade });
            return res.send(vacina);
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao visualizar vacina(s)! Tente novamente.')
        }
    },
    async detalhar(req, res) {
        try {
            const vacina = await Vacina.findById(req.params.vacinaId);
            return res.send(vacina)
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao visualizar vacina! Tente novamente.')
        }
    },
    async atualizar(req, res) {
        try {
            const vacina = await Vacina.findByIdAndUpdate(req.params.vacinaId, req.body, { new: true });
            await vacina.save();
            return res.send('Vacina atualizada com sucesso!');
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao atualizar vacina! Tente novamente.');
        }
    },
    async deletar(req, res) {
        try {
            await Vacina.findByIdAndRemove(req.params.vacinaId);
            return res.send('Vacina excluída com sucesso!');
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao excluir vacina! Tente novamente.')
        }
    }
}
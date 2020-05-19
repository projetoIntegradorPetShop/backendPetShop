const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');
const moment = require('moment');

//Importando os bancos de dados
const Mensagem = require('../models/Mensagem')

const router = express.Router();

router.use(middlewareAutenticacao);

module.exports = {
    async cadastrar(req, res) {
        try {
            const {remetente, destinatario, corpoMensagem, prioridade,categoria, backgroundColor, status} = req.body;
            const data = Date.now(); 
            const dataFormatada = moment(data).format('DD/MM/YYYY').toString();
            const horarioFormatado = moment(data).format('HH:mm').toString();
            const mensagem = await Mensagem.create({remetente, destinatario, corpoMensagem, prioridade,categoria, backgroundColor, status, data: dataFormatada, horario:horarioFormatado});
            return res.send(mensagem);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro ao cadastrar mensagem!' });
        }
    },
    async listar(req, res) {
        try {
            const { page = 1 } = req.query;
            const mensagem = await Mensagem.find();
            return res.send(mensagem);
        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao listar as mensagem!' })
        }
    },
    async detalhar(req, res) {
        try {

            const mensagem = await Mensagem.findById(req.params.mensagemId);
            return res.send(mensagem)

        } catch (err) {
            return res.status(400).send('Erro ao visualizar mensagem! Tente novamente.')
        }
    },
    async deletar(req, res) {
        try {
            await Mensagem.findByIdAndRemove(req.params.id);
            return res.send();
        } catch (err) {
            return res.status(400).send('Erro ao excluir mensagem! Tente novamente.')
        }
    }
}

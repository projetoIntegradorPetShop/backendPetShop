const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');
const moment = require('moment');

const calculaData = require('../utils/calculaData');

const Produto = require('../models/Produto');

const router = express.Router();

router.use(middlewareAutenticacao);

module.exports = {
    async cadastrar(req, res) {
        try {
            const { nome, valor, descricao, unidade, estoque, estoqueMinimoRecomendado, dataValidade, tempoMinimoAvisoValidade, periodoMinimoAvisoValidade, dataAplicacao, tempoReaplicacao, periodoReaplicacao } = req.body;
            const dataReaplicacao = await calculaData.calculaData("+", dataAplicacao, tempoReaplicacao, periodoReaplicacao);
            const dataMinimaAvisoValidade = await calculaData.calculaData("-", dataValidade, tempoMinimoAvisoValidade, periodoMinimoAvisoValidade);

            const dataMinimaAvisoValidadeFormatada = dataMinimaAvisoValidade.format('DD/MM/YYYY');
            const dataValidadeFormatada = moment(dataValidade).format('DD/MM/YYYY').toString();

            const dataAtual = moment();
            const dataAtualFormatada = dataAtual.format('DD/MM/YYYY').toString();

            if (dataAtualFormatada == dataValidadeFormatada) {
                res.send({ Aviso: "Aviso sobre data de validade, produto próximo ao vencimento.", Produto: nome });
            }
            else {
                const produto = await Produto.create({ nome, valor, descricao, unidade, estoque, estoqueMinimoRecomendado, dataValidade: dataValidadeFormatada, tempoMinimoAvisoValidade, periodoMinimoAvisoValidade, dataAplicacao, tempoReaplicacao, periodoReaplicacao, dataReaplicacao, tempoMinimoAvisoValidade, periodoMinimoAvisoValidade, dataMinimaAvisoValidade: dataMinimaAvisoValidadeFormatada });
                return res.send(produto);
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro ao cadastrar produto' });
        }
    },
    async listar(req, res) {
        try {
            const { page = 1 } = req.query;

            const produto = await Produto.find()
            return res.send(produto);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao listar os produtos' })
        }
    },
    async filtrarNome(req, res) {
        try {
            const nome = req.body.nome;
            const produto = await Produto.find({ nome });
            return res.send(produto);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarValor(req, res) {
        try {
            const valor = req.body.valor
            const produto = await Produto.find({ valor });
            return res.send(produto);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarUnidade(req, res) {
        try {
            const unidade = req.body.unidade
            const produto = await Produto.find({ unidade });
            return res.send(produto);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarEstoque(req, res) {
        try {
            const estoque = req.body.estoque
            const produto = await Produto.find({ estoque });
            return res.send(produto);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarEstoqueMinimoRecomendado(req, res) {
        try {
            const estoqueMinimoRecomendado = req.body.estoqueMinimoRecomendado
            const produto = await Produto.find({ estoqueMinimoRecomendado });
            return res.send(produto);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarDataValidade(req, res) {
        try {
            const dataValidade = req.body.dataValidade
            const produto = await Produto.find({ dataValidade });
            return res.send(produto);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async detalhar(req, res) {
        try {
            const produto = await Produto.findById(req.params.produtoId);
            return res.send(produto);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao visualizar produtos' })
        }
    },
    async atualizar(req, res) {
        try {
            const produto = await Produto.findByIdAndUpdate(req.params.produtoId, req.body, { new: true });
            await produto.save();
            return res.send(produto);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro  ao atualizar dados do produto' });
        }
    },
    async deletar(req, res) {
        try {
            await Produto.findByIdAndRemove(req.params.produtoId);
            return res.send();

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao excluir produto' })
        }
    }
}
const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');

//Importando os bancos de dados
const Servico = require('../models/Servico')
const Produto = require('../models/Produto')
const Financeiro = require('../models/Financeiro')

const router = express.Router();

router.use(middlewareAutenticacao);
function verificaQuantidadeEstoque(quantidade, minimo) {
    if (quantidade >= minimo) {
        const resultado = "Níveis normais"
        return resultado
    } else {
        const resultado = "Níveis abaixo"
        return resultado
    }
}
function calcularPercentual(formaPagamento, valorPagamento, percentual) {
    if (formaPagamento == "V") { //Pagamento à vista
        const valorFinal = (((100 - percentual) * valorPagamento) / 100);
        return valorFinal;
    } else {
        if (formaPagamento == "P") { //Pagamento à prazo
            const valorFinal = (((100 + percentual) * valorPagamento) / 100);
            return valorFinal;
        } else {
            return valorPagamento
        }
    }
}

module.exports = {
    async cadastrar(req, res) {
        try {
            const { cliente, servico, produto, quantidadeServico, quantidadeProduto, formaPagamentoServico, formaPagamentoProduto, percentualServico, percentualProdut } = req.body;

            //Buscar no banco pelo id, pegar o objeto.
            const buscaServico = await Servico.findById(req.body.servico);
            const buscaProduto = await Produto.findById(req.body.produto);

            const valorServico = buscaServico.valor;
            const valorProduto = buscaProduto.valor;

            if (buscaProduto.estoque <= 0) {
                return res.status(400).send({ Erro: 'Quantidade informada é maior que o estoque disponível', Produto: buscaProduto.nome, "Estoque Disponivel": buscaProduto.estoque });
            } else {
                const valorFinalProduto = calcularPercentual(req.body.formaPagamentoProduto, valorProduto, req.body.percentualProduto)
                const valorFinalServico = calcularPercentual(req.body.formaPagamentoServico, valorServico, req.body.percentualServico)

                const totalServico = quantidadeServico * valorFinalServico;
                const totalProduto = quantidadeProduto * valorFinalProduto;
                const total = totalServico + totalProduto;

                //Atualizar estoque produto
                const quantidadeEstoqueProdutos = verificaQuantidadeEstoque(buscaProduto.estoque, buscaProduto.estoqueMinimoRecomendado);
                const estoqueFinalProduto = buscaProduto.estoque - quantidadeProduto;
                const produtoAtualizado = await Produto.findByIdAndUpdate(buscaProduto.id, { estoque: estoqueFinalProduto, statusEstoque: quantidadeEstoqueProdutos }, { new: true });
                await produtoAtualizado.save();

                const financeiro = await Financeiro.create({ cliente, servico, produto, quantidadeServico, quantidadeProduto, valorServico, valorProduto, totalServico, totalProduto, total });
                return res.send(financeiro);
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro ao cadastrar fatura' });
        }
    },
    async listar(req, res) {
        try {
            const { page = 1 } = req.query;

            const financeiro = await Financeiro.find().populate(['produto', 'servico']);
            return res.send(financeiro);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao listar faturas' })
        }
    },
    async filtrarCliente(req, res) {
        try {
            const cliente = req.body.cliente;
            const financeiro = await Financeiro.find({ cliente }).populate(['produto', 'servico']);
            return res.send(financeiro);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarServico(req, res) {
        try {
            const servico = req.body.servico;
            const financeiro = await Financeiro.find({ servico }).populate(['produto', 'servico']);
            return res.send(financeiro);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarProduto(req, res) {
        try {
            const produto = req.body.produto;
            const financeiro = await Financeiro.find({ produto }).populate(['produto', 'servico']);
            return res.send(financeiro);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async detalhar(req, res) {
        try {
            const financeiro = await Financeiro.findById(req.params.financeiroId);
            return res.send(financeiro);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao visualizar faturas' })
        }
    },
    async deletar(req, res) {
        try {
            await Financeiro.findByIdAndRemove(req.params.financeiroId);
            return res.send();

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao excluir faturas' })
        }
    }
}
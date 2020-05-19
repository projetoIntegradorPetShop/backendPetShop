const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const FinanceiroSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResponsavelAnimal',
        require: true,
    },
    servico: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servico',
        require: true,
    }],
    produto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        require: true,
    }],
    valorServico: {
        type: Number,
        require: true,
    },
    valorProduto: {
        type: Number,
        require: true,
    },
    quantidadeServico: {
        type: Number,
        require: true,
    },
    quantidadeProduto: {
        type: Number,
        require: true,
    },
    formaPagamentoServico: {//v: à vista p: à prazo
        type: String,
        default: '-',
        uppercase: true,
    },
    formaPagamentoProduto: {//v: à vista p: à prazo
        type: String,
        default: '-',
        uppercase: true,
    },
    percentualServico: {
        type: Number,
        default: 0,
    },
    percentualProduto: {
        type: Number,
        default: 0,
    },
    totalServico: {
        type: Number,
        require: true,
    },
    totalProduto: {
        type: Number,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
    dataCriacao: { //data de registro no banco
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
});

//Salvar no banco
FinanceiroSchema.plugin(mongoosePaginate);
const Financeiro = mongoose.model('Financeiro', FinanceiroSchema);

module.exports = Financeiro;
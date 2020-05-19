const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const ProdutoSchema = new mongoose.Schema({
    nome: { //O QUE É (EX.: BANHO, TOSA)
        type: String,
        require: true,
        uppercase: true,
    },
    descricao: { //PARA QUE SERVE, FAZER OBSERVAÇÃO OU COMPLEMENTO(EX.: VOU LAVAR O CACHORRO, VOU CORTAR O CACHORRO)
        type: String,
        require: true,
        default: '-',
        uppercase: true,
    },
    valor: {
        type: Number,
        require: true,
    },
    unidade: { //Kg, GRAMA, LITROS(EX.: VOU LAVAR O CACHORRO, VOU CORTAR O CACHORRO)
        type: String,
        require: true,
        default: '-',
        uppercase: true,
    },
    estoque: {
        type: Number,
        require: true,
        uppercase: true,
    },
    estoqueMinimoRecomendado: {
        type: Number,
        default: 1,
        require: true,
    },
    statusEstoque: {
        type: String,
        default: '-',
        require: true,
        uppercase: true,
    },
    dataValidade: {
        type: String,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
    statusValidade: {
        type: String,
        default: '-',
        require: true,
        uppercase: true,
    },
    tempoMinimoAvisoValidade: {//1,2,3...
        type: Number,
        require: true,
    },
    periodoMinimoAvisoValidade: { //minutos, horas, dias, meses, anos...
        type: String,
        require: true,
        uppercase: true,
    },
    dataMinimaAvisoValidade: {
        type: String,
        require: true,
        uppercase: true,
    },
    dataCriacao: { //data de registro no banco
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
        uppercase: true,
    },
});

//Salvar no banco
ProdutoSchema.plugin(mongoosePaginate);
const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;
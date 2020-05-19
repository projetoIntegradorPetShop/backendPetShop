const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const ServicoSchema = new mongoose.Schema({
    descricao: { //O QUE É (EX.: BANHO, TOSA)
        type: String,
        require: true,
        uppercase: true,
    },
    complemento: { //O QUE VAI FAZER/COMPLEMENTO(EX.: VOU LAVAR O CACHORRO, CORTAR O CACHORRO)
        type: String,
        require: true,
        default: '-',
        uppercase: true,
    },
    valor: {
        type: Number,
        require: true,
    },
    tempoServico: {//1,2,3...
        type: Number,
        require: true,
    },
    periodoServico: { //minutos, horas, dias, meses, anos...
        type: String,
        require: true,
        uppercase: true,
    },
    dataCriacao: { //data de registro no banco
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
});

//Salvar no banco
ServicoSchema.plugin(mongoosePaginate);
const Servico = mongoose.model('Servico', ServicoSchema);

module.exports = Servico;
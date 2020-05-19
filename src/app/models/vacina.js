const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const VacinaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        uppercase: true,
    },
    utilidade: [{
        type: String,
        require: true,
        uppercase: true,
    }],
    tempoReaplicacao: {//1,2,3...
        type: Number,
        require: true,
    },
    periodoReaplicacao: { //minutos, horas, dias, meses, anos...
        type: String,
        require: true,
        uppercase: true,
    },
    dataReaplicacao: {
        type: String,
        default: Date.now,
        uppercase: true,
    },
    dataValidade: {
        type: String,
        require: true,
        uppercase: true,
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
    },
});

//Salvar no banco
VacinaSchema.plugin(mongoosePaginate);
const Vacina = mongoose.model('Vacina', VacinaSchema);

module.exports = Vacina;
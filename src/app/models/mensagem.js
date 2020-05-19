const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const MensagemSchema = new mongoose.Schema({
    remetente: {
        type: String,
        require: true,
    },
    destinatario: {
        type: String,
        require: true,
    },

    corpoMensagem: {
        type: String,
        require: true,
        uppercase: true,
    },
    prioridade: {
        type: String,
        default: '-',
        require: true,
        uppercase: true,
    },
    status: { //lida vs não lida, enviada vs erro no envio
        type: String,
        default: '-',
        require: true,
        uppercase: true,
    },
    backgroundColor: {
        type: String,
        default: '-',
        require: true,
        lowercase: true,
    },
    categoria: {
        type: String,
        default: '-',
        require: true,
        lowercase: true,
    },
    data: {//1,2,3...
        type: String,
        require: true,
        default: Date.now,
    },
    horario: {//1,2,3...
        type: String,
        require: true,
        default: '-',
    },
    dataCriacao: { //data de registro no banco
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
});

//Salvar no banco
MensagemSchema.plugin(mongoosePaginate);
const Mensagem = mongoose.model('Mensagem', MensagemSchema);

module.exports = Mensagem;
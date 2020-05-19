const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const NotificacaoSchema = new mongoose.Schema({
    remetente: {
        type: String,
        default: '-',
        require: true,
    },
    destinatario: [{
        type: String,
        default: '-',
        require: true,
    }],
    titulo: {
        type: String,
        require: true,
        uppercase: true,
    },
    corpo: {
        type: String,
        require: true,
        uppercase: true,
    },
    categoria: {
        type: String,
        default: '-',
        require: true,
        lowercase: true,
    },
    backgroundColor: {
        type: String,
        default: '-',
        require: true,
        lowercase: true,
    },
    prioridade: {
        type: String,
        default: '-',
        require: true,
        uppercase: true,
    },
    status: {
        type: String,
        default: '-',
        require: true,
        uppercase: true,
    },
    dataCriacao: {
        type: Date,
        default: Date.now,
    },
});

//Salvar no banco
NotificacaoSchema.plugin(mongoosePaginate);
const Notificacao = mongoose.model('Notificacao', NotificacaoSchema);

module.exports = Notificacao;
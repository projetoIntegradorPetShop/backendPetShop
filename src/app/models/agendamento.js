const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const AgendamentoSchema = new mongoose.Schema({
    animal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        require: true,
    }],
    veterinario: [{ //QUEM VAI FAZER O SERVICO
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario',
        require: true,
    }],
    servico: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servico',
        require: true,
    }],
    data: {
        type: String,
        require: true,
    },
    horario: {
        type: String,
        require: true,
        uppercase: true,
    },
    status: {
        type: String,
        default: 'AGUARDANDO CONFIRMAÇÃO',
        require: true,
        uppercase: true,
    },
    dataAgendamento: {
        type: String,
        require: true
    },
});

AgendamentoSchema.plugin(mongoosePaginate);
const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);

module.exports = Agendamento;
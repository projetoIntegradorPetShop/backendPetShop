//Importar monngoose e configurações do database
const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

//Criação do schema(TABELA) de tarefas
const EnderecoVeterinarioSchema = new mongoose.Schema({
    veterinario: { //DE QUEM É O ENDERECO
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Veterinario',
        require: true,
    },
    tipoEndereco: {
        type: String,
        require: true,
        default: 'residencial',
        uppercase: true,

    },
    rua: {
        type: String,
        require: true,
        uppercase: true,
    },
    numero: {
        type: String,
        require: true,
        uppercase: true,
    },
    complemento: {
        type: String,
        default: '-',
        uppercase: true,
    },
    bairro: {
        type: String,
        require: true,
        uppercase: true,
    },
    cidade: {
        type: String,
        require: true,
        uppercase: true,
    },
    dataCriacaoEndereco: {
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
});

EnderecoVeterinarioSchema.plugin(mongoosePaginate);
const EnderecoVeterinario = mongoose.model('EnderecoVeterinario', EnderecoVeterinarioSchema);

module.exports = EnderecoVeterinario;
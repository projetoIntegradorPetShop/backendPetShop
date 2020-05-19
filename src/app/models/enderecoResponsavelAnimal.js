const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

//Criação do schema(TABELA) de tarefas
const EnderecoResponsavelAnimalSchema = new mongoose.Schema({
    responsavelAnimal: { //DE QUEM É O ENDERECO
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResponsavelAnimal',
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

EnderecoResponsavelAnimalSchema.plugin(mongoosePaginate);
const EnderecoResponsavelAnimal = mongoose.model('EnderecoResponsavelAnimal', EnderecoResponsavelAnimalSchema);

module.exports = EnderecoResponsavelAnimal;
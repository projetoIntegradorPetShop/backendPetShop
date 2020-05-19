const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const AnimalSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        uppercase: true,
    },
    raca: {
        type: String,
        require: true,
        uppercase: true,
    },
    cor: {
        type: String,
        require: true,
        uppercase: true,
    },

    sexo: {
        type: String,
        require: true,
        uppercase: true,
    },

    dataNascimento: { //data de registro no banco
        type: String,
        require: true,
        uppercase: true,
    },
    responsavelAnimal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResponsavelAnimal',
        require: true,
    }],
    dataCriacao: { //data de registro no banco
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
});

AnimalSchema.plugin(mongoosePaginate);
const Animal = mongoose.model('Pet', AnimalSchema);

module.exports = Animal;
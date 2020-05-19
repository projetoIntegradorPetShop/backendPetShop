const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const ResponsavelAnimalSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
        uppercase: true,
    },
    sexo: {
        type: String,
        require: true,
        uppercase: true,
    },
  telefone: [{
        type: String,
        require: true,
    }],
    email: [{
        type: String,
        require: true,
        lowercase: true,
    }],
    animal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
    }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    tipoUsuario: {
        type: String,
        default: "R",
        select: false,
        uppercase: true,
    },
    enderecosResponsavelAnimal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EnderecoResponsavelAnimal',
    }],
    dataCriacao: { //data de registro no banco
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
});

ResponsavelAnimalSchema.plugin(mongoosePaginate);
const ResponsavelAnimal = mongoose.model('ResponsavelAnimal', ResponsavelAnimalSchema);

module.exports = ResponsavelAnimal;
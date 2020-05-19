const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const VeterinarioSchema = new mongoose.Schema({
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
    enderecosVeterinario: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EnderecoVeterinario',
    }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    tipoUsuario: { // veterinario ou responsavel
        type: String,
        default: "V",
        select: false,
        uppercase: true,
    },
    dataCriacao: { //data de registro no banco
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
});

//Salvar no banco
VeterinarioSchema.plugin(mongoosePaginate);
const Veterinario = mongoose.model('Veterinario', VeterinarioSchema);

module.exports = Veterinario;
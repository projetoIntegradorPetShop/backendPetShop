const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate');

//Criação do schema(TABELA) de usuarios
const UsuarioSchema = new mongoose.Schema({
    nomeUsuario: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    tipoUsuario: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        required: true,
        select: false, // para não poder ser fazer o select com este campo
    },
    tokenRedefinicaoSenha: {
        type: String,
        select: false,
    },
    horarioExpiracaoTokenRedefinicaoSenha: {
        type: Date,
        select: false,
    },
    dataCriacao: {
        type: Date,
        default: Date.now, //Data de criação pegar a data atual do sistema
    },
});

//Antes de salvar no banco, criptografar a senha
UsuarioSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 10); //10 é valor padrão
    this.senha = hash;

    next();
});

UsuarioSchema.plugin(mongoosePaginate);
const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;



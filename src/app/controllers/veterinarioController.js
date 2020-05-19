const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');

//Importando os bancos de dados
const Veterinario = require('../models/Veterinario')
const EnderecoVeterinario = require('../models/EnderecoVeterinario')

const router = express.Router();

router.use(middlewareAutenticacao);

module.exports = {
    async cadastrar(req, res) {
        try {
            const { nome, sexo, dataNascimento, telefone, email, tipoUsuario, enderecosVeterinario } = req.body;
            const veterinario = await Veterinario.create({ nome, sexo, dataNascimento, telefone, email, tipoUsuario, usuario: req.usuarioId });

            await Promise.all(enderecosVeterinario.map(async endereco => {
                const enderecoVeterinario = new EnderecoVeterinario({ ...endereco, veterinario: veterinario._id });
                await enderecoVeterinario.save();
                veterinario.enderecosVeterinario.push(enderecoVeterinario);
            }));
            await veterinario.save();
            return res.send('Veterinário cadastrada com sucesso!');

        } catch (err) {
            console.log(err);
            return res.status(400).send('Erro ao cadastrar veterinário! Tente novamente.');
        }
    },
    async listar(req, res) {
        try {
            const veterinarios = await Veterinario.find().populate('enderecosVeterinario');
            return res.send(veterinarios);
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao listar veterinário(s)! Tente novamente.')
        }
    },
    async filtrarNome(req, res) {
        try {
            const nome = req.body.nome;
            const veterinario = await Veterinario.find({ nome }).populate('enderecosVeterinario');
            return res.send(veterinario);
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao visualizar veterinário(s)! Tente novamente.')
        }
    },
    async filtrarSexo(req, res) {
        try {
            const sexo = req.body.sexo;
            const veterinario = await Veterinario.find({ sexo }).populate('enderecosVeterinario');
            return res.send(veterinario);
        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao visualizar veterinário(s)! Tente novamente.')
        }
    },
    async detalhar(req, res) {
        try {
            const veterinario = await Veterinario.findById(req.params.veterinarioId).populate('enderecosVeterinario'); //.populate(['user','tasks']); //populate('user') -> para buscar os usuarios de uma vez só
            return res.send(veterinario)

        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao visualizar veterinário! Tente novamente.')
        }
    },
    async atualizar(req, res) {
        try {
            const { nome, sexo, dataNascimento, tipoUsuario, enderecosVeterinario } = req.body;
            const veterinario = await Veterinario.findByIdAndUpdate(req.params.veterinarioId, { nome, sexo, dataNascimento, tipoUsuario }, { new: true });

            veterinario.enderecosVeterinario = [];
            await EnderecoVeterinario.remove({ veterinario: veterinario._id });

            await Promise.all(enderecosVeterinario.map(async endereco => {
                const enderecoVeterinario = new EnderecoVeterinario({ ...endereco, veterinario: veterinario._id });
                await enderecoVeterinario.save();

                veterinario.enderecosVeterinario.push(enderecoVeterinario);
            }));

            await veterinario.save();
            return res.send(veterinario);

        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao atualizar veterinário! Tente novamente.');
        }
    },
    async deletar(req, res) {
        try {
            await Veterinario.findByIdAndRemove(req.params.id);
            return res.send();

        } catch (err) {
            console.log(err)
            return res.status(400).send('Erro ao excluir veterinário! Tente novamente.')
        }
    }
}
const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');

//Importando os bancos de dados
const ResponsavelAnimal = require('../models/ResponsavelAnimal')
const EnderecoResponsavelAnimal = require('../models/enderecoResponsavelAnimal')
const Veterinario = require('../models/Veterinario')
const Animal = require('../models/Animal')

const router = express.Router();

router.use(middlewareAutenticacao);

module.exports = {
    async cadastrar(req, res) {
        try {
            const { nome, sexo, telefone, email, tipoUsuario, enderecosResponsavelAnimal } = req.body;
            const responsavelAnimal = await ResponsavelAnimal.create({ nome, sexo, telefone, email, tipoUsuario, usuario: req.usuarioId });

            await Promise.all(enderecosResponsavelAnimal.map(async endereco => {
                const enderecoResponsavelAnimal = new EnderecoResponsavelAnimal({ ...endereco, responsavelAnimal: responsavelAnimal._id });
                await enderecoResponsavelAnimal.save();
                responsavelAnimal.enderecosResponsavelAnimal.push(enderecoResponsavelAnimal);
            }));

            await responsavelAnimal.save();
            return res.send( responsavelAnimal );

        } catch (err) {
            console.log(err);
            return res.status(400).send({ Erro: 'Erro ao cadastrar responsável de animais' });
        }
    },
    async listar(req, res) {
        try {
            const responsavelAnimal = await ResponsavelAnimal.find().populate(['animal', 'enderecosResponsavelAnimal']);
            return res.send( responsavelAnimal);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao listar os responsáveis de animais' })
        }
    },
    async filtrarNome(req, res) {
        try {
            const nome = req.body.nome;
            const responsavelAnimal = await ResponsavelAnimal.find({ nome }).populate(['animal', 'enderecosResponsavelAnimal']);
            return res.send( responsavelAnimal );
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarSexo(req, res) {
        try {
            const sexo = req.body.sexo;
            const responsavelAnimal = await ResponsavelAnimal.find({ sexo }).populate(['animal', 'enderecosResponsavelAnimal']);
            return res.send( responsavelAnimal );
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async detalhar(req, res) {
        try {
            const responsavelAnimal = await ResponsavelAnimal.findById(req.params.responsavelAnimalId).populate(['animal', 'veterinario', 'enderecosResponsavelAnimal']);
            return res.send( responsavelAnimal )

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao visualizar responsável de animais' })
        }
    },
    async atualizar(req, res) {
        try {
            const { nome, sexo, dataNascimento, tipoUsuario, enderecosResponsavelAnimal } = req.body;
            const responsavelAnimal = await ResponsavelAnimal.findByIdAndUpdate(req.params.responsavelAnimalId, { nome, sexo, dataNascimento, tipoUsuario }, { new: true });

            responsavelAnimal.enderecosResponsavelAnimal = [];
            await EnderecoResponsavelAnimal.remove({ responsavelAnimal: responsavelAnimal._id });

            await Promise.all(enderecosResponsavelAnimal.map(async endereco => {
                const enderecoResponsavelAnimal = new EnderecoResponsavelAnimal({ ...endereco, responsavelAnimal: responsavelAnimal._id });
                await enderecoResponsavelAnimal.save();

                responsavelAnimal.enderecosResponsavelAnimal.push(enderecoResponsavelAnimal);
            }));

            await responsavelAnimal.save();
            return res.send( responsavelAnimal );

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao atualizar responsável de animais' });
        }
    },
    async deletar(req, res) {
        try {
            await ResponsavelAnimal.findByIdAndRemove(req.params.id);
            return res.send();

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao excluir responsável de animais' })
        }
    }
}
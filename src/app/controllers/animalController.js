const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');
const moment = require('moment');

//Importando os bancos de dados
const Animal = require('../models/Animal')
const ResponsavelAnimal = require('../models/ResponsavelAnimal')

const router = express.Router();

router.use(middlewareAutenticacao);
module.exports = {
    async cadastrar(req, res) {
        try {
            const { nome, raca, cor, sexo, responsavelAnimal, dataNascimento } = req.body;
            const dataNascimentoFormatada = moment(dataNascimento).format('DD/MM/YYYY').toString();
            const animal = await Animal.create({ nome, raca, cor, sexo, dataNascimento: dataNascimentoFormatada, responsavelAnimal });
            return res.send(animal);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao cadastrar animal' });
        }
    },
    async listar(req, res) {
        try {
            const animais = await Animal.find().populate('responsavelAnimal');
            return res.send(animais);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao listar animais' })
        }
    },
    async filtrarNome(req, res) {
        try {
            const nome = req.body.nome;
            const animal = await Animal.find({ nome }).populate('responsavelAnimal');
            return res.send(animal);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarRaca(req, res) {
        try {
            const raca = req.body.raca;
            const animal = await Animal.find({ raca }).populate('responsavelAnimal');
            return res.send(animal);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async filtrarCor(req, res) {
        try {
            const cor = req.body.cor;
            const animal = await Animal.find({ cor }).populate('responsavelAnimal');
            return res.send(animal);
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar, tente novamente' })
        }
    },
    async detalhar(req, res) {
        try {
            const animal = await Animal.findById(req.params.animalId).populate('responsavelAnimal');
            return res.send(animal)
        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao visualizar animal' })
        }
    },
    async atualizar(req, res) {
        try {
            const animal = await Animal.findByIdAndUpdate(req.params.animalId, req.body, { new: true });

            await animal.save();
            return res.send(animal);

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro  ao atualizar animal' });
        }
    },
    async deletar(req, res) {
        try {
            await Animal.findByIdAndRemove(req.params.animalId);
            return res.send();

        } catch (err) {
            return res.status(400).send({ Erro: 'Erro ao excluir animal' })
        }
    }
}
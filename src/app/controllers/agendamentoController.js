const express = require('express');
const middlewareAutenticacao = require('../middlewares/autenticacao');
const moment = require('moment');

const calculaData = require('../utils/calculaData');
//Importando os bancos de dados
const Agendamento = require('../models/Agendamento')
const Servico = require('../models/Servico')
const Animal = require('../models/Animal')
const Veterinario = require('../models/Veterinario')

const router = express.Router();

function converterStringParaData(string) {
    const parte = string.split("/");
    return new Date(parte[2], parte[1] - 1, parte[0]);
}
function converterStringParaDataHora(string) {
    const parte = string.split(":");
    return new Date(2020 / 01 / 01, parte[2], parte[1] - 1);
}
function converterStringParaHora(string) {
    var parts = string.split(":");
    return new Date(2020 - 01 - 01, parts[1] - 1, parts[0]);
}

router.use(middlewareAutenticacao);
module.exports = {
    async cadastrar(req, res) {
        try {
            const dataAgendamento = Date.now()
            const { animal, veterinario, servico, status, data, horario } = req.body;
            const buscaServico = await Servico.findById(req.body.servico);
            const dataFormatada = moment(data).format('DD/MM/YYYY').toString();
            const dataAgendamentoFormatada = moment(dataAgendamento).format('DD/MM/YYYY').toString();
            const buscaAgendamento = await Agendamento.find({ data: dataFormatada });
            const buscaVeterinario = await Veterinario.find({ id: veterinario });

            //calcularProximoHorarioMinimo de servico
            const horarioMinimo = calculaData.calculaData("+", horario, buscaServico.tempoServico, buscaServico.periodoServico);
            const horarioFormatado = moment(horario).format('HH:mm').toString();
            const horarioMinimoFormatado = moment(horarioMinimo).format('HH:mm').toString();

            function verificaData() { if (moment(data).isBefore(dataAgendamento)) { return res.send({ Erro: "Data informada inválida, data deve ser posterior a data atual." }) } }

            function verificaDisponibilidadeVeterinarioDia() {
                for (var i = 0; i < buscaVeterinario.length; i++) {
                    buscaVeterinario[i]
                    return disponibilidadeVeterinarioDia;
                }
            }
            function verificaDisponibilidadeHorarioDia() {
                for (var i = 0; i < buscaAgendamento.length; i++) {
                    const disponibilidadeHorarioDia = moment(converterStringParaDataHora(horario)).isAfter((converterStringParaHora(buscaAgendamento[i].horario)));
                    return disponibilidadeHorarioDia;
                }
            }

            const verificaValidadeData = verificaData()
            const disponibilidadeVeterinario = verificaDisponibilidadeVeterinarioDia();
            const disponibilidadeHorario = verificaDisponibilidadeHorarioDia();

            if (verificaValidadeData == false) {
                return res.send({ Erro: "Data selecionada inválida. A data deve ser posterior a data atual." });
            } else {
                if (disponibilidadeHorario == false) {
                    return res.send({ "Horário selecionado": horarioFormatado, Aviso: "Horário indisponível com o veterinário selecionado" })
                } else {
                    if (disponibilidadeVeterinario == false) {
                        return res.send({ Erro: "O veterinário selecionado no momento está em atendimento.", "Próximo horário disponível": horarioMinimoFormatado })
                    }
                    else {
                        const agendamento = await Agendamento.create({ animal, veterinario, servico, status, data: dataFormatada, horario: horarioFormatado, dataAgendamento: dataAgendamentoFormatada });
                        return res.send(agendamento);
                    }
                }
            }
        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao cadastrar agendamento' });
        }
    },
    async listar(req, res) {
        try {
            const agendamento = await Agendamento.find().populate(['servico', 'animal', 'veterinario']);
            return res.send(agendamento);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao listar agendamentos' })
        }
    },
    async filtrarData(req, res) {
        try {
            const data = req.body.data;
            const agendamento = await Agendamento.find({ data }).populate(['servico', 'animal', 'veterinario']);
            return res.send(agendamento);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar agendamentos' })
        }
    },
    async filtrarHorario(req, res) {
        try {
            const horario = req.body.horario;
            const agendamento = await Agendamento.find({ horario }).populate(['servico', 'animal', 'veterinario']);
            return res.send(agendamento);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar agendamentos' })
        }
    },
    async filtrarServico(req, res) {
        try {
            const servico = req.body.servico;
            const agendamento = await Agendamento.find({ servico }).populate(['servico', 'animal', 'veterinario']);
            return res.send(agendamento);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar agendamentos' })
        }
    },
    async filtrarVeterinario(req, res) {
        try {
            const veterinario = req.body.veterinario;
            const agendamento = await Agendamento.find({ veterinario }).populate(['servico', 'animal', 'veterinario']);
            return res.send(agendamento);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar agendamentos' })
        }
    },
    async filtrarAnimal(req, res) {
        try {
            const animal = req.body.animal;
            const agendamento = await Agendamento.find({ animal }).populate(['servico', 'animal', 'veterinario']);
            return res.send(agendamento);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar agendamentos' })
        }
    },
    async filtrarDataAgendamento(req, res) {
        try {
            const dataAgendamento = req.body.dataAgendamento;
            const agendamento = await Agendamento.find({ dataAgendamento }).populate(['servico', 'animal', 'veterinario']);
            return res.send(agendamento);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar agendamentos' })
        }
    },
    async detalhar(req, res) {
        try {
            const agendamento = await Agendamento.findById(req.params.agendamentoId).populate(['servico', 'animal', 'veterinario']);
            return res.send(agendamento)

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao visualizar agendamento' })
        }
    },
    async atualizar(req, res) {
        try {
            const agendamento = await Agendamento.findByIdAndUpdate(req.params.agendamentoId, req.body, { new: true });

            await agendamento.save();
            return res.send(agendamento);

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro  ao atualizar agendamento' });
        }
    },
    async deletar(req, res) {
        try {
            await Agendamento.findByIdAndRemove(req.params.agendamentoId);
            return res.send();

        } catch (err) {
            console.log(err)
            return res.status(400).send({ Erro: 'Erro ao excluir agendamento' })
        }
    }
}
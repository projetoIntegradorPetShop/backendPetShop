const express = require('express');
const router = express.Router();

//Importando os Controllers
const agendamentoController = require('./app/controllers/agendamentoController');
const animalController = require('./app/controllers/animalController');
const autenticacaoController = require('./app/controllers/autenticacaoController');
const financeiroController = require('./app/controllers/financeiroController');
const mensagemController = require('./app/controllers/mensagemController');
const notificacaoController = require('./app/controllers/notificacaoController');
const produtoController = require('./app/controllers/produtoController');
const responsavelAnimalController = require('./app/controllers/responsavelAnimalController');
const servicoController = require('./app/controllers/servicoController');
const vacinaController = require('./app/controllers/vacinaController');
const veterinarioController = require('./app/controllers/veterinarioController');

//Importando os Validators
const validator = require('./app/validators/validator');
const agendamentoValidator = require('./app/validators/agendamentoValidator');
const animalValidator = require('./app/validators/animalValidator');
const autenticacaoValidator = require('./app/validators/autenticacaoValidator');
const financeiroValidator = require('./app/validators/financeiroValidator');
const notificacaoValidator = require('./app/validators/notificacaoValidator');
const mensagemValidator = require('./app/validators/mensagemValidator');
const produtoValidator = require('./app/validators/produtoValidator');
const responsavelAnimalValidator = require('./app/validators/responsavelAnimalValidator');
const servicoValidator = require('./app/validators/servicoValidator');
const vacinaValidator = require('./app/validators/vacinaValidator');
const veterinarioValidator = require('./app/validators/veterinarioValidator');

function index(req, res) {
    res.send('OK');
}

router.get('/', index)

//Rotas Autenticação
router.post('/autenticar/cadastrar', autenticacaoValidator.cadastrar(), autenticacaoController.cadastrar);
router.post('/autenticar/entrar', autenticacaoValidator.entrar(), autenticacaoController.entrar);
router.post('/autenticar/esqueci_senha', autenticacaoValidator.esqueciSenha(), autenticacaoController.esqueciSenha);
router.post('/autenticar/redefinir_senha', autenticacaoValidator.redefinirSenha(), autenticacaoController.redefinirSenha);
router.get('/autenticar/', validator.listar(), autenticacaoController.listar);
router.get('/autenticar/filtrar/tipoUsuario', autenticacaoController.filtrarTipoUsuario);
router.get('/autenticar/detalhes/:usuarioId', validator.detalhar(), autenticacaoController.detalhar);
router.delete('/autenticar/detalhes/excluir/:usuarioId', validator.deletar(), autenticacaoController.deletar);

//Rotas Mensagens
router.post('/mensagem/', mensagemValidator.cadastrar(), mensagemController.cadastrar);
router.get('/mensagem/', validator.listar(), mensagemController.listar)
router.get('/mensagem/:mensagemId', validator.detalhar(), mensagemController.detalhar);
router.delete('/mensagem/:mensagemId', validator.deletar(), mensagemController.deletar);

//Rotas Notificação
router.post('/notificacao/', notificacaoValidator.cadastrar(), notificacaoController.cadastrar);
router.get('/notificacao/', validator.listar(), notificacaoController.listar);
router.get('/notificacao/filtrar/categoria', notificacaoController.filtrarCategoriaNotificao);
router.get('/notificacao/filtrar/status', notificacaoController.filtrarStatusNotificao);
router.get('/notificacao/:notificacaoId', validator.detalhar(), notificacaoController.detalhar);
router.put('/notificacao/:notificacaoId', validator.atualizar(), notificacaoController.atualizar);
router.delete('/notificacao/:notificacaoId', validator.deletar(), notificacaoController.deletar);

//Rotas Animal
router.post('/animais/', animalValidator.cadastrar(), animalController.cadastrar);
router.get('/animais/', validator.listar(), animalController.listar);
router.get('/animais/filtrar/nome', animalController.filtrarNome);
router.get('/animais/filtrar/raca', animalController.filtrarRaca);
router.get('/animais/filtrar/cor', animalController.filtrarCor);
router.get('/animais/:animalId', validator.detalhar(), animalController.detalhar);
router.put('/animais/:animalId', validator.atualizar(), animalController.atualizar);
router.delete('/animais/:animalId', validator.deletar(), animalController.deletar);

//Rotas Responsável Animal
router.post('/responsavelAnimais/', responsavelAnimalValidator.cadastrar(), responsavelAnimalController.cadastrar);
router.get('/responsavelAnimais/', validator.listar(), responsavelAnimalController.listar);
router.get('/responsavelAnimais/filtrar/nome', responsavelAnimalController.filtrarNome);
router.get('/responsavelAnimais/filtrar/sexo', responsavelAnimalController.filtrarSexo);
router.get('/responsavelAnimais/:responsavelAnimalId', validator.detalhar(), responsavelAnimalController.detalhar);
router.put('/responsavelAnimais/:responsavelAnimalId', validator.atualizar(), responsavelAnimalController.atualizar);
router.delete('/responsavelAnimais/:responsavelAnimalId', validator.deletar(), responsavelAnimalController.deletar);

//Rotas Veterinário
router.post('/veterinarios/', veterinarioValidator.cadastrar(), veterinarioController.cadastrar);
router.get('/veterinarios/', validator.listar(), veterinarioController.listar);
router.get('/veterinarios/filtrar/nome', veterinarioController.filtrarNome);
router.get('/veterinarios/filtrar/sexo', veterinarioController.filtrarSexo);
router.get('/veterinarios/:veterinarioId', validator.detalhar(), veterinarioController.detalhar);
router.put('/veterinarios/:veterinarioId', validator.atualizar(), veterinarioController.atualizar);
router.delete('/veterinarios/:veterinarioId', validator.deletar(), veterinarioController.deletar);

//Rotas Vacina
router.post('/vacinas/', vacinaValidator.cadastrar(), vacinaController.cadastrar);
router.get('/vacinas/', validator.listar(), vacinaController.listar);
router.get('/vacinas/filtrar/nome', vacinaController.filtrarNome);
router.get('/vacinas/filtrar/utilidade', vacinaController.filtrarUtilidade);
router.get('/vacinas/:vacinaId', validator.detalhar(), vacinaController.detalhar);
router.put('/vacinas/:vacinaId', validator.atualizar(), vacinaController.atualizar);
router.delete('/vacinas/:vacinaId', validator.deletar(), vacinaController.deletar);

//Rotas Agendamento
router.post('/agendamento/', agendamentoValidator.cadastrar(), agendamentoController.cadastrar);
router.get('/agendamento/', validator.listar(), agendamentoController.listar);
router.get('/agendamento/filtrar/data', agendamentoController.filtrarData);
router.get('/agendamento/filtrar/animal', agendamentoController.filtrarAnimal);
router.get('/agendamento/filtrar/horario', agendamentoController.filtrarHorario);
router.get('/agendamento/filtrar/servico', agendamentoController.filtrarServico);
router.get('/agendamento/filtrar/dataAgendamento', agendamentoController.filtrarDataAgendamento);
router.get('/agendamento/filtrar/veterinario', agendamentoController.filtrarVeterinario);
router.get('/agendamento/:agendamentoId', validator.detalhar(), agendamentoController.detalhar);
router.put('/agendamento/:agendamentoId', validator.atualizar(), agendamentoController.atualizar);
router.delete('/agendamento/:agendamentoId', validator.deletar(), agendamentoController.deletar);

//Rotas Financeiro
router.post('/financeiro/', financeiroValidator.cadastrar(), financeiroController.cadastrar);
router.get('/financeiro/', validator.listar(), financeiroController.listar);
router.get('/financeiro/filtrar/cliente', financeiroController.filtrarCliente);
router.get('/financeiro/filtrar/produto', financeiroController.filtrarProduto);
router.get('/financeiro/filtrar/servico', financeiroController.filtrarServico);
router.get('/financeiro/:financeiroId', validator.detalhar(), financeiroController.detalhar);
router.delete('/financeiro/:faturaId', validator.deletar(), financeiroController.deletar);

//Rotas Produto
router.post('/produtos/', produtoValidator.cadastrar(), produtoController.cadastrar);
router.get('/produtos/', validator.listar(), produtoController.listar);
router.get('/produtos/filtrar/nome', produtoController.filtrarNome);
router.get('/produtos/filtrar/valor', produtoController.filtrarValor);
router.get('/produtos/filtrar/unidade', produtoController.filtrarUnidade);
router.get('/produtos/filtrar/estoque', produtoController.filtrarEstoque);
router.get('/produtos/filtrar/estoqueMinimoRecomendado', produtoController.filtrarEstoqueMinimoRecomendado);
router.get('/produtos/filtrar/dataValidade', produtoController.filtrarDataValidade);
router.get('/produtos/:produtoId', validator.detalhar(), produtoController.detalhar);
router.put('/produtos/:produtoId', validator.atualizar(), produtoController.atualizar);
router.delete('/produtos/:produtoId', validator.deletar(), produtoController.deletar);

//Rotas Servico
router.post('/servicos/', servicoValidator.cadastrar(), servicoController.cadastrar);
router.get('/servicos/', validator.listar(), servicoController.listar);
router.get('/servicos/filtrar/valor', servicoController.filtrarValor);
router.get('/servicos/filtrar/tempoExecucao', servicoController.filtrarTempoExecucao);
router.get('/servicos/:servicoId', validator.detalhar(), servicoController.detalhar);
router.put('/servicos/:servicoId', validator.atualizar(), servicoController.atualizar);
router.delete('/servicos/:servicoId', validator.deletar(), servicoController.deletar);

module.exports = router;
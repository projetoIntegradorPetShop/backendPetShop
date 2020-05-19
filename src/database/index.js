const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projetoIntegrador', { useMongoClient: true }); //projetoIntegrador ===> nome do banco

mongoose.Promise = global.Promise;

module.exports = mongoose;

//Padrão para toda conexão
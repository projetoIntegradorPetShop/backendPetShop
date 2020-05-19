const moment = require('moment');

module.exports = {
    calculaData(tipo, data, tempo, periodo) {
        const dt = moment(data)

        if (periodo == "SEGUNDO") { periodo = "second" }
        if (periodo == "SEGUNDOS") { periodo = "seconds" }
        if (periodo == "MINUTO") { periodo = "minute" }
        if (periodo == "MINUTOS") { periodo = "minutes" }
        if (periodo == "HORA") { periodo = "hour" }
        if (periodo == "HORAS") { periodo = "hours" }
        if (periodo == "DIA") { periodo = "day" }
        if (periodo == "DIAS") { periodo = "days" }
        if (periodo == "MES") { periodo = "month" }
        if (periodo == "MESES") { periodo = "months" }
        if (periodo == "ANO") { periodo = "year" }
        if (periodo == "ANOS") { periodo = "years" }

        if (tipo == "+") {
            const dataFinal = dt.add(tempo, periodo);
            return (dataFinal);
        } else if (tipo == "-") {
            const dataFinal = dt.subtract(tempo, periodo);
            return (dataFinal)
        } else {
            return "Erro, opção inválida";
        }

    }
}
function pegaHoraInicio () {
    const inicioEstudo = new Date();
    console.log(inicioEstudo)

    return inicioEstudo;
}

function pegaHoraFimEstudo() {
    const terminoEstudo = new Date();
    console.log(terminoEstudo)
    
    return terminoEstudo;
}

function calculaTempoDeEstudo(dataTermino, dataInicio) {

    const diferenca = dataTermino - dataInicio;

    const resultadoHr = new Date(diferenca)
    return resultadoHr

}
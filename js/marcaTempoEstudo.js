var inicioEstudo;
var terminoEstudo;


function pegaHoraInicio () {
    inicioEstudo = new Date();
    // console.log(inicioEstudo)

    return inicioEstudo
}

function pegaHoraFimEstudo() {
    terminoEstudo = new Date();
    // console.log(terminoEstudo)
    
    return terminoEstudo
}

function calculaTempoDeEstudo(dataTermino, dataInicio) {
    var hr;
    var min;
    var sec;

    const qtdSegundos = Math.ceil((dataTermino.getTime() - dataInicio.getTime()) / 1000)

    if (qtdSegundos > 3600) {       
        hr = parseInt(qtdSegundos / 3600)
        min = parseInt((qtdSegundos / 60) - 60)
        sec = qtdSegundos % 60

        
    } else {
        if (qtdSegundos > 60) {
            sec = qtdSegundos % 60
            min = parseInt(qtdSegundos / 60)
            
        } else {
            sec = qtdSegundos;
            min = 0;
        }
        
        hr = 0
        
    }    

    return exibeMensagem(`Você estudou ${hr}hr,${min}min e ${sec}seg.`)

}
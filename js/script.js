var botoes = document.querySelectorAll(`[data-botao]`);
let contadores = document.querySelectorAll(`[data-contador]`);

botoes.forEach(elemento => elemento.addEventListener(`click`, () => {
    const divDoBotao = elemento.parentNode;
    const operacaoARealizar = elemento.innerText;


    switch (elemento.innerText) {
        case 'add': adicionaTempo(divDoBotao);
            break;
        case 'remove': reduzTempo(divDoBotao);
            break;
        case `play_arrow` : iniciaContagem(contadores);
    }

    //console.log(`A operação a realizar é ${operacaoARealizar}`)
}))

function adicionaTempo(div) {

    var numeros = div.querySelector('#numeros');
    
    //console.log(div.classList[0]);

    switch (div.classList[0]) {

        case `horas` : adicionaHoras(numeros, div.classList[0]);
        break;
        case `minutos` : adicionaMinutos(numeros, div.classList[0]);
        break;
        case `segundos` : adicionaSegundos(numeros, div.classList[0]);
        break;
        
    }

}

function reduzTempo(div) {
    var numeros = div.querySelector('#numeros');

    if (numeros.value > 0) {
        numeros.value = (parseInt(numeros.value) - 1)//.toFixed(2);

    } else {
        alert('Você não pode inserir um valor negativo');
        
    }
}

function adicionaHoras(numeros, div) {

    if (numeros.value >= 10 && div == `horas`) {
        alert(`Você não pode definir mais que 10 ${div.classList}`)
        
    } else {
        numeros.value = (parseInt(numeros.value) + 1).toFixed(0).padStart(2, '0');;
    }
}

function adicionaMinutos(numeros, div) {

    if (numeros.value >= 59 && div == `minutos`) {
        numeros.value = 0;
        adicionaHoras(contadores[0], contadores[0].parentNode)
    
    } else {
        numeros.value = (parseInt(numeros.value) + 1).toFixed(0).padStart(2, '0');
    }

}

function adicionaSegundos(numeros, div) {
    
    if (numeros.value >= 59 && div == `segundos`) {

        numeros.value = 0;
        adicionaHoras(contadores[1], contadores[1].parentNode)
        
    } else {

        numeros.value = (parseInt(numeros.value) + 1).toFixed(0).padStart(2, '0');

    }
}

function iniciaContagem(horasMinutosSegundos) {

    var horas = parseInt(horasMinutosSegundos[0].value);
    var minutos = parseInt(horasMinutosSegundos[1].value);
    var segundos = parseInt(horasMinutosSegundos[2].value);
    console.log(botoes);
    const cronometroInterval = setInterval(() => {
        if (segundos > 0) {
            segundos--;
        } else {
            if (minutos > 0) {
                minutos--;
                segundos = 59;
            } else {
                if (horas > 0) {
                    horas--;
                    minutos = 59;
                    segundos = 59;
                } else {
                    clearInterval(cronometroInterval);
                    exibeMensagem("Tempo esgotado!")
                }
            }
        }

        horasMinutosSegundos[0].value = horas.toString().padStart(2, '0');
        horasMinutosSegundos[1].value = minutos.toString().padStart(2, '0');
        horasMinutosSegundos[2].value = segundos.toString().padStart(2, '0');

        //console.log(`${horas} ${minutos} ${segundos}`);
    }, 1000);

}

var divMensaqgem = document.getElementById(`div_mensagem`);
var mensagemAExibir = document.getElementById(`mensagem`);
var fecharMensagem = document.getElementById(`fechar`);

function exibeMensagem (mensagem) {
    divMensaqgem.style.display = 'block';
    mensagemAExibir.innerHTML = mensagem

    fecharMensagem.addEventListener(`click`, () => {
        divMensaqgem.style.display = 'none';
    })
}


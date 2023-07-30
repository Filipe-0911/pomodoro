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
        numeros.value = (parseInt(numeros.value) + 1)//.toFixed(2);
    }
}

function adicionaMinutos(numeros, div) {

    if (numeros.value >= 59 && div == `minutos`) {
        numeros.value = 0;
        adicionaHoras(contadores[0], contadores[0].parentNode)
    
    } else {
        numeros.value = (parseInt(numeros.value) + 1)//.toFixed(2);
    }

}

function adicionaSegundos(numeros, div) {
    
    if (numeros.value >= 59 && div == `segundos`) {
        numeros.value = 0;
        adicionaHoras(contadores[1], contadores[1].parentNode)
        
    } else {
        numeros.value = (parseInt(numeros.value) + 1)//.toFixed(2);
    }
}

function iniciaContagem(horasMinutosSegundos) {
    
    horasMinutosSegundos.forEach(elemento => {
        
        console.log(elemento.value)
        console.log(elemento.classList.value);

        


    })
}
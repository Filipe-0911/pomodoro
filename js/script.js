const contadores = document.querySelectorAll(`[data-contador]`);
const elementoBaixoCaixaMsg = document.querySelector('.local-botao');
// const loFi = new Audio('sound/lofi2.mp3');
const loFi = new Audio('sound/lotrLoFi.mp3');
const audio = new Audio('sound/alarme.mp3');
var botoes = document.querySelectorAll(`[data-botao]`);
var divMensagem = document.getElementById(`div_mensagem`);
var mensagemAExibir = document.getElementById(`mensagem`);
var fecharMensagem = document.getElementById(`fechar`);
var doisPontos = document.querySelectorAll(`.dois_pontos`);
var exemplos = document.querySelectorAll('[data-exemplos]');
var botaoVolume = document.querySelector('[data-botao="volume"]');
var aumentaVolume = document.querySelector('[data-range-volume]');
var rodape = document.querySelector('.rodape');
var concentracao;
var descanco;
var volumeAlterado = 1;
var tempoTimer = 1000;

botoes.forEach(elemento => elemento.addEventListener(`mousedown`, () => {
    const divDoBotao = elemento.parentNode;
    switch (elemento.innerText) {
        case 'add': adicionaTempo(divDoBotao);
            break;
        case 'remove': reduzTempo(divDoBotao);
            break;
        case `play_arrow`: iniciaContagem(contadores);
            break;
    }

}))
function adicionaTempo(div) {
    var numeros = div.querySelector("[data-numeros]")

    switch (div.classList[0]) {
        case `horas`: adicionaHoras(numeros, div.classList[0]);
            break;
        case `minutos`: adicionaMinutos(numeros, div.classList[0]);
            break;
        case `segundos`: adicionaSegundos(numeros, div.classList[0]);
            break;
    }

}
function reduzTempo(div) {
    var numeros = div.querySelector('#numeros');

    if (numeros.value > 0) {
        numeros.value = (parseInt(numeros.value) - 1).toString().padStart(2, '0');

    } else {
        exibeMensagem(`Você não pode inserir um valor negativo`);
    }

}
function adicionaHoras(numeros, div) {
    if (numeros.value >= 10 && div == `horas`) {
        exibeMensagem(`Você não pode definir mais que 10 ${div.classList}`);

    } else {
        numeros.value = (parseInt(numeros.value) + 1).toString().padStart(2, '0');;;
    }

}
function adicionaMinutos(numeros, div) {
    if (numeros.value >= 59 && div == `minutos`) {
        numeros.value = (0).toString().padStart(2, '0');
        adicionaHoras(contadores[0], contadores[0].parentNode);

    } else {
        numeros.value = (parseInt(numeros.value) + 1).toString().padStart(2, '0');;
    }

}
function adicionaSegundos(numeros, div) {
    if (numeros.value >= 59 && div == `segundos`) {
        numeros.value = (0).toString().padStart(2, '0');
        adicionaHoras(contadores[1], contadores[1].parentNode);

    } else {
        numeros.value = (parseInt(numeros.value) + 1).toString().padStart(2, '0');
    }

}
function iniciaContagem(horasMinutosSegundos) {
    var horas = parseInt(horasMinutosSegundos[0].value);
    var minutos = parseInt(horasMinutosSegundos[1].value);
    var segundos = parseInt(horasMinutosSegundos[2].value);
    loFi.loop = true;
    loFi.play();
    initializeAudio();
    loFi.volume = volumeAlterado;
    
    botaoVolume.style.display = "block";
    botoes[7].style.display = "block";
    rodape.style.display = "none";

    if (loFi.volume > 0) {
        aumentaVolume.style.display = "block";
    }

    botoes.forEach(elemento => {

        switch (elemento.dataset.botao) {
            case `soma`: elemento.style.display = 'none';
                break;
            case `subtrai`: elemento.style.display = 'none';
                break;
        }

    })

    doisPontos.forEach(elemento => {
        elemento.style.display = 'block';

    })

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
                    loFi.loop = false;
                    audio.loop = true;
                    audio.play();                   

                    clearInterval(cronometroInterval);
                    exibeMensagem('Tempo esgotado.', criaBotaoDescanso());

                }
            }
        }

        

        horasMinutosSegundos[0].value = horas.toString().padStart(2, '0');
        horasMinutosSegundos[1].value = minutos.toString().padStart(2, '0');
        horasMinutosSegundos[2].value = segundos.toString().padStart(2, '0');

    }, tempoTimer);

    paraContagem(cronometroInterval);

}
function exibeMensagem(mensagem, botaoParaAdicionar) {

    divMensagem.style.display = 'block';
    mensagemAExibir.innerHTML = mensagem;

    fecharMensagem.addEventListener(`click`, () => {
        divMensagem.style.display = 'none';

        audio.loop = false;

        botoes.forEach(elemento => {

            switch (elemento.dataset.botao) {
                case `soma`: elemento.style.display = 'block';
                    break;
                case `subtrai`: elemento.style.display = 'block';
                    break;
            }

        });

        doisPontos.forEach(elemento => {
            elemento.style.display = 'none';
        });

    })

    if (botaoParaAdicionar) {
        if (elementoBaixoCaixaMsg.children.length == 0) {

            elementoBaixoCaixaMsg.innerHTML = botaoParaAdicionar[0];

        } else {

            if (elementoBaixoCaixaMsg.children[0].className == 'botaoDescanso') {

                elementoBaixoCaixaMsg.innerHTML = botaoParaAdicionar[1];

            } else {

                elementoBaixoCaixaMsg.innerHTML = botaoParaAdicionar[0];
            }
        }
    }

}
exemplos.forEach(elemento => {
    elemento.addEventListener('click', () => {

        switch (elemento.innerText) {
            case '25/5': contadores[1].value = 25;
                concentracao = 25;
                descanco = 5;
                pegaHoraInicio();
                break;
            case '50/10': contadores[1].value = 50;
                concentracao = 50;
                descanco = 10;
                pegaHoraInicio();
                break;
        }

    });

})
function paraContagem(cronometroInterval) {
    var botaoStop = botoes[8];
    var botaoPause = botoes[7];
    var mensagem = 'Você parou a contagem!';

    botaoPause.addEventListener('click', () => {
        contadores.forEach(() => {
            clearInterval(cronometroInterval);
        })

        elementoBaixoCaixaMsg.innerHTML = '';

        loFi.volume = volumeAlterado;

        return exibeMensagem(mensagem);

    })

    botaoStop.addEventListener('click', () => {
        contadores.forEach(elemento => {
            elemento.value = (0).toString().padStart(2, '0');
            clearInterval(cronometroInterval);
        })

        pegaHoraFimEstudo();
        elementoBaixoCaixaMsg.innerHTML = '';
        botoes[7].style.display = "block";
        descanco = '';
        concentracao = '';

        loFi.pause();

        rodape.style.display = "block";
        botaoVolume.style.display = "none";
        aumentaVolume.style.display = "none";

        return calculaTempoDeEstudo(terminoEstudo, inicioEstudo);

    })

}
function criaBotaoDescanso() {
    const botaoIniciarDescanso = `<button class="botaoDescanso" onclick="iniciaDescanso()">Iniciar Descanso</button>`
    const botaoReiniciaConcentracao = `<button class="botaoConcentracao" onclick="iniciaConcentracao()">Iniciar Concentracao</button>`
    const botoesCicloPomodoro = [botaoIniciarDescanso, botaoReiniciaConcentracao];
    return botoesCicloPomodoro;

}
function iniciaDescanso() {
    contadores[1].value = descanco.toString().padStart(2, '0');
    divMensagem.style.display = 'none';
    audio.loop = false;
    iniciaContagem(contadores);
    botoes[7].style.display = 'none';

    // console.log(volumeAlterado)

}
function iniciaConcentracao() {
    contadores[1].value = concentracao.toString().padStart(2, '0');
    divMensagem.style.display = 'none';
    audio.loop = false;
    iniciaContagem(contadores);

    // console.log(volumeAlterado)

}
botaoVolume.addEventListener('click', () => {

    switch(botaoVolume.innerText) {
        case 'volume_up': mutaAudio();
        break;
        case 'volume_off': desmutaAudio();
        break;
    }

})
aumentaVolume.addEventListener('input', () => {
    var valorVolume = (aumentaVolume.value) / 100;
    loFi.volume = valorVolume;
    volumeAlterado = valorVolume;

})

function mutaAudio() {
    loFi.volume = 0;
    aumentaVolume.value = 0;
    volumeAlterado = 0;
    botaoVolume.innerText = 'volume_off';
    botaoVolume.style.color = "red";
    aumentaVolume.style.display = "none";

}
function desmutaAudio () {
    if (loFi.volume == 0) {
        volumeAlterado = 0.1
    }

    loFi.volume = volumeAlterado;
    aumentaVolume.value = volumeAlterado * 100;
    aumentaVolume.style.display = "block";    
    botaoVolume.innerText = 'volume_up';
    botaoVolume.style.color = "#0CF25D";

}

//fazer calculo da distancia de onde foi clicado para o ponto inicial do alerta (superior esquerdo)

divMensagem.addEventListener("dragstart", evento => {
    
    console.log(`Este é o valor do X ${evento.clientX}`)
    console.log(`Este é o valor do Y ${evento.clientY}`)

    evento.target.style.opacity = 0.01
    evento.target.style.cursor = "pointer"

    console.log(evento.target.style.top)
})

divMensagem.addEventListener("dragend", evento => {  
    evento.target.style.opacity = 1
    evento.target.style.top = `${evento.pageY}px`;
    evento.target.style.left = `${evento.pageX}px`;

    console.log(evento.target.pageY)
})
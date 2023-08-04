var botoes = document.querySelectorAll(`[data-botao]`);
const contadores = document.querySelectorAll(`[data-contador]`);
var divMensagem = document.getElementById(`div_mensagem`);
var mensagemAExibir = document.getElementById(`mensagem`);
var fecharMensagem = document.getElementById(`fechar`);
var doisPontos = document.querySelectorAll(`.dois_pontos`);
var exemplos = document.querySelectorAll('[data-exemplos]');
const elementoBaixoCaixaMsg = document.querySelector('.local-botao');
var concentracao;
var descanco;
const loFi = new Audio('sound/lofi.mp3');
const audio = new Audio('sound/alarme.mp3');


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
    var numeros = div.querySelector('#numeros');

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
    loFi.volume = 1;

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

        paraContagem(cronometroInterval);

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
                    loFi.volume = 0.2;
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

    }, 1000);

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
                break;
            case '50/10': contadores[1].value = 50;
                concentracao = 50;
                descanco = 10;
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

        loFi.volume = 0.2;

        return exibeMensagem(mensagem);

    })

    botaoStop.addEventListener('click', () => {
        contadores.forEach(elemento => {
            elemento.value = (0).toString().padStart(2, '0');
            clearInterval(cronometroInterval);
        })

        elementoBaixoCaixaMsg.innerHTML = '';

        loFi.pause();

        return exibeMensagem(mensagem);

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

}

function iniciaConcentracao() {
    contadores[1].value = concentracao.toString().padStart(2, '0');
    divMensagem.style.display = 'none';
    audio.loop = false;
    iniciaContagem(contadores);

}
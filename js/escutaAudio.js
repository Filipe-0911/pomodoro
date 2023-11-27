const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const cronometro = document.getElementById('apresentacao');
const source = audioContext.createMediaElementSource(loFi);
const analyser = audioContext.createAnalyser();

source.connect(analyser);
analyser.connect(audioContext.destination);
analyser.fftSize = 256; 

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function analyze() {
    analyser.getByteFrequencyData(dataArray);
    var array  = dataArray.filter(numero => numero > 40 && numero < 80);
    array = array.reduce((soma, valor) => soma + valor, 0) / array.length;
    var limiarBumbo = 50;

    cronometro.style.transition = '0.5s'
    
    var alteracaoAoTocarBumbo = `${array}px solid rgba(0,0,0, 0.7)`;
    var alteracaoSemBumbo = '1px solid rgba(0,0,0, 0.7)'

    array > limiarBumbo && array < 60 ? cronometro.style.border = alteracaoAoTocarBumbo : cronometro.style.border = alteracaoSemBumbo;

    requestAnimationFrame(analyze);
}


// Criando uma instância do contexto de áudio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const cronometro = document.getElementById('apresentacao');
// Conectando o elemento de áudio ao contexto de áudio
const source = audioContext.createMediaElementSource(loFi);

// Criando um AnalyserNode
const analyser = audioContext.createAnalyser();

// Conectando o AnalyserNode entre o elemento de áudio e o destino do áudio
source.connect(analyser);
analyser.connect(audioContext.destination);

// Inicializando o AnalyserNode
analyser.fftSize = 256; // Definindo o tamanho da FFT (Fast Fourier Transform)

// Obtendo os dados de frequência
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Função para atualizar os dados de frequência e realizar a análise
function analyze() {
    analyser.getByteFrequencyData(dataArray);
    var array  = dataArray.filter(numero => numero > 40 && numero < 80);
    array = array.reduce((soma, valor) => soma + valor, 0) / array.length;
    var limiarBumbo = 50;

    cronometro.style.transition = '0.6s'
    
    var alteracaoAoTocarBumbo = `${array}px solid rgba(0,0,0, 0.7)`;
    var alteracaoSemBumbo = '1px solid rgba(0,0,0, 0.7)'

    array > limiarBumbo && array < 60 ? cronometro.style.border = alteracaoAoTocarBumbo : cronometro.style.border = alteracaoSemBumbo;

    requestAnimationFrame(analyze);
}


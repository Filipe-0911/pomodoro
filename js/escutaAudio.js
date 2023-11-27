let audioContext;
let cronometro;
let source;
let analyser;
let dataArray; 

let initialized = false;

function initializeAudio() {
  if (!initialized) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    cronometro = document.getElementById('apresentacao');
    source = audioContext.createMediaElementSource(loFi);
    analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    initialized = true;
    analyze();
  }
}

function analyze() {
  if (audioContext && audioContext.state === 'suspended') {
    
    document.addEventListener('click', () => {
      audioContext.resume().then(() => {
        console.log('Contexto de áudio retomado com sucesso.');
      });
    });
  }

  if (initialized) {
    
    analyser.getByteFrequencyData(dataArray);
    var array  = Array.from(dataArray).filter(numero => numero > 40 && numero < 80);
    array = array.reduce((soma, valor) => soma + valor, 0) / array.length;
    var limiarBumbo = 50;

    cronometro.style.transition = '0.5s';
    
    var alteracaoAoTocarBumbo = `${array}px solid rgba(0,0,0, 0.7)`;
    var alteracaoSemBumbo = '1px solid rgba(0,0,0, 0.7)';

    array > limiarBumbo && array < 60 ? cronometro.style.border = alteracaoAoTocarBumbo : cronometro.style.border = alteracaoSemBumbo;

    
    requestAnimationFrame(analyze);
  }
}
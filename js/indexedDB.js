function armazenarAudioNoIndexedDB(nomeChave, elementoAudio) {
    var request = indexedDB.open("MeuBancoDeDados", 3); // Incrementamos a versão do banco de dados

    request.onupgradeneeded = function (event) {
        var db = event.target.result;

        // Crie um object store chamado "arquivos"
        if (!db.objectStoreNames.contains("arquivos")) {
            db.createObjectStore("arquivos", { keyPath: "chave" });
            
        }
        
    };
    
    request.onsuccess = function (event) {
        console.log(elementoAudio)
        var db = event.target.result;
        var transaction = db.transaction(["arquivos"], "readwrite");
        var objectStore = transaction.objectStore("arquivos");

        // Converta o elemento Audio em Blob
        elementoAudio.oncanplaythrough = function () {
            
            var audioData = new Blob([new Uint8Array(elementoAudio.buffer)], { type: "audio/mp3" });
            // Armazene o Blob no IndexedDB com a chave especificada
            var request = objectStore.add({ chave: nomeChave, dados: audioData });
            
            request.onsuccess = function () {
                console.log("Arquivo de áudio armazenado com sucesso");
            };

            transaction.oncomplete = function () {
                db.close();
            };
        };
    };
}

function reproduzirAudioDoIndexedDB(nomeChave) {
    return new Promise((resolve, reject) => {
      var request = indexedDB.open("MeuBancoDeDados");
  
      request.onsuccess = function(event) {
        var db = event.target.result;
        var transaction = db.transaction(["arquivos"], "readonly");
        var objectStore = transaction.objectStore("arquivos");
        var getRequest = objectStore.get(nomeChave);
  
        getRequest.onsuccess = function(event) {
          var audioBlob = event.target.result;
  
          if (audioBlob) {
            // Crie uma URL temporária para o Blob
            var audioURL = URL.createObjectURL(audioBlob);
            console.log(audioURL)
  
            // Crie um elemento de áudio HTML
            var audioElement = new Audio(audioURL);
            audioElement.controls = true; // Adicione controles de reprodução (opcional)
  
            resolve(audioElement);
          } else {
            reject("Arquivo de áudio não encontrado.");
          }
        };
      };
    });
  }
  
// Função para recuperar um arquivo de áudio do IndexedDB

  
  // Uso da função
//   reproduzirAudioDoIndexedDB("lotrLoFi")
//     .then(audioElement => {
//       // Você pode manipular o elemento de áudio aqui, como reproduzi-lo ou acessar suas propriedades
//       loFi = audioElement
//     })
//     .catch(error => {
//       console.error(error);
//     });

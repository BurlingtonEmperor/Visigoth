function playAudio (audioSource) {
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//   fetch(audioSource)
//   .then(response => response.arrayBuffer())
//   .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
//   .then(audioBuffer => {
//     const source = audioContext.createBufferSource();

//     source.buffer = audioBuffer;
//     source.connect(audioContext.destination);
//     source.start();
//   })
//   .catch(error => console.error('Error loading or playing audio:', error));
  const audioSourceFinal = new Audio(audioSource);
  audioSourceFinal.play();
  return audioSourceFinal;
}

function playLoopedAudio (audioSource) {
  const audioSourceFinal = new Audio(audioSource);
  audioSourceFinal.loop = true;
  audioSourceFinal.play();

  return audioSourceFinal;
}

function playClonedAudio (audioSource) {
  const clonedAudioSource = new Audio(audioSource);
  clonedAudioSource.cloneNode(true).play();
}

function fadeOutAudio(audioElement, duration) {
  const initialVolume = audioElement.volume;
  const fadeInterval = 50; 
  const steps = duration / fadeInterval;
  const volumeDecrement = initialVolume / steps;

  const fadeEffect = setInterval(() => {
    if (audioElement.volume > volumeDecrement) {
      audioElement.volume -= volumeDecrement;
    } else {
      audioElement.volume = 0; 
      audioElement.pause(); 
      clearInterval(fadeEffect); 
    }
  }, fadeInterval);
}

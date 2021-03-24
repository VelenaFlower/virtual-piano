const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btnContainer = document.querySelector('.btn-container');
let isKeyDown = false;

// Full Screen
document.addEventListener('click', e => {
  if (!e.target.hasAttribute('data-fullscreen')) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}, false);

btnContainer.addEventListener('click', e => {
  for (let i = 0; i < btnContainer.children.length; i++) {
    btnContainer.children[i].classList.remove('btn-active');
  }
  e.target.classList.toggle('btn-active');

  if(btnContainer.children[1].classList.contains('btn-active')) {
    pianoKeys.forEach((item) => {
      item.classList.add('letter');
    });
   } else {
    pianoKeys.forEach((item) => {
      item.classList.remove('letter');
    });
  }
});

window.addEventListener('keydown', e => {
  if (!isKeyDown) {
    isKeyDown = true;
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (!audio) return;

    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    key.classList.add('piano-key-active');
    audio.currentTime = 0;
    audio.play();
  }
});

window.addEventListener('keyup', () => {
  isKeyDown = false;
  pianoKeys.forEach( el => {
    if (el.classList.contains('piano-key-active')) {
      el.classList.remove('piano-key-active');
    }
  });
});

function playAudio(e) {
  const audio = new Audio();
  const note = e.target.dataset.note;
  audio.src = `assets/audio/virtual-piano_assets_audio_${note}.mp3`;
  audio.currentTime = 0;
  audio.play();

  pianoKeys.forEach( el => {
    if(el.classList.contains('piano-key-active')) {
      el.classList.remove('piano-key-active', 'piano-key-active-pseudo');
    }
  });
  e.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
}

piano.addEventListener('mousedown', e => {
  playAudio(e);
  pianoKeys.forEach(el => {
    el.addEventListener('mouseover', playAudio);
  });
});

window.addEventListener('mouseup', e => {
  e.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');

  piano.addEventListener('mouseout', () => {
    pianoKeys.forEach( el => {
      if(el.classList.contains('piano-key-active')) {
        el.classList.remove('piano-key-active', 'piano-key-active-pseudo');
      }
    });
  });

  pianoKeys.forEach( el => {
    el.removeEventListener('mouseover', playAudio);
  });
});

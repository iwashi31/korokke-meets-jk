import TitleBackground from '../assets/image/titleBackground.png';
import IntroBackground from '../assets/image/introBackground.png';
import GameBackground from '../assets/image/gameBackground.png';
import ClearBackground1 from '../assets/image/clearBackground1.png';
import ClearBackground2 from '../assets/image/clearBackground2.png';
import ClearBackground3 from '../assets/image/clearBackground3.png';
import ClearBackground4 from '../assets/image/clearBackground4.png';
import GameOverBackground1 from '../assets/image/gameOverBackground1.png';
import GameOverBackground2 from '../assets/image/gameOverBackground2.png';
import GameOverBackground3 from '../assets/image/gameOverBackground3.png';
import GameOverBackground4 from '../assets/image/gameOverBackground4.png';
import StartButton from '../assets/image/startButton.png';
import OkButton from '../assets/image/okButton.png';
import NextButton from '../assets/image/nextButton.png';
import TitleButton from '../assets/image/titleButton.png';
import RetryButton from '../assets/image/retryButton.png';
import TwitterButton from '../assets/image/twitterButton.png';
import Korokke from '../assets/image/korokke.png';
import Chopstick from '../assets/image/chopstick.png';
import ChopstickWithKorokke from '../assets/image/chopstickWithKorokke.png';
import ChopstickWithRedKorokke from '../assets/image/chopstickWithRedKorokke.png';
import ChopstickJK from '../assets/image/chopstickJK.png';
import ChopstickJKWithKorokke from '../assets/image/chopstickJKWithKorokke.png';
import ChopstickJKWithRedKorokke from '../assets/image/chopstickJKWithRedKorokke.png';

import seJson from '../assets/audio/se.json';
import seSrc from '../assets/audio/se.mp3';

let toArrayBuffer = require('to-array-buffer');

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'LoadScene'
    });
  }

  preload(): void {
  }

  create(): void {
    this.textures.addBase64('titleBackground', TitleBackground);
    this.textures.addBase64('introBackground', IntroBackground);
    this.textures.addBase64('gameBackground', GameBackground);
    this.textures.addBase64('clearBackground1', ClearBackground1);
    this.textures.addBase64('clearBackground2', ClearBackground2);
    this.textures.addBase64('clearBackground3', ClearBackground3);
    this.textures.addBase64('clearBackground4', ClearBackground4);
    this.textures.addBase64('gameOverBackground1', GameOverBackground1);
    this.textures.addBase64('gameOverBackground2', GameOverBackground2);
    this.textures.addBase64('gameOverBackground3', GameOverBackground3);
    this.textures.addBase64('gameOverBackground4', GameOverBackground4);
    this.textures.addBase64('startButton', StartButton);
    this.textures.addBase64('okButton', OkButton);
    this.textures.addBase64('nextButton', NextButton);
    this.textures.addBase64('titleButton', TitleButton);
    this.textures.addBase64('retryButton', RetryButton);
    this.textures.addBase64('twitterButton', TwitterButton);
    this.textures.addBase64('korokke', Korokke);
    this.textures.addBase64('chopstick', Chopstick);
    this.textures.addBase64('chopstickWithKorokke', ChopstickWithKorokke);
    this.textures.addBase64('chopstickWithRedKorokke', ChopstickWithRedKorokke);
    this.textures.addBase64('chopstickJK', ChopstickJK);
    this.textures.addBase64('chopstickJKWithKorokke', ChopstickJKWithKorokke);
    this.textures.addBase64('chopstickJKWithRedKorokke', ChopstickJKWithRedKorokke);

    this.cache.json.add('se', seJson);

    let audioCtx = new window.AudioContext();
    audioCtx.decodeAudioData(toArrayBuffer(seSrc), (buffer) => {
      this.cache.audio.add('se', buffer);
      this.scene.start('TitleScene');
    }, (e) => { console.log("Error with decoding audio data" + e.message); });
  }
}

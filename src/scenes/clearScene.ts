import { gameOverCount } from "./gameScene";
import TwitterButton from '../assets/image/twitterButton.png';

export class ClearScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'ClearScene'
    });
  }

  create(data): void {
    const se = this.sound.addAudioSprite('se');
    const voiceSE = this.sound.addAudioSprite('se');
    voiceSE.play('agari');

    this.add.image(0, 0, 'clearBackground' + (data.level + 1)).setOrigin(0, 0);

    function pointerOverFunc(this: any) {
      se.play('cursor06');
      this.setTint(0xffcc99);
    }
    function pointerOutFunc(this: any) {
      this.clearTint();
    }

    if (data.level === 3) {
      const titleButtonShadow = this.add.image(145, 165, 'titleButton');
      const titleButton = this.add.image(140, 160, 'titleButton').setInteractive();
      const twitterButtonShadow = this.add.image(145, 245, 'twitterButton');

      let href: string = 'https://twitter.com/intent/tweet?text=';
      if (gameOverCount === 0) {
        href += '%E4%B8%80%E5%BA%A6%E3%82%82%E3%81%8A%E3%81%98%E3%81%95%E3%82%93%E3%81%AB%E9%A3%9F%E3%81%B9%E3%82%89%E3%82%8C%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AA%E3%81%8FJK%E3%81%AB%E9%A3%9F%E3%81%B9%E3%82%89%E3%82%8C%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AB%E6%88%90%E5%8A%9F%E3%81%97%E3%81%9F%EF%BC%81';
      } else {
        href += gameOverCount + '+%E4%BA%BA%E3%81%AE%E3%81%8A%E3%81%98%E3%81%95%E3%82%93%E3%81%AB%E9%A3%9F%E3%81%B9%E3%82%89%E3%82%8C%E3%81%9F%E3%81%8C%E3%80%81%E7%84%A1%E4%BA%8BJK%E3%81%AB%E9%A3%9F%E3%81%B9%E3%82%89%E3%82%8C%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AB%E6%88%90%E5%8A%9F%E3%81%97%E3%81%9F%EF%BC%81';
      }
      href += '+%23%E3%82%B3%E3%83%AD%E3%83%83%E3%82%B1%E3%81%A0%E3%81%A3%E3%81%A6JK%E3%81%AB%E9%A3%9F%E3%81%B9%E3%82%89%E3%82%8C%E3%81%9F%E3%81%84+https%3A%2F%2Fiwashibowl.net%2Fgame%2Fkorokke.html';

      const aTag = document.createElement('a');
      const imgTag = document.createElement('img');
      imgTag.src = TwitterButton;
      aTag.append(imgTag);
      aTag.href = href;
      aTag.target = '_blank';
      aTag.rel = 'noopener noreferrer';
      const twitterButton = this.add.dom(140, 240, aTag);

      titleButtonShadow.tint = 0x000000;
      titleButtonShadow.alpha = 0.5;
      twitterButtonShadow.tint = 0x000000;
      twitterButtonShadow.alpha = 0.5;

      titleButton.on('pointerdown', () => {
        se.play('kachi05');
        voiceSE.stop();
        this.scene.start('TitleScene');
      });
      titleButton.on('pointerover', pointerOverFunc);
      titleButton.on('pointerout', pointerOutFunc);
    } else {
      const nextButtonShadow = this.add.image(0, 0, 'nextButton');
      const nextButton = this.add.image(0, 0, 'nextButton').setInteractive();

      nextButtonShadow.tint = 0x000000;
      nextButtonShadow.alpha = 0.5;

      nextButton.on('pointerdown', () => {
        se.play('kachi05');
        voiceSE.stop();
        this.scene.start('GameScene', { level: data.level + 1 });
      });
      nextButton.on('pointerover', pointerOverFunc);
      nextButton.on('pointerout', pointerOutFunc);

      if (data.level === 0) {
        nextButton.x = 230;
        nextButton.y = 150;
      } else if (data.level === 1) {
        nextButton.x = 400;
        nextButton.y = 150;
      } else {
        nextButton.x = 450;
        nextButton.y = 150;
      }

      nextButtonShadow.x = nextButton.x + 5;
      nextButtonShadow.y = nextButton.y + 5;

      nextButton.setDepth(2);
      nextButtonShadow.setDepth(1);
    }
  }
}

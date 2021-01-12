import { gameOverCount } from "./gameScene";

export class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene'
    });
  }

  preload(): void {
  }

  create(this: any) {
    // @ts-ignore
    gameOverCount = 0;

    this.add.image(0, 0, 'titleBackground').setOrigin(0, 0);
    const startButtonShadow = this.add.image(445, 345, 'startButton');
    const startButton = this.add.image(440, 340, 'startButton').setInteractive();

    startButtonShadow.tint = 0x000000;
    startButtonShadow.alpha = 0.5;

    const se = this.sound.addAudioSprite('se');

    startButton.on('pointerdown', () => {
      se.play('kachi05');
      this.scene.start('IntroScene');
    });
    startButton.on('pointerover', function(this: any) {
      se.play('cursor06');
      this.setTint(0xffcc99);
    });
    startButton.on('pointerout', function(this: any) {
      this.clearTint();
    });
  }
}

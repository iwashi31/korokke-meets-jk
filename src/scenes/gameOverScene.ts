export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene'
    });
  }

  create(data): void {
    const se = this.sound.addAudioSprite('se');
    const voiceSE = this.sound.addAudioSprite('se');

    const retryButtonShadow = this.add.image(-100, -100, 'retryButton');
    const retryButton = this.add.image(-100, -100, 'retryButton').setInteractive();

    retryButtonShadow.tint = 0x000000;
    retryButtonShadow.alpha = 0.5;

    retryButton.on('pointerdown', () => {
      se.play('kachi05');
      voiceSE.stop();
      this.scene.start('GameScene', { level: data.level });
    });
    retryButton.on('pointerover', function(this: any) {
      if (!se.isPlaying) {
        se.play('cursor06');
      }
      this.setTint(0xffcc99);
    });
    retryButton.on('pointerout', function(this: any) {
      this.clearTint();
    });

    const rnd = Math.random() * 4;
    if (rnd < 1) {
      this.add.image(0, 0, 'gameOverBackground1').setOrigin(0, 0);
      voiceSE.play('oretosita')
      retryButton.x = 400;
      retryButton.y = 160;
    } else if (rnd < 2) {
      this.add.image(0, 0, 'gameOverBackground2').setOrigin(0, 0);
      voiceSE.play('munen');
      retryButton.x = 160;
      retryButton.y = 330;
    } else if (rnd < 3) {
      this.add.image(0, 0, 'gameOverBackground3').setOrigin(0, 0);
      voiceSE.play('douyara');
      retryButton.x = 120;
      retryButton.y = 130;
    } else {
      this.add.image(0, 0, 'gameOverBackground4').setOrigin(0, 0);
      voiceSE.play('yahari');
      retryButton.x = 400;
      retryButton.y = 160;
    }

    retryButtonShadow.x = retryButton.x + 5;
    retryButtonShadow.y = retryButton.y + 5;

    retryButton.setDepth(2);
    retryButtonShadow.setDepth(1);
  }
}

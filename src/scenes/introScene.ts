export class IntroScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'IntroScene'
    });
  }

  preload(): void {
  }

  create(this: any) {
    this.add.image(0, 0, 'introBackground').setOrigin(0, 0);
    const okButtonShadow = this.add.image(475, 355, 'okButton');
    const okButton = this.add.image(470, 350, 'okButton').setInteractive();

    okButtonShadow.tint = 0x000000;
    okButtonShadow.alpha = 0.5;

    const se = this.sound.addAudioSprite('se');

    okButton.on('pointerdown', () => {
      se.play('kachi05');
      this.scene.start('GameScene', { level: 0 });
    });
    okButton.on('pointerover', function(this: any) {
      se.play('cursor06');
      this.setTint(0xffcc99);
    });
    okButton.on('pointerout', function(this: any) {
      this.clearTint();
    });
  }
}

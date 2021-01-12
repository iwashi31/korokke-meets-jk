import { fps } from "../game";
import WebAudioSound = Phaser.Sound.WebAudioSound;

export let gameOverCount: number = 0;

class ChopStick {
  frame: number = 0;
  hasRedKorokke: boolean = false;
  x: number;
  y: number;
  rotation: number;
  approaching: boolean;
  rapid: boolean;
  isJK: boolean;
  image: Phaser.GameObjects.Image;

  constructor(x: number,
              y: number,
              rotation: number,
              approaching: boolean,
              rapid: boolean,
              isJK: boolean,
              image: Phaser.GameObjects.Image) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.approaching = approaching;
    this.rapid = rapid;
    this.isJK = isJK;
    this.image = image;

    if (rapid) {
      this.frame = fps;
    }
  }
}

export class GameScene extends Phaser.Scene {
  private frame: number = 0;
  private level: number = 0;
  private ojisanChopstickCount: number = 0;
  private jkMoving: boolean = false;
  private chopsticks: Array<ChopStick> = [];
  private dishHitArea: Phaser.Geom.Ellipse | null = null;
  private korokke: Phaser.GameObjects.Image | null = null;
  private se: Phaser.Sound.HTML5AudioSound | WebAudioSound | null = null;
  private voiceSE: Phaser.Sound.HTML5AudioSound | WebAudioSound | null = null;

  private popProb: Array<number> = [0.06, 0.06, 0.06, 0.14];
  private jkPopDelay: Array<number> = [3, 10, 20, 40];
  private maxChopstickNum: Array<number> = [2, 4, 10, 20];

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(data): void {
    this.level = data.level;
  }

  preload(): void {
    this.frame = 0;
    this.ojisanChopstickCount = 0;
    this.jkMoving = false;

    while (this.chopsticks.length) {
      this.chopsticks[0].image.destroy();
      this.chopsticks.shift();
    }
  }

  create(): void {
    this.se = this.sound.addAudioSprite('se');
    this.voiceSE = this.sound.addAudioSprite('se');

    this.voiceSE.play('ikuze');

    if (this.dishHitArea === null) {
      const graphics = this.add.graphics({lineStyle: {width: 0}});
      this.dishHitArea = new Phaser.Geom.Ellipse(275, 180, 400, 230);
      graphics.strokeEllipseShape(this.dishHitArea);
    }

    this.add.image(0, 0, 'gameBackground').setOrigin(0, 0);

    if (this.korokke === null) {
      this.korokke = this.add.image(275, 200, 'korokke');
      this.setKorokkePosition();
    }

    this.input.on('pointermove', this.setKorokkePosition.bind(this));
  }

  update(): void {
    const turningFrame = fps * 2;

    if (Math.random() < this.popProb[this.level]
        && this.chopsticks.length - (this.jkMoving ? 1 : 0) < this.maxChopstickNum[this.level]) {
      this.createChopstick(false);
    }

    if (!this.jkMoving && this.ojisanChopstickCount >= this.jkPopDelay[this.level] && Math.random() < 0.01) {
      this.createChopstick(true);
    }

    for (let chopstick of this.chopsticks) {
      if (chopstick.frame < turningFrame) {
        if (chopstick.approaching && this.korokke) {
          chopstick.x += (this.korokke.x - chopstick.x) / 30;
          chopstick.y += (this.korokke.y - chopstick.y) / 30;
        }
        if (chopstick.rapid) {
          chopstick.image.x = chopstick.x + (1 - (chopstick.frame - fps) / (turningFrame - fps)) * 475 * Math.cos(chopstick.rotation);
          chopstick.image.y = chopstick.y + (1 - (chopstick.frame - fps) / (turningFrame - fps)) * 475 * Math.sin(chopstick.rotation);
        } else {
          chopstick.image.x = chopstick.x + (1 - chopstick.frame / turningFrame) * 475 * Math.cos(chopstick.rotation);
          chopstick.image.y = chopstick.y + (1 - chopstick.frame / turningFrame) * 475 * Math.sin(chopstick.rotation);
        }
      } else if (chopstick.frame == turningFrame) {
        this.se?.play('pi11');

        chopstick.image.x = chopstick.x;
        chopstick.image.y = chopstick.y;
        chopstick.image.destroy();
        if (chopstick.isJK) {
          chopstick.image = this.add.image(chopstick.x, chopstick.y, 'chopstickJKWithKorokke').setOrigin(0.207, 0.5);
        } else {
          chopstick.image = this.add.image(chopstick.x, chopstick.y, 'chopstickWithKorokke').setOrigin(0.207, 0.5);
        }
        chopstick.image.rotation = chopstick.rotation;

        const graphics2 = this.add.graphics({ x: chopstick.x, y:chopstick.y, lineStyle: { width: 3 } });
        graphics2.rotation = -0.25;
        const hitArea = new Phaser.Geom.Ellipse(0, 0, 150, 95);
        graphics2.strokeEllipseShape(hitArea);

        // hit!
        if (this.korokke && hitArea.contains(this.korokke.x - chopstick.x, this.korokke.y - chopstick.y)) {
          this.korokke.destroy();
          this.korokke = null;
          this.input.off('pointermove');

          chopstick.image.destroy();
          if (chopstick.isJK) {
            this.voiceSE?.play('mikitta');
            chopstick.image = this.add.image(chopstick.x, chopstick.y, 'chopstickJKWithRedKorokke').setOrigin(0.207, 0.5);
          } else {
            gameOverCount++;
            if (Math.random() < 0.5) {
              this.voiceSE?.play('nani');
            } else {
              this.voiceSE?.play('bakana');
            }

            chopstick.image = this.add.image(chopstick.x, chopstick.y, 'chopstickWithRedKorokke').setOrigin(0.207, 0.5);
          }
          chopstick.image.rotation = chopstick.rotation;
          chopstick.hasRedKorokke = true;
        }

        graphics2.destroy();
      } else {
        chopstick.image.x = chopstick.x + ((chopstick.frame - turningFrame) / turningFrame) * 475 * Math.cos(chopstick.rotation);
        chopstick.image.y = chopstick.y + ((chopstick.frame - turningFrame) / turningFrame) * 475 * Math.sin(chopstick.rotation);
      }
      chopstick.frame++;
    }

    let isGameOver = false;
    let isClear = false;
    while (this.chopsticks.length > 0 && this.chopsticks[0].frame >= turningFrame * 2) {
      if (this.chopsticks[0].hasRedKorokke) {
        if (this.chopsticks[0].isJK) {
          isClear = true;
        } else {
          isGameOver = true;
        }
      }
      if (this.chopsticks[0].isJK) {
        this.jkMoving = false;
      }
      this.chopsticks[0].image.destroy();
      this.chopsticks.shift();
    }

    if (isGameOver) {
      this.scene.start('GameOverScene', { level: this.level } );
    } else if (isClear) {
      this.scene.start('ClearScene', { level: this.level } );
    }
  }

  createChopstick(isJK: boolean): void {
    let x = 0;
    let y = 0;
    do {
      x = Math.random() * 400 + 75;
      y = Math.random() * 230 + 65;
    } while (!this.dishHitArea?.contains(x, y));

    let angle = Math.random() * 270 - 225;
    if (angle < -180) {
      angle += 360;
    }
    const rotation = angle * Math.PI / 180;

    const approaching = !isJK && this.level >= 2 && this.ojisanChopstickCount % 13 == 8;
    const rapid = !isJK && this.level >= 1 && this.ojisanChopstickCount % 13 == 4;

    let image;
    if (isJK) {
      image = this.add.image(-100, -100, 'chopstickJK').setOrigin(0.207, 0.5);
    } else {
      image = this.add.image(-100, -100, 'chopstick').setOrigin(0.207, 0.5);
    }
    image.rotation = rotation;

    this.chopsticks.push(new ChopStick(x, y, rotation, approaching, rapid, isJK, image));

    if (isJK) {
      this.jkMoving = true;
    } else {
      this.ojisanChopstickCount++;
    }
  }

  setKorokkePosition(): void {
    if (this.dishHitArea === null || this.korokke === null) return;

    let inputX = this.input.x;
    let inputY = this.input.y;
    if (this.input.activePointer.event.type === 'touchmove') {
      inputY -= 100;
    }

    if (this.dishHitArea.contains(inputX, inputY)) {
      this.korokke.x = inputX;
      this.korokke.y = inputY;
    } else {
      // TODO: calculate intersection point more accurately
      const dx = inputX - 275;
      const dy = inputY - 180;
      const dist = Math.sqrt(dx * dx + dy * dy);
      this.korokke.x = 200 * dx / dist + 275;
      this.korokke.y = 117 * dy / dist + 180;
    }
  }
}

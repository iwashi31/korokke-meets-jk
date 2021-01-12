import 'phaser';
import { TitleScene } from "./scenes/titleScene";
import { IntroScene } from "./scenes/introScene";
import { GameScene } from "./scenes/gameScene";
import { LoadScene } from "./scenes/loadScene";
import { ClearScene } from "./scenes/clearScene";
import { GameOverScene } from "./scenes/gameOverScene";

export const fps: number = 24;

const config: Phaser.Types.Core.GameConfig = {
  title: 'korokke',
  version: '2.0.0',
  width: 550,
  height: 400,
  parent: 'game',
  type: Phaser.AUTO,
  backgroundColor: 0xF9F9FF,
  scene: [
    LoadScene,
    TitleScene,
    IntroScene,
    GameScene,
    ClearScene,
    GameOverScene,
  ],
  fps: { target: fps, forceSetTimeOut: true },
  dom: {
    createContainer: true
  },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
};

const game = new Game(config);

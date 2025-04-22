import Phaser from "phaser";

export default class Title extends Phaser.Scene {
    constructor() {
        super({key: "title"});
    }
    preload() {
        this.load.image("back", "/assets/img/testback.png");
        this.load.image("land", "/assets/img/testland.png");
        this.load.json("player_data", "/assets/img/json/player.json");
        this.load.once("filecomplete-json-player_data", () => {
            const data = this.cache.json.get('player_data');

            for (const name in data) {
                this.load.spritesheet(`player.${name}`, `/assets/img/player/armors/${name}.png`, {
                    frameWidth: data[name].frames.w,
                    frameHeight: data[name].frames.h
                });
            }
            this.load.start();
            this.load.once("complete", () => {
                for (const name in data) {
                    const anims = data[name].anims;
                    console.log(anims.attack.start, anims.attack.end)
                    this.anims.create({
                        key: `${name}.idle`,
                        frames: this.anims.generateFrameNumbers(`player.${name}`, { start: anims.idle.start, end: anims.idle.end }),
                        frameRate: 24,
                        repeat: -1
                    });
                    this.anims.create({
                        key: `${name}.run`,
                        frames: this.anims.generateFrameNumbers(`player.${name}`, { start: anims.run.start, end: anims.run.end }),
                        frameRate: 24,
                        repeat: -1
                    });
                    this.anims.create({
                        key: `${name}.attack`,
                        frames: this.anims.generateFrameNumbers(`player.${name}`, { start: anims.attack.start, end: anims.attack.end }),
                        frameRate: 24,
                        repeat: 0
                    });
                    this.anims.create({
                        key: `${name}.jump`,
                        frames: this.anims.generateFrameNumbers(`player.${name}`, { start: anims.jump.start, end: anims.jump.end }),
                        frameRate: 0,
                        repeat: 0
                    });
                    this.anims.create({
                        key: `${name}.falling`,
                        frames: this.anims.generateFrameNumbers(`player.${name}`, { start: anims.falling.start, end: anims.falling.end }),
                        frameRate: 20,
                        repeat: 0
                    });
                    this.anims.create({
                        key: `${name}.hurt`,
                        frames: this.anims.generateFrameNumbers(`player.${name}`, { start: anims.hurt.start, end: anims.hurt.end }),
                        frameRate: 0,
                        repeat: 0
                    });
                    this.anims.create({
                        key: `${name}.dash`,
                        frames: this.anims.generateFrameNumbers(`player.${name}`, { start: anims.dash.start, end: anims.dash.end }),
                        frameRate: 0,
                        repeat: 0
                    });
                }
            });
        });
    }
    create() {
        this.scene.start("test_main");
    }
    update() {}
}
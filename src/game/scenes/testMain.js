/* eslint-disable no-var */
import Phaser from "phaser";
import Player from "../single/object/player";

export default class TestMain extends Phaser.Scene {
    constructor() {
        super({key: "test_main"});
    }
    preload() {

    }
    create() {
        this.add.image(0, 0, "back").setOrigin(0);
        var land = this.physics.add.image(0, 980, "land").setOrigin(0);
        land.body.setAllowGravity(false);
        land.body.setImmovable(true);
        this.player = new Player(this, 50, 0);
        this.physics.add.collider(this.player.getPlayer(), land);
    }
    update() {
        this.player.update();
    }
}
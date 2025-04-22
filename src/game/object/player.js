export default class PlayerBase {
    constructor(scene, x, y) {
        this.scene = scene;
        this.armor = "first";
        this.playerData = this.scene.cache.json.get("player_data");
        this.player = this.scene.physics.add.sprite(x, y, `player.${this.armor}`);
        this.currentPlayerData = this.playerData[this.armor];
        this.player.body.setSize(this.currentPlayerData.hitbox.w, this.currentPlayerData.hitbox.h);
        this.player.body.setOffset(this.currentPlayerData.hitbox.x, this.currentPlayerData.hitbox.y);
        this.state = "idle";
        this.dashAvailable = true;
        this.player.anims.play(`${this.armor}.idle`, true);
        //현재 공격중인지 감지
        this.isAttacking = false;

        this.keys = {
            up: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            down: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            q: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            d: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
        this.methods = {
            moveLeft: () => {
                console.warn("This method is not overrided yet.");
            },
            moveRight: () => {
                console.warn("This method is not overrided yet.");
            },
            stopMoving: () => {
                console.warn("This method is not overrided yet.");
            },
            jump: () => {
                console.warn("This method is not overrided yet.");
            },
            dash: () => {
                console.warn("This method is not overrided yet.");
            },
            executeSkill: {
                attack: () => {
                    console.warn("This method is not overrided yet.");
                }
            },
        }
    }
    getPlayer() {
        return this.player;
    }
    update() {
        this.handleMovement();
        this.handleAnims();
    }
    handleAnims() {
        switch (this.state) {
            case "idle":
                if (this.player.anims.currentAnim.key !== `${this.armor}.idle`) {
                    this.player.anims.play(`${this.armor}.idle`, true);
                }
                break;
            case "run":
                if (this.player.anims.currentAnim.key !== `${this.armor}.run`) {
                    this.player.anims.play(`${this.armor}.run`, true);
                }
                break;
            case "jump":
                if (this.player.anims.currentAnim.key !== `${this.armor}.jump`) {
                    this.player.anims.play(`${this.armor}.jump`, true);
                }
                break;
            case "falling":
                if (this.player.anims.currentAnim.key !== `${this.armor}.falling`) {
                    this.player.anims.play(`${this.armor}.falling`, true);
                }
                break;
            case "dash":
                if (this.player.anims.currentAnim.key !== `${this.armor}.dash`) {
                    this.player.anims.play(`${this.armor}.dash`, true);
                }
                break;
        }
    }
    handleMovement() {
        if (!this.isAttacking && this.state !== "dash") {
            if (this.keys.left.isDown) {
                this.player.setFlipX(true);
                this.methods.moveLeft();
            } else if (this.keys.right.isDown) {
                this.player.setFlipX(false);
                this.methods.moveRight();
            } else {
                this.methods.stopMoving();
            }
            if (this.player.body.blocked.down) {
                if (this.keys.up.isDown) {
                    this.methods.jump();
                }
            } else {
                if (this.player.body.velocity.y > 0)
                    this.state = "falling";
            }
            if (this.keys.d.isDown && this.dashAvailable) {
                this.methods.dash();
            }
        } else {

        }
    }
}
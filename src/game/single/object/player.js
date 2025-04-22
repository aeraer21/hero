import Phaser from "phaser";
import PlayerBase from "../../object/player";
import { Skills } from "../utils/skillsRepository";
import SkillManager from "../function/skillManager";

export default class Player extends PlayerBase {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.playerData = this.scene.cache.json.get("player_data");
        this.skillManager = new SkillManager(this.scene, this.player, this.playerData, this);
        this.skillExecuter = new Skills[this.playerData[this.armor].id](this.player, this.scene, this.skillManager);
        this.methods.moveLeft = () => {
            if (this.player.body.blocked.down)
                this.state = "run";
            this.player.body.setVelocityX(-500);
        }
        this.methods.moveRight = () => {
            if (this.player.body.blocked.down)
                this.state = "run";
            this.player.body.setVelocityX(500);
        }
        this.methods.stopMoving = () => {
            if (this.player.body.blocked.down && !this.isAttacking)
                this.state = "idle";
            this.player.body.setVelocityX(0);
        }
        this.methods.jump = () => {
            this.state = "jump";
            this.player.body.setVelocityY(-700);
        }
        this.methods.dash = () => {
            this.state = "dash";
            this.player.body.setVelocityX(this.player.flipX ? -1300 : 1300);
            const body = this.player.body;

            this.scene.time.delayedCall(200, () => {
                this.scene.tweens.add({
                    targets: body.velocity,   // 💡 velocity 객체 자체를 tween
                    x: 0,                     // 최종 속도 (점점 느려져서 0으로)
                    duration: 200,           // 1초간 감속
                    ease: 'Sine.easeOut',     // 처음 빠르게 → 끝에 느리게
                    onComplete: () => {
                        this.state = "idle";
                        this.dashAvailable = false;
                    }
                });
                this.scene.time.delayedCall(2000, () => {
                    this.dashAvailable = true;
                });
            });
        }
    }
    useSkill() {
        if (this.keys.q.isDown) {
            //현재 공격중이 아니고 쿨타임 상태도 아닐때 공격 실행시키기
            if (!this.isAttacking && !this.skillManager.cooldowns.get(`${this.armor}.attack`) && this.state !== "dash") {
                this.state = "attack";
                this.setIsAttacking(true);
                this.skillManager.use(`${this.armor}.attack`, this.skillExecuter.attack.bind(this.skillExecuter), 0);
                this.player.anims.play(`${this.armor}.attack`, true, 0);
            }
        }
    }
    setIsAttacking(value) {
        this.isAttacking = value;
    }
    update() {
        this.useSkill();
        super.update();
    }
}
import { Skills } from "../../utils/skillsRepository";

export default class FirstSkills {
    constructor(player, scene, skillManager) {
        //attack start: 42, end: 53
        this.player = player;
        this.scene = scene;
        this.skillManager = skillManager;
    }
    attack() {
        let box;
        const offset = this.player.flipX ? -this.player.body.offset.x : this.player.body.offset.x;
        Skills.onSkillStart(this.skillManager, 'first.attack', () => {
            box = this.scene.add.rectangle(this.player.x + offset, this.player.y - 20, 100, 150);
            this.scene.physics.add.existing(box);
            box.body.setImmovable(true);
            box.body.setAllowGravity(false);
        });
        Skills.onSkillUpdate(this.skillManager, 'first.attack', {start: 0, end: 11}, (frame) => {
            box.body.reset(this.player.x + offset, this.player.y - 20);
            if (frame === 11) {
                box.destroy();
            }
        }, true);
    }
}
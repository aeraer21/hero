export default class SkillManager {
    constructor(scene, player, playerData, playerClass) {
        this.scene = scene;
        this.player = player;
        this.cooldowns = new Map();
        this.playerClass = playerClass;
        this.handler;
        this.startHandler;
        player.on(`animationstart`, (anim, frame) => {
            if (this.startHandler) {
                this.startHandler(anim, frame);
            }
        });
        player.on(`animationupdate`, (anim, frame) => {
            if (this.handler) {
                this.handler(anim, frame);
            }
        });
    }
    setHandler(handler) {
        this.handler = handler;
    }
    removeHandler() {
        delete this.handler;
    }
    setStartHandler(handler) {
        this.startHandler = handler;
    }
    removeStartHandler() {
        delete this.startHandler;
    }
    /**
     * 
     * @param {skillKey} key 
     * @param {skillFn} fn 
     * @param {cooldownTime} cooldownTime 
     */
    use(key, fn, cooldownTime) {
        if (this.cooldowns.has(key) || this.cooldowns.get(key)?.time > 0) return;
        this.cooldowns.set(key, {max: cooldownTime + 10, time: cooldownTime + 1, isAnimFinished: false});
        if (this.player.body.blocked.down)
            this.playerClass.methods.stopMoving();
        fn();
        this.player.once(`animationcomplete-${key}`, () => {
            this.cooldowns.get(key).isAnimFinished = true;
            this.playerClass.setIsAttacking(false);
            const cooldownInterval = this.scene.time.addEvent({
                delay: 100,
                loop: true,
                callback: () => {
                    if (this.cooldowns.get(key).time > 0) {
                        this.cooldowns.get(key).time--;
                    } else {
                        this.cooldowns.delete(key);
                        cooldownInterval.remove();
                    }
                }
            });
        });
    }
    getSkillValue(key) {
        return this.cooldowns.get(key);
    }
}
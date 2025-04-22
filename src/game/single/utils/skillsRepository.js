import FirstSkills from "../function/skills/first";


export const Skills = {
    /**
     * 
     * @param {spritesheet} player
     * @param {animationKey} animKey 
     * @param {frameRange} range 
     * @param {callbackFn} callback 
     */
    onSkillUpdate: (manager, animKey, range, callback, isLastAnim = false) => {
        const handler = (anim, frame) => {
            if (anim.key !== animKey) return;
        
            const index = frame.index;
            if (index >= range.start && index <= range.end) {
                callback(frame.index); // 현재 프레임 넘겨주기
            }
            if (isLastAnim && index === range.end) {
                manager.removeHandler();
            }
        };
        manager.setHandler(handler);
    },
    onSkillStart: (manager, animKey, callback) => {
        const handler = (anim, frame) => {
            if (anim.key !== animKey) return;
        
            callback();
            manager.removeStartHandler();
        };
        manager.setStartHandler(handler);
    },
    First: FirstSkills
}
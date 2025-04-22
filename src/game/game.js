import Phaser from "phaser";
import Title from "./scenes/title";
import TestMain from "./scenes/testMain";

const canvas = document.getElementById("game-screen");
canvas.width = 1920;
canvas.height = 1080;

const config = {
    type: Phaser.WEBGL,
    canvas: canvas,
    width: 1920,
    height: 1080,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 1000
            },
            debug: true
        }
    },
    scene: [Title, TestMain]
}
function resizeCanvas() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth / screenHeight > 16 / 9) {
        canvas.style.height = `${screenHeight}px`;
        canvas.style.width = `${screenHeight / 9 * 16}px`;
    } else {
        canvas.style.width = `${screenWidth}px`;
        canvas.style.height = `${screenWidth / 16 * 9}px`;
    }
}
resizeCanvas();
addEventListener("resize", resizeCanvas);
const game = new Phaser.Game(config);
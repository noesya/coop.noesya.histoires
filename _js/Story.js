import TWEEN from '@tweenjs/tween.js';
import SceneView from './SceneView/SceneView';
import ScreenManager from './Screens/ScreenManager';
import AudioManager from './Audio/AudioManager';

export default class Story{
    constructor(app) {
        this.app = app;
        this.audioManager = new AudioManager(this);
        this.view = new SceneView(this);
        this.screenManager = new ScreenManager(this);
        this.update();
        this.bind();
        this.state = {
            isPlaying: false
        }
    }
    bind() {
        document.querySelector('.js-start').addEventListener('click', () => {
            this.toggle();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key == ' ') {
                this.toggle();
            }
        })
    }
    next() {
        this.screenManager.next();
    }
    toggle() {
        this.state.isPlaying = !this.state.isPlaying;

        if (this.state.isPlaying) {
            this.audioManager.play();
        } else {
            this.audioManager.pause();
        }
    }
    update() {
        requestAnimationFrame(this.update.bind(this));
        this.audioManager.update();
        this.view.render();
        TWEEN.update();
    }
}
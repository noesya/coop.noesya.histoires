import TWEEN from '@tweenjs/tween.js';
import SceneView from './SceneView/SceneView';
import ScreenManager from './Screens/ScreenManager';
import AudioManager from './Audio/AudioManager';
import CaptionManager from './Captions/CaptionManager';

export default class Story{
    constructor(app) {
        this.app = app;
        this.sceneView = new SceneView(this);
        this.audioManager = new AudioManager(this);
        this.screenManager = new ScreenManager(this);
        this.captions = new CaptionManager(this);
        this.bind();
        this.state = {
            isPlaying: false
        }

        this.sceneView.load();
    }
    bind() {
        document.querySelector('.js-start').addEventListener('click', () => {
            this.start();
            this.next();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key == ' ') {
                // this.toggle();
            }
        })
    }
    next() {
        this.screenManager.next();
        this.sceneView.next();
        this.captions.next();
    }
    start() {
        if (this.state.isPlaying) return;
        this.state.isPlaying = true;
        this.audioManager.play();
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
        this.sceneView.render();
        this.audioManager.update();
        TWEEN.update();
    }
    onSceneLoaded() {
        this.update();
    }
}
import { Mesh, SphereBufferGeometry, MeshStandardMaterial } from 'three'
import SceneBase from './Scene/SceneBase';
import LoadManager from './Loader/LoadManager';
import ASSETS from './assets';
import PointsCloud from './Scene/PointsCloud';
import SETTINGS from './settings';
import Constellation from './Scene/Constellation';
import SolarSystem from './Scene/SolarSystem';
import { Tween, Easing } from '@tweenjs/tween.js';

export default class SceneView extends SceneBase {
    isReady = false;
    init () {
        super.init();

        // HELPERS
        if (SETTINGS.DEBUG) {
            this.setControls();
            // this.setHelpers();
        }
    }

    preload () {
        if (ASSETS.length > 0) {
            this.load();
        } else {
            this.setup();
        }
    }

    load () {
        const loaderTextDom = document.querySelector('.js-scene-loader-text'),
            progressDom = document.querySelector('.js-scene-loader-progress');

        LoadManager.onProgress.add((percent) => {
            loaderTextDom.innerText = `${percent * 100}%`;
            progressDom.style.width = `${percent * 100}%`;
        });

        LoadManager.onComplete.addOnce(() => {
            setTimeout(() => {
                this.setup();
            }, 200);
        });

        LoadManager.load(Object.values(ASSETS));

        this.story.onSceneLoaded();
    }

    setup () {
        // Remove loader
        document.querySelector('.js-scene-loader').style.display = 'none';
        this.setEnvironmentBox(LoadManager.getFile(ASSETS.studio));
        this.points = new PointsCloud(this.scene);
        // this.constellation = new Constellation(this.scene);
        this.system = new SolarSystem(this);
        this.isReady = true;
    }

    next() {
        const tween = new Tween(this.system.position)
            .to({
                x: this.system.position.x - 5,
                y: this.system.position.y - 3
            }, 1000)
            .easing(Easing.Quadratic.Out)
            .start();
    }

    update () {
        if (!this.isReady) return null;

        this.points.animate();
        // this.constellation.animate();
        this.system.animate();
    }
}

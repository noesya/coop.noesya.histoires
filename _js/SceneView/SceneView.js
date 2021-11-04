import { Mesh, SphereBufferGeometry, MeshStandardMaterial } from 'three'
import SceneBase from './Scene/SceneBase';
import LoadManager from './Loader/LoadManager';
import PointsCloud from './Scene/PointsCloud';
import ASSETS from './assets';
import SETTINGS from './settings';

export default class SceneView extends SceneBase {
    isReady = false;
    init () {
        super.init();
        this.load();

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
    }

    setup () {
        // Remove loader
        document.querySelector('.js-scene-loader').style.display = 'none';
        this.setEnvironmentBox(LoadManager.getFile(ASSETS.studio));
        this.points = new PointsCloud(this.scene);
        this.isReady = true;
    }

    update () {
        if (!this.isReady) return null;

        this.points.animate();
    }
}

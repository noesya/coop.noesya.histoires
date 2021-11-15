import {
    BufferGeometry,
    Points,
    Float32BufferAttribute,
    PointsMaterial,
    Line,
    LineBasicMaterial,
    Vector3,
    Mesh, 
    MeshBasicMaterial,
    Group
} from 'three';

import LoadManager from '../Loader/LoadManager';
import ASSETS from '../assets';
export default class SolarSystem {
    constructor(view) {
        this.view = view;
        this.scene = view.scene;
        this.init();
        this.tick = 0;
    }

    init() {
        const points = 12;

        this.texture = LoadManager.getFile(ASSETS.star);

        this.coords = [];

        for (let i = 0; i < points; i += 1) {
            this.coords.push([
                5*i + Math.random(), 
                3*i + Math.random() * 5, 
                Math.random() * 2
            ]);
        }

        this.compute();
        this.create();
        this.wire();

    }
    create() {
        const vertices = [];

        this.coords.forEach(p => {
            vertices.push(p[0], p[1], p[2]);
        });

        this.geometry = new BufferGeometry();
        this.geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

        this.pointMaterial = new PointsMaterial({
            size: 2,
            sizeAttenuation: true,
            transparent: true,
            map: this.texture
        });

        this.particles = new Points( this.geometry, this.pointMaterial );
        // this.particles.position.x = -this.width / 2;
        // this.particles.position.y = this.height / 2;
        this.scene.add(this.particles);
    }
    compute() {
        let minX, maxX, minY, maxY;
        maxX = Math.max.apply(Math, this.coords.map(p => p[0]));
        minX = Math.min.apply(Math, this.coords.map(p => p[0]));
        maxY = Math.max.apply(Math, this.coords.map(p => p[1]));
        minY = Math.min.apply(Math, this.coords.map(p => p[1]));
        this.width = Math.abs(minX - maxX);
        this.height = Math.abs(minY - maxY);
    }
    wire() {
        this.lineMaterial = new LineBasicMaterial({
            opacity: 0.5,
            transparent: true
        });

        this.line = new Line( this.geometry, this.lineMaterial );

        this.particles.add(this.line);
        const positions = this.line.geometry.attributes.position.array;
    }
    getPoint(position) {
        return new Vector3(position[0], position[1], position[2])
    }
    animate() {
        this.tick += 1;
        const positions = this.geometry.attributes.position.array;
        for (let i = 0; i < this.coords.length; i += 1) {
            for(let d = 0; d < 2; d += 1) {
                positions[i * 3 + d] = d == 0 ?
                    this.coords[i][d] + Math.sin((this.tick + i * 100) * 0.01) * 0.2 :
                    this.coords[i][d] + Math.cos((this.tick - i * 100) * 0.01) * 0.1
            }
        }
        this.geometry.attributes.position.needsUpdate = true;

        this.particles.rotation.y = Math.sin((this.tick * 100) / 10000) * 0.001;

        // this.lineMaterial.opacity = this.view.story.audioManager.voiceLine.data[40] / 256 / 2 + 0.2;
        // this.pointMaterial.size = this.view.story.audioManager.voiceLine.data[40] / 256 + 2;
    }

    get position (){
        return this.particles.position;
    }
}
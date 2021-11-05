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
export default class Constellation {
    constructor(scene) {
        this.scene = scene;
        this.init();
        this.tick = 0;
    }

    init() {
        this.texture = LoadManager.getFile(ASSETS.star);

        this.coords = [
            [4.7, -0.4, 0],
            [2.4, -3, 0],
            [6.4, -3.5, 0],
            [6.3, -6.8, 0],
            [0.4, -7.5, 0],
            [4, -9.3, 0],
            [1.8, -12.2, 0]
        ];
        this.compute();
        this.create();
        this.wire();
    }
    create() {
        const vertices = [];
        let material;

        this.coords.forEach(p => {
            vertices.push(p[0], p[1], p[2]);
        });

        this.geometry = new BufferGeometry();
        this.geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

        material = new PointsMaterial({
            size: 2,
            sizeAttenuation: true,
            transparent: true,
            map: this.texture
        });

        this.particles = new Points( this.geometry, material );
        this.particles.position.x = -this.width / 2;
        this.particles.position.y = this.height / 2;
        this.scene.add(this.particles);
    }
    compute() {
        let minX, maxX, minY, maxY;
        maxX = Math.max.apply(Math, this.coords.map(p => p[0]));
        minX = Math.min.apply(Math, this.coords.map(p => p[0]));
        maxY = Math.max.apply(Math, this.coords.map(p => p[1]));
        minY = Math.min.apply(Math, this.coords.map(p => p[1]));
        console.log(minX, maxX, minY, maxY);
        this.width = Math.abs(minX - maxX);
        this.height = Math.abs(minY - maxY);
    }
    wire() {
        const material = new LineBasicMaterial({
            opacity: 0.5,
            transparent: true
        });
        const points = [];
        const order = [2, 0, 1, 2, 3, 5, 6, 4, 5, 4, 1];

        order.forEach(index => {
            points.push(this.getPoint(this.coords[index]));
        });

        const geometry = new BufferGeometry().setFromPoints(points);

        this.line = new Line( geometry, material );

        // const wireframe = new Mesh( this.geometry, new MeshBasicMaterial({
        //     color: 0xffaa00,
        //     wireframe: true
        // }));
        // this.particles.add( wireframe );

        this.particles.add(this.line);
        const positions = this.line.geometry.attributes.position.array;
        console.log(positions)
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

        this.updateLine();

        this.particles.rotation.y = Math.sin((this.tick * 100) / 10000) * 0.001 ;
    }
    updateLine() {
        const order = [2, 0, 1, 2, 3, 5, 6, 4, 5, 4, 1];
        const positions = this.line.geometry.attributes.position.array;

        order.forEach((coordIndex, i) => {
            for(let d = 0; d < 2; d += 1) {
                positions[i * 3 + d] = this.geometry.attributes.position.array[coordIndex * 3 + d]
            }
        });

        this.line.geometry.attributes.position.needsUpdate = true;
    }
}
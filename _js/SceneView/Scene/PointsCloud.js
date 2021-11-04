import {
    BufferGeometry,
    Points,
    Float32BufferAttribute,
    PointsMaterial,
    Group
} from 'three';

export default class PointsClouds {
    constructor(scene) {
        this.scene = scene;
        this.init();
        this.tick = 0;
    }

    init() {
        const cloudsLength = 50;
        this.group = new Group();
        this.scene.add( this.group );

        for(let i = 0; i < cloudsLength; i += 1) {
            this.addCloud();
        }

        console.log(this.group);
    }
    addCloud() {
        const geometry = new BufferGeometry();
        const vertices = [];
        const quantity = 10;
        const distance = 100;
        let material;

        for ( let i = 0; i < quantity; i ++ ) {
            const x = distance * Math.random() - distance/2;
            const y = distance * Math.random() - distance/2;
            const z = distance * Math.random() - distance/2;
            vertices.push( x, y, z );
        }

        geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );

        material = new PointsMaterial( { size: 0.4, sizeAttenuation: true, transparent: true } );
        // material.color.setHSL(Math.random(), Math.random(), Math.random());
        const particles = new Points( geometry, material );

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;

        this.group.add(particles);
    }
    animate() {
        this.tick += 1;

        this.group.children.forEach( (cloud, i) => {
            cloud.rotation.y += 0.0001 * (i % 5 + 1)
            cloud.material.opacity = Math.sin((this.tick + i * 100) / 100);
        });
    }
}
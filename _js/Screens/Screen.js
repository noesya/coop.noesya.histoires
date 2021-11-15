import {Tween, Easing} from '@tweenjs/tween.js';

export default class Screen {
    constructor (selector, opened = false) {
        if (typeof selector === 'string') {
            this.dom = document.querySelector(selector);
        } else {
            this.dom = selector;
        }
        this.isOpened = false;
        if (opened) {
            this.open(true);
        }

        this.init();
    }

    init () {
        // Override
    }

    open (immediate = false, delay = 0.5) {
        const style = {
            opacity: 0
        };
        if (this.isOpened) {
            return false;
        }

        this.isOpened = true;

        this.dom.classList.add('is-visible');

        const tween = new Tween(this.dom.style)
            .to({opacity: 1}, 500)
            .delay(1000)
            .easing(Easing.Quadratic.Out)
            .start()
    }

    close () {
        if (!this.isOpened) {
            return false;
        }

        this.isOpened = false;

        const tween = new Tween(this.dom.style)
            .to({opacity: 0}, 350)
            .onComplete(() => {
                this.dom.classList.remove('is-visible');
            })
            .easing(Easing.Quadratic.Out)
            .start()
    }
}


import Screen from './Screen';

export default class ScreenManager {
    constructor (story) {
        this.story = story;
        this.screens = {};

        document.querySelectorAll('.screen').forEach((element) => {
            this.screens[element.id] = new Screen(element);
        });
        this.list = Object.values(this.screens);
        this.index = 1;
        
        this.bindEvents();
        this.handleHash();
        this.introduce();
    }

    introduce () {
        if (this.hashedPage) {
            this.open(this.hashedPage, true, 0);
        } else {
            this.open(this.list[0], true, 0);
        }
    }

    bindEvents () {
        document.querySelectorAll('[data-open-screen]').forEach((btn) => {
            let screen = btn.getAttribute('data-open-screen');
            btn.addEventListener('click', this.open.bind(this, screen));
        });
    }

    open (name, immediate = false, delay = 0.5) {
        let screen = typeof name == 'string' ? this.screens[name] : name;

        for (let key in this.screens) {
            if (screen !== this.screens[key]) this.screens[key].close();
        }

        screen.open(immediate, delay);
        window.scrollTo(0, 0);
    }

    next() {
        this.index += 1;
        this.open(this.list[this.index], true, 0);
    }

    handleHash () {
        const hash = window.location.hash;
        if (hash) {
            this.hashedPage = hash.replace('#', '');
        }
    }
}

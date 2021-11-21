import Caption from "./Caption";

export default class CaptionManager{
    constructor(story) {
        this.story = story;
        this.index = -1;
        this.dom = document.querySelector('.js-captions');
        this.setup();
    }
    setup() {
        this.captions = [];
        this.dom.querySelectorAll('.js-caption').forEach( dom => {
            this.captions.push(new Caption(dom, this));
        });
    }
    next() {
        if (this.current) this.current.close();
        this.index += 1;
        this.current = this.captions[this.index];
        this.current.open();
        console.log(this.index);
    }
    go(index = 0) {

    }
}
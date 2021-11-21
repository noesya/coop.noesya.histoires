export default class Caption{
    constructor(dom, manager) {
        this.dom = dom;
        this.p = this.dom.querySelector('p');
        this.manager = manager;
        this.isOpened = false;
        this.setup();
    }
    setup() {
        const text = this.dom.innerText;
        let node;
        this.letters = [];
        this.dom.innerHTML = '';
        text.split('').forEach( l => {
            node = document.createElement('span');
            node.innerText = l;
            this.letters.push(node);
            this.dom.appendChild(node);
        });
    }
    open() {
        this.isOpened = true;
        this.dom.classList.add('is-active');
    }
    close() {
        this.isOpened = false;
        this.dom.classList.remove('is-active');
    }
}
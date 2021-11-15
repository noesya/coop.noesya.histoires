import {Howl, Howler} from 'howler';

export default class AudioLine {
    constructor(data, analyse = false, manager) {
        this.raw = data;
        this.audio = new Howl({src: data.src});
        this.steps = data.steps;
        this.manager = manager;

        if (this.steps) {
            this.setup();
        }
    }
    setup() {
        // this.stepEvent = new CustomEvent('step');
    }
    /*
    setup() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();

        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = 256;

        this.source = this.context.createMediaElementSource(this.audio);
        this.source.connect(this.analyser);
        this.source.connect(this.context.destination);

        this.data = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(this.data);
        this.steps = this.audio.getAttribute('data-steps');

        if (this.steps) {
            this.steps = this.steps.split(',');
            this.stepEvent = new CustomEvent('step');
        }
    } 
    */
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
    update() {
        // this.analyser.getByteFrequencyData(this.data);
        
        if (this.steps) {
            if (this.audio.currentTime > this.steps[0]) {
                // this.audio.dispatchEvent(this.stepEvent);
                this.steps.shift();
                this.manager.onVoiceLineStepped();
            }
        }
    }
}
import {Howl} from 'howler';

export default class AudioLine {
    constructor(data, analyse = false, manager) {
        this.raw = data;
        this.audio = new Howl({src: data.src});
        this.steps = data.steps;
        this.manager = manager;
        console.log(this.steps)
    }
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
    } 
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
    update() {
        if (this.steps) {
            if (this.audio.seek() > this.steps[0]) {
                // this.audio.dispatchEvent(this.stepEvent);
                this.steps.shift();
                this.manager.onVoiceLineStepped();
            }
        }
    }
}
export default class AudioLine {
    constructor(audio) {
        this.audio = audio;

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
    play() {
        const playPromise = this.audio.play();
        playPromise.then(function() {
            console.log('played !')
        }).catch(function(error) {
            console.log(error);
            // Automatic playback failed.
            // Show a UI element to let the user manually start playback.
        });
    }
    pause() {
        this.audio.pause();
    }
    update() {
        this.analyser.getByteFrequencyData(this.data);
        
        if (this.steps.length > 0) {
            if (this.audio.currentTime > this.steps[0]) {
                this.audio.dispatchEvent(this.stepEvent);
                this.steps.shift();
            }
        }
    }
}
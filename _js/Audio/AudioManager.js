import AudioLine from "./AudioLine";
import { Howler } from 'howler';

export default class AudioManager {
    constructor(story) {
        this.story = story;
        this.data = document.querySelector('.story').getAttribute('data-audio');
        this.data = JSON.parse(this.data);

        this.voiceLine = new AudioLine(this.data.voice, true, this);
        this.musicLine = new AudioLine(this.data.music, false, this);
        this.voiceLine.audio.volume(0.6);
        this.musicLine.audio.volume(0.2);

        // this.voiceLine.audio.addEventListener('step', () => {
        //     this.story.next();
        // });
        this.setup();
    }
    setup() {
        this.analyser = Howler.ctx.createAnalyser();
        Howler.masterGain.connect(this.analyser);
        this.analyser.connect(Howler.ctx.destination);
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
    }
    onVoiceLineStepped() {
        console.log('nnnn')
        this.story.next();
    }
    play() {
        this.voiceLine.play();
        this.musicLine.play();
    }
    pause() {
        this.voiceLine.pause();
    }
    update() {
        this.analyser.getByteFrequencyData(this.data);
        this.voiceLine.update();
        this.average();
    }
    average() {
        const sum = this.data.reduce((a, b) => a + b, 0);
        this.averageFrq = (sum / this.data.length) || 0;
        this.averageFrq /= 256;
    }
}
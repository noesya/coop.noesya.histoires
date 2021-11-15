import AudioLine from "./AudioLine";

export default class AudioManager {
    constructor(story) {
        this.story = story;
        this.data = document.querySelector('.story').getAttribute('data-audio');
        this.data = JSON.parse(this.data);

        this.voiceLine = new AudioLine(this.data.voice, true, this);
        this.musicLine = new AudioLine(this.data.music, false, this);
        // this.musicLine.audio.volume = 0.5;

        // this.voiceLine.audio.addEventListener('step', () => {
        //     this.story.next();
        // });
    }
    onVoiceLineStepped() {
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
        // this.voiceLine.update();
    }
}
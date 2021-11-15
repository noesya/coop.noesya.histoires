import AudioLine from "./AudioLine";

export default class AudioManager {
    constructor(story) {
        this.story = story;
        this.voiceLine = new AudioLine(document.querySelector('.js-voice'));
        this.musicLine = new AudioLine(document.querySelector('.js-music'));
        this.musicLine.audio.volume = 0.5;

        this.voiceLine.audio.addEventListener('step', () => {
            this.story.next();
        });
    }
    play() {
        this.voiceLine.play();
        this.musicLine.play();
    }
    pause() {
        this.voiceLine.pause();
        console.log(this.voiceLine.audio.currentTime);
    }
    update() {
        this.voiceLine.update();
    }
}
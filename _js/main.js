import { WEBGL } from './webgl'
import Story from './Story';

const main = {
  init() {
    this.setup();
  },
  setup() {
    if (WEBGL.isWebGLAvailable()) {
      this.story = new Story(this);
    } else {
      let warning = WEBGL.getWebGLErrorMessage()
      document.body.appendChild(warning)
    }
  }
};

main.init();



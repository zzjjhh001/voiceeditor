import './src/style/index.scss';
import TextCore from './src/textCore';
import Handles from './src/handle';
class VoiceEditor {
  public textCore: TextCore;
  public handle: Handles;
  constructor(options: any) {
    this.textCore = new TextCore(options);
    this.handle = new Handles(options);
  }
}
export default { TextCore, VoiceEditor };
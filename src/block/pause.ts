import Block from './block';
import { btnClassPrefix } from '../const';
class Pause extends Block {
  public className: string = 'pause';
  constructor(text: string) {
    super(text);
  }
  render() {
    const span = document.createElement('span');
    span.innerHTML = '停顿' + this.text;
    span.contentEditable = 'false';
    span.classList.add(`${btnClassPrefix}${this.className}`);
    return span;
  }
}
export default Pause;
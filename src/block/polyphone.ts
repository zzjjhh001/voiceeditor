import Block from './block';
import { btnClassPrefix } from './../const';
class Polyphone extends Block {
  constructor(text: string) {
    super(text);
  }
  render() {
    const span = document.createElement('span');
    span.innerHTML = this.text + '多音字';
    span.contentEditable = 'false';
    span.classList.add(btnClassPrefix + this.constructor.name.toLowerCase());
    return span;
  }
}
export default Polyphone;
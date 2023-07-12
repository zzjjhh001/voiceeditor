import Block from './block';
class NumberRead extends Block {
  constructor(text: string) {
    super(text);
  }
  render() {
    const span = document.createElement('span');
    span.innerHTML = this.text + '数字读法';
    span.contentEditable = 'false';
    return span;
  }
}
export default NumberRead;
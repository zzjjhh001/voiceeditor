import Block from './block';
class ChangeSpeedEnd extends Block {
  constructor(text: string) {
    super(text);
  }
  render() {
    const span = document.createElement('span');
    span.innerHTML = this.text + '变速end';
    span.contentEditable = 'false';
    return span;
  }
}
export default ChangeSpeedEnd;
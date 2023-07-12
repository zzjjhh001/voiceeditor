import Block from './block';
class ChangeSpeedStart extends Block {
  constructor(text: string) {
    super(text);
  }
  render() {
    const span = document.createElement('span');
    span.innerHTML = this.text + '变速start';
    span.contentEditable = 'false';
    return span;
  }
}
export default ChangeSpeedStart;
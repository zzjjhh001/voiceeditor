import Block from './block';
class PhraseLink extends Block {
  constructor(text: string) {
    super(text);
  }
  render() {
    const span = document.createElement('span');
    span.innerHTML = this.text + '停顿';
    span.contentEditable = 'false';
    return span;
  }
}
export default PhraseLink;
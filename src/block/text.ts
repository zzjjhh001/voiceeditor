import Block from './block';
class Text extends Block {
  constructor(text: string) {
    super(text);
  }
  render() {
    const text = document.createTextNode(this.text);
    return text;
  }
}
export default Text;
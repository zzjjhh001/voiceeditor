import EventBus from "./emitter";
import { type Delta } from '../type';
// 负责选区和光标的信息操作
class Select {
  public content: string;
  public startContainer: Node | null;
  public endContainer: Node | null;
  public startOffset: number;
  public endOffset: number;
  public sel: Selection | null;
  constructor(public dom: HTMLElement, public emitter: EventBus, public deltas: any) {
    this.content = '';
    this.startContainer = null;
    this.endContainer = null;
    this.startOffset = 0;
    this.endOffset = 0;
    this.sel = null;
    document.addEventListener('selectionchange', () => {
      // TODO: 拦截优化 确定选取的参数
      this.sel = window.getSelection();
      const { startContainer, startOffset, endContainer, endOffset } = this.sel!.getRangeAt(0);
      this.startContainer = startContainer;
      this.endContainer = endContainer;
      this.startOffset = startOffset;
      this.endOffset = endOffset;


      if( this.sel && dom.contains(this.sel.anchorNode as HTMLElement)) {
        this.content = this.sel.toString();
      } else {
        this.content = '';
      }
      console.log('content', this.content);
    })
  }
  getCurrentSelect() {
    return { content: this.content };
  }
  // 获取select类型，光标还是选区
  getType(): 'range' | 'cursor' {
    return this.startContainer === this.endContainer && this.startOffset === this.endOffset ? 'range' : 'cursor';
  }
  // 获取当前的光标在哪个delta的哪个位置
  getStartPosition(deltas: Delta[]) {
    console.log('start', deltas);
    const index = deltas.findIndex((item: any) => item.dom === this.startContainer);
    return { startDom: this.startContainer, start: this.startOffset, delta: deltas[index], index };
  }
  getEndPosition(deltas: Delta[]) {
    const index = deltas.findIndex((item: any) => item.dom === this.endContainer);
    return { startDom: this.endContainer, start: this.endOffset, delta: deltas[index], index };
  }
  // 开始结束是否在一个DOM中
  atOneDom() {
    return this.startContainer === this.endContainer;
  }
  // 是不是选中了同一个text内部的文本
  isSelectText(len: number = 1): boolean {
    return this.getType() === 'cursor' && this.startContainer === this.endContainer && this.startOffset + len === this.endOffset;
  }
}
export default Select;

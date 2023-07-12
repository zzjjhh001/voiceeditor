import Select from "./module/select";
import EventBus from "./module/emitter";
import { cloneDeep } from 'lodash';
import Pause from './block/pause';
import History from "./module/history";
import { type Delta, Deltas } from './type';
// 多音字，插入停顿，词组连读开始，词组连读结束，局部变速，数字读法。文本。
enum NodeTypes {
  Text= 3,

}
interface Config {
  deltas: Delta[];
}


interface Options {
  dom: HTMLElement;
  config: Config;
}
class TextCore {
  public newOptions: Options;
  public root: HTMLElement;
  public emitter: EventBus;
  public select: Select;
  public history: History;
  public deltas: Delta[];

  constructor(options: Options) {

    this.newOptions = this._handleOptions(options);
    const { dom } = this.newOptions;
    this.root = dom;
    this.deltas = this.newOptions.config.deltas;

    // 事件监听class
    this.emitter = new EventBus();
    // select相关class
    this.select = new Select(this.root, this.emitter, this.deltas);
    // 历史记录相关
    this.history = new History(this.deltas);

    // dom组装
    this.render();

    // 添加监听事件
    this.root.addEventListener('input', (e: Event) => {
      console.log('input', e);
      if ((e as InputEvent).inputType !== 'insertText') {
        return;
      }
      this.insertText((e as InputEvent).data!);
    });
    this.root.addEventListener('paste', (e) => {
      console.log('paste', e)
      let text = e.clipboardData!.getData('text/plain');
      text = text.replace(/>/g, '&gt;').replace(/</g, '&lt;');
      this.insertText(text);
    });
    this.root.addEventListener('keydown', (e) => {
      console.log('keydown', e);
      // TODO: select选中一段话，select是光标
      // 选中多段，选中半段
      console.log(222);
      if (this.select.getType() === 'range') {
        // 选区
        
      } else {
        // 光标

      }
    })
  }
  // 合并配置
  _handleOptions(options: Options): Options {
    return options;
  }
  // render 生成并更新root，需要先修改this.deltas。使用场景是直接抛掉之前的内容，重新生成
  render() {
    this.root.innerHTML = '';
    this.deltas.forEach((item: Delta) => {
      const delta = new Deltas[item.type](item.text);
      const dom = delta.render();
      item.dom = dom;
      this.root.appendChild(dom);
      console.log(dom, this.root);
    })
  }
  // 撤销事件
  revoke() {
    const len = this.history.getRedoList().length;
    if (len <= 1) {
      return;
    }
    const deltas = this.history.getRedoList()[len - 2];
    this.history.deleteLastItemRedoList();
    console.log(333, deltas, this.history.getRedoList());
    
    this.deltas = deltas;
    this.render();
  }
  // 重做
  undo() {
    const len = this.history.getUndoList().length;
    if (len <= 0) {
      return;
    }
    const deltas = this.history.getUndoList()[len - 1];
    this.history.deleteLastItemUndoList();
    this.deltas = deltas;
    this.render();
  }
  /**
   * 多音字的处理方法
   * @description
   * @param { index, text}
   * @returns {void}
   */
  polyphone(text: string) {
    // 选区拦截，必须只选了一个字。
    if (!this.select.isSelectText()) {
      return;
    }
    // 操作：修改delta;
    const { start, startDom, index, delta } = this.select.getStartPosition(this.deltas);
    const len = startDom!.nodeValue!.length;
    const { start: endStart } = this.select.getEndPosition(this.deltas);
    const newDeltas = cloneDeep(this.deltas);
    const newDelta = cloneDeep(delta);
    const polyphoneDelta: Delta = { text, type: 'polyphone', };
    
    if (start === 0) {
      // 在开头
      newDelta.text = newDelta.text.substring(1);
      newDeltas.splice(index, 1, polyphoneDelta, newDelta);
    }
    if (endStart === len) {
      console.log(222, newDelta, this.deltas);
      
      // 在结尾
      newDelta.text = newDelta.text.substring(0, newDelta.text.length - 1);
      newDeltas.splice(index, 1, newDelta, polyphoneDelta);
    }
    if (start !== 0 && endStart !== len) {
      // 在中间
      const newDelta2 = cloneDeep(delta);
      newDelta.text = newDelta.text.substring(0, start);
      newDelta2.text= newDelta2.text.substring(start + 1, newDelta2.text.length);
      newDeltas.splice(index, 1, newDelta, polyphoneDelta, newDelta2);
    }
    this.updateDelta(newDeltas);
  }
  // 不关心中间delta的变化过程，只注意最后delta变成了啥
  updateDelta(newDeltas: Delta[]) {
    this.history.setRedoListforItem(newDeltas);
    this.history.getUndoList().length && this.history.resetUndoList();
    this.deltas = newDeltas;
    this.render();
  }
  addPause() {
    const pause = new Pause('');
    pause.render();
  }
  insertText(text: string) {
    if (this.select.getType() === 'cursor') {
      // 是光标
      if (this.select.atOneDom()) {
        // 在文本节点内部
        (this.select.startContainer as CharacterData).insertData(this.select.startOffset, text);
      } else {
        // 前后哪个是Text节点，就把文本加在哪里，都不是的话，就新建文本节点
        if (this.select.startContainer?.nodeType === NodeTypes.Text) {
          // 前面是text
          (this.select.startContainer as CharacterData).appendData(text);
          return;
        }
        if (this.select.endContainer?.nodeType === NodeTypes.Text) {
          // 后面是text
          (this.select.endContainer as CharacterData).insertData(0, text);
          return;
        }
        if (this.select.startContainer?.nodeType === NodeTypes.Text && this.select.endContainer?.nodeType === NodeTypes.Text) {
          // 没有text
          const textNode = document.createTextNode(text);
          this.root.insertBefore(textNode, this.select.endContainer);
        }
      }
    } else {
      // 是选区
      // 删除效果，删除内容，插入新内容
      // 删除多项
    }
  }
  // 删除内容
  delete() {

  }
}

export default TextCore;

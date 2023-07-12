// TODO: 按钮相关的
class Handles {
  public config: any;
  public emitter: any;
  constructor(config: any) {
    this.config = this.mergeConfig(config);
    this.emitter = config.emitter;
  }
  mergeConfig(config: any) {
    return config;
  }
  addhandle(item: HTMLElement) {
    // 根据配置增加事件
    item.addEventListener('click', () => {
      this.emitter.emit(item.innerHTML);
    })
  }

  getbtnDom(item: string): HTMLElement {
    const div = document.createElement('div');
    div.innerHTML = item;
    this.addhandle(div);
    return div;
  }

  render() {
    const div = document.createElement('div');
    ['redo', 'undo'].forEach((item: string) => {
      div.appendChild(this.getbtnDom(item));
    });
    return div;
  }
}
export default Handles;

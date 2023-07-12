import { type Delta } from '../type';

// TODO: 撤销重做相关
class History {
  private redoDeltaList: Delta[][] = [];
  private undoDeltaList: Delta[][] = [];
  constructor(deltas: Delta[]) {
    this.setRedoListforItem(deltas);
  }
  // 获取撤销内容
  getRedoList() {
    return this.redoDeltaList;
  }
  // 设置撤销内容数组
  setRedoListforItem(deltas: Delta[]) {
    this.redoDeltaList.push(deltas);
  }
  deleteLastItemRedoList() {
    const deltas = this.redoDeltaList.pop();
    this.setUndoListForItem(deltas as Delta[]);
  }
  // 获取重做数组
  getUndoList() {
    return this.undoDeltaList;
  }
  // 设置重做数组
  setUndoListForItem(deltas: Delta[]) {
    this.undoDeltaList.push(deltas);
  }
  // 删除最后一项
  deleteLastItemUndoList() {
    const deltas = this.undoDeltaList.pop();
    this.setRedoListforItem(deltas as Delta[]);
  }
  // 重置undoList
  resetUndoList() {
    this.undoDeltaList = [];
  }
}

export default History;

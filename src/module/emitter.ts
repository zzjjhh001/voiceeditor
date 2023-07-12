interface IEventObject {
  [eventName: string]: Function[];
}

interface IEventBus {
  emit<T extends any[]>(eventName: string, ...args: T): void;
  on(eventName: string, callback: Function): void;
  clear(eventName: string): void;
}

class EventBus implements IEventBus {
  private _eventObject: IEventObject;
  constructor() {
    // 初始化事件列表
    this._eventObject = {};
  }
  // 发布事件
  emit<T extends any[]>(eventName: string, ...args: T): void {
    // 取出当前事件所有的回调函数
    const callbackObject = this._eventObject[eventName];
    // 执行每一个回调函数
    for (const func of callbackObject) {
      // 执行时传入参数
      func(...args);
    }
  }
  // 订阅事件
  on(eventName: string, callback: Function) {
    // 初始化这个事件
    if (!this._eventObject[eventName]) {
      // 使用对象存储，注销回调函数的时候提高删除的效率
      this._eventObject[eventName] = [];
    }

    // 存储订阅者的回调函数
    // callbackId使用后需要自增，供下一个回调函数使用
    this._eventObject[eventName].push(callback);
  }

  // 清除事件
  clear(eventName: string): void {
    // 未提供事件名称，默认清除所有事件
    if (!eventName) {
      this._eventObject = {};
      return;
    }

    // 清除指定事件
    delete this._eventObject[eventName];
  }
}

export default EventBus;

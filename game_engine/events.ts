class GameEvent {
  static events: {
    [key: string]: { id: any; callback: (...args: any[]) => any }[];
  } = {};

  static emit(event: string) {
    if (!this.events[event]) return;

    this.events[event].forEach((obj) => obj.callback());
  }

  static subscribe(event: string, callback: (...args: any[]) => any, id: any) {
    this.events[event] = this.events[event]
      ? [...this.events[event], { id, callback: () => callback() }]
      : [{ id, callback: () => callback() }];
  }

  static unsubscribe(id: any) {
    for (let event in this.events) {
      this.events[event] = this.events[event].filter((obj) => obj.id !== id);
    }
  }
}

export default GameEvent;

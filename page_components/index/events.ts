class GameEvent {
  static events: { [key: string]: ((...args: any[]) => any)[] } = {};

  static emit(event: string) {
    if (!this.events[event]) return;

    this.events[event].forEach((callback) => callback());
  }

  static subscribe(
    event: string,
    callback: (...args: any[]) => any,
    ...args: any[]
  ) {
    this.events[event] = this.events[event]
      ? [...this.events[event], () => callback(...args)]
      : [() => callback(...args)];
  }
}

export default GameEvent;

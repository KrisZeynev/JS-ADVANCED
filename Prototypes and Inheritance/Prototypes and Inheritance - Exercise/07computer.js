function computerHierarchy() {
  class Keyboard {
    constructor(manufacturer, responseTime) {
      this.manufacturer = manufacturer;
      this.responseTime = Number(responseTime);
    }
  }
  class Monitor {
    constructor(manufacturer, width, height) {
      this.manufacturer = manufacturer;
      this.width = Number(width);
      this.height = Number(height);
    }
  }
  class Battery {
    constructor(manufacturer, expectedLife) {
      this.manufacturer = manufacturer;
      this.expectedLife = Number(expectedLife);
    }
  }
  class Computer {
    constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
      if (new.target === Computer) {
        throw new Error();
      }
      this.manufacturer = manufacturer;
      this.processorSpeed = Number(processorSpeed);
      this.ram = Number(ram);
      this.hardDiskSpace = Number(hardDiskSpace);
    }
  }
  class Laptop extends Computer {
    constructor(
      manufacturer,
      processorSpeed,
      ram,
      hardDiskSpace,
      weight,
      color,
      battery
    ) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace);
      this.weight = Number(weight);
      this.color = color;
      this.battery = battery;
    }
    //getter for battery
    get battery() {
      return this._battery;
    }
    //setter for battery
    set battery(arg) {
      if (arg instanceof Battery) {
        this._battery = arg;
      } else {
        throw new TypeError();
      }
    }
  }
  class Desktop extends Computer {
    constructor(
      manufacturer,
      processorSpeed,
      ram,
      hardDiskSpace,
      keyboard,
      monitor
    ) {
      super(manufacturer, processorSpeed, ram, hardDiskSpace);
      this.keyboard = keyboard;
      this.monitor = monitor;
    }

    //getter for keyboard
    get keyboard() {
      return this._keyboard;
    }

    //setter for keyboard
    set keyboard(arg) {
      if (arg instanceof Keyboard) {
        this._keyboard = arg;
      } else {
        throw new TypeError();
      }
    }

    //getter for monitor
    get monitor() {
      return this._monitor;
    }

    //setter for monitor
    set monitor(arg) {
      if (arg instanceof Monitor) {
        this._monitor = arg;
      } else {
        throw new TypeError();
      }
    }
  }
  return { Keyboard, Monitor, Battery, Computer, Laptop, Desktop };
}

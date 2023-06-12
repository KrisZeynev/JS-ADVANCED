// function classHierarchy() {
//   class Figure {
//     constructor(units = 'cm') {
//       this.units = units;
//     }

//     get area() {
//       return null;
//     }

//     changeUnits(units) {
//       this.units = units;
//     }
//     toString() {
//       return `Figures units: ${this.units}`;
//     }
//   }
//   class Circle extends Figure {
//     constructor(radius) {
//       super();
//       this.radius = Number(radius);
//     }

//     get area() {
//       return Math.PI * Math.pow(this.radius, 2);
//     }
//     toString() {
//       return `Figures units: ${this.units} Area: ${this.area} - radius: ${this.radius}`;
//     }
//   }
//   class Rectangle extends Figure {
//     constructor(width, height, units) {
//       super(units);
//       this.width = Number(width);
//       this.height = Number(height);
//     }
//     get area() {
//       return this.width * this.height;
//     }
//     toString() {
//       return `Figures units: ${this.units} Area: ${this.area} - width: ${this.width}, height: ${this.height}`;
//     }
//   }
//   return {
//     Figure,
//     Circle,
//     Rectangle,
//   };
// }
// let { Figure, Circle, Rectangle } = classHierarchy();
// let c = new Circle(5);
// console.log(c.area); // 78.53981633974483
// console.log(c.toString()); // Figures units: cm Area: 78.53981633974483 - radius: 5

// let r = new Rectangle(3, 4, 'mm');
// console.log(r.area); // 1200
// console.log(r.toString()); // Figures units: mm Area: 1200 - width: 3, height: 4

// r.changeUnits('cm');
// console.log(r.area); // 12
// console.log(r.toString()); // Figures units: cm Area: 12 - width: 3, height: 4

// c.changeUnits('mm');
// console.log(c.area); // 7853.981633974483
// console.log(c.toString()); // Figures units: mm Area: 7853.981633974483 - radius: 50
function solve() {
  class Figure {
    constructor() {
      this.units = 'cm';
      this.unitsDict = {
        cm: 1,
        mm: 10,
        m: 0.01,
      };
      this.unitsValue = this.unitsDict[this.units];
    }
    get area() {}
    changeUnits(v) {
      if (!['cm', 'mm', 'm'].includes(v)) {
        return;
      }
      this.unitsValue = this.unitsDict[v];
      this.units = v;
    }
    toString() {
      return `Figures units: ${this.units}`;
    }
  }
  class Circle extends Figure {
    constructor(r) {
      super();
      this.radius = r;
    }
    get area() {
      this.unitsValue = this.unitsDict[this.units];
      return (
        Math.PI * Math.pow(this.radius, 2) * this.unitsValue * this.unitsValue
      );
    }
    toString() {
      return `${super.toString()} Area: ${this.area} - radius: ${
        this.radius * this.unitsValue
      }`;
    }
  }

  class Rectangle extends Figure {
    constructor(w, h, u) {
      super();
      this.width = w;
      this.height = h;
      this.units = u;
    }
    get area() {
      this.unitsValue = this.unitsDict[this.units];
      return this.width * this.height * this.unitsValue * this.unitsValue;
    }
    toString() {
      this.unitsValue = this.unitsDict[this.units];
      return `${super.toString()} Area: ${this.area} - width: ${
        this.width * this.unitsValue
      }, height: ${this.height * this.unitsValue}`;
    }
  }
  return {
    Figure,
    Circle,
    Rectangle,
  };
}

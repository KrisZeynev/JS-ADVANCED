(function arrayExtension() {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
  Array.prototype.skip = function (n) {
    const newArr = this.slice(n);
    return newArr;
  };
  Array.prototype.take = function (n) {
    const newArr = this.slice(0, n);
    return newArr;
  };
  Array.prototype.sum = function () {
    const res = this.reduce((a, c) => a + c, 0);
    return res;
  };
  Array.prototype.average = function () {
    const res = this.reduce((a, c) => a + c, 0);
    return res / this.length;
  };
})();
const arr = [1, 2, 3, 4, 5];
const lastEl = arr.last();
console.log(`${lastEl} => Posleden`);

const skippedColection = arr.skip(2);
console.log(skippedColection);

const takeCollection = arr.take(2);
console.log(takeCollection);

const summed = arr.sum();
console.log(summed);

const avg = arr.average();
console.log(avg);

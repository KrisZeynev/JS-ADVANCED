(function stringExtension() {
  String.prototype.ensureStart = function (str) {
    if (!this.startsWith(str)) {
      return `${str}${this}`;
    }
    return `${this}`;
  };
  String.prototype.ensureEnd = function (str) {
    if (!this.endsWith(str)) {
      return `${this}${str}`;
    }
    return `${this}`;
  };
  String.prototype.isEmpty = function () {
    return this.toString().length === 0;
  };
  String.prototype.truncate = function (n) {
    if (n <= 3) {
      return '.'.repeat(n);
    }
    if (this.length <= n) {
      return `${this}`;
    }
    const ELLIPSIS = '...';
    const strValue = this.toString();

    const truncValue = strValue.substr(0, n - 2);
    const lastIndex = truncValue.lastIndexOf(' ');

    if (lastIndex !== -1) {
      return `${strValue.substr(0, lastIndex)}${ELLIPSIS}`;
    }

    return `${strValue.substr(0, n - 3)}${ELLIPSIS}`;
  };
  String.format = function (str, ...params) {
    for (let i = 0; i < params.length; i++) {
      let index = str.indexOf(`{${i}}`);
      while (index !== -1) {
        str = str.replace(`{${i}}`, params[i]);
        index = str.indexOf(`{${i}}`);
      }
    }
    return str;
  };
})();
let str = 'my string';
console.log(str);
str = str.ensureStart('my');
console.log(str);
str = str.ensureStart('hello ');
console.log(str);
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);

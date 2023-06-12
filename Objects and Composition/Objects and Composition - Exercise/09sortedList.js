function createSortedList() {
  let obj = {
    arr: [],
    size: 0,

    add: function (el) {
      this.arr.push(el);
      this.size += 1;
    },
    remove: function (el) {
      if (this.arr.indexOf(el)) {
        this.arr = this.arr.splice(el, 1);
      }
      this.size -= 1;
    },
    get: function get(el) {
      return this.arr[el];
    },
  };
  return obj;
}
let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
// list.remove(1);
// console.log(list.get(1));

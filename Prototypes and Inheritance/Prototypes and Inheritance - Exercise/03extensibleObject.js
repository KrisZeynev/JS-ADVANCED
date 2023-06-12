function extensibleObject() {
  const obj = {
    extend: function (template) {
      for (const prop of Object.keys(template)) {
        const templateElement = template[prop];

        if (typeof templateElement === 'function') {
          Object.getPrototypeOf(obj)[prop] = templateElement;
        } else {
          obj[prop] = templateElement;
        }
      }
    },
  };

  return obj;
}
const myObj = extensibleObject();

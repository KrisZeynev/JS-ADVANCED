function personAndTeacher() {
  class Person {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  }
  class Teacher extends Person {
    constructor(name, email, subject) {
      super(name, email);
      this.subject = subject;
    }
  }
  return {
    Person,
    Teacher,
  };
}
let classes = personAndTeacher();
let Teacher = classes.Teacher;
let Person = classes.Person;

let p = new Person('Pesho', 'pesho@pesho.com');
console.log(p.name);
// expect(p.name).to.equal('Pesho');
// expect(p.email).to.equal('pesho@pesho.com');

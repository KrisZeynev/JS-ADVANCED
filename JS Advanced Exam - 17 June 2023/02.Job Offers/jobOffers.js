class JobOffers {
  constructor(employer, position) {
    this.employer = employer;
    this.position = position;
    this.jobCandidates = [];
  }
  jobApplication(candidates) {
    const result = [];
    candidates.forEach((el) => {
      let [name, education, yearExperience] = el.split('-');
      const candidat = {
        name,
        education,
        yearExperience,
      };
      const currentEl = this.jobCandidates.find((el) => el.name === name);
      if (currentEl) {
        if (currentEl.yearExperience < yearExperience) {
          currentEl.yearExperience = yearExperience;
        }
      } else {
        result.push(name);
        this.jobCandidates.push(candidat);
      }
    });

    return `You successfully added candidates: ${result.join(', ')}.`;
  }
  jobOffer(chosenPerson) {
    let [name, minimalExperience] = chosenPerson.split('-');
    minimalExperience = Number(minimalExperience);
    const currentEl = this.jobCandidates.find((el) => el.name === name);
    if (!currentEl) {
      throw new Error(`${name} is not in the candidates list!`);
    }
    if (minimalExperience > currentEl.yearExperience) {
      throw new Error(
        `${name} does not have enough experience as ${this.position}, minimum requirement is ${minimalExperience} years.`
      );
    }
    currentEl.yearExperience = 'hired';
    return `Welcome aboard, our newest employee is ${name}.`;
  }
  salaryBonus(name) {
    const currentEl = this.jobCandidates.find((el) => el.name === name);
    if (!currentEl) {
      throw new Error(`${name} is not in the candidates list!`);
    }

    if (currentEl.education === 'Bachelor') {
      return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $50,000 per year!`;
    }
    if (currentEl.education === 'Master') {
      return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $60,000 per year!`;
    }

    return `${name} will sign a contract for ${this.employer}, as ${this.position} with a salary of $40,000 per year!`;
  }
  candidatesDatabase() {
    if (this.jobCandidates.length === 0) {
      throw new Error('Candidate Database is empty!');
    }

    const output = [];
    this.jobCandidates
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((el) => {
        output.push(`${el.name}-${el.yearExperience}`);
      });

    return `Candidates list:\n${output.join('\n')}`;
  }
}
let Jobs = new JobOffers('Google', 'Strategy Analyst');
console.log(
  Jobs.jobApplication([
    'John Doe-Bachelor-10',
    'Peter Parker-Master-5',
    'Jordan Cole-High School-5',
    'Daniel Jones- Bachelor-18',
  ])
);
console.log(Jobs.jobOffer('John Doe-8'));
console.log(Jobs.jobOffer('Peter Parker-4'));
console.log(Jobs.jobOffer('Jordan Cole-4'));
console.log(Jobs.salaryBonus('Jordan Cole'));
console.log(Jobs.salaryBonus('John Doe'));
console.log(Jobs.candidatesDatabase());

class SmartHike {
  constructor(username) {
    this.username = username;
    this.goals = {};
    this.listOfHikes = [];
    this.resources = 100;
  }

  addGoal(peak, altitude) {
    if (this.goals.hasOwnProperty(peak)) {
      return `${peak} has already been added to your goals`;
    } else {
      this.goals[peak] = altitude;
      return `You have successfully added a new goal - ${peak}`;
    }
  }
  hike(peak, time, difficultyLevel) {
    if (this.resources === 0) {
      return "You don't have enough resources to start the hike";
    }
    if (!this.goals.hasOwnProperty(peak)) {
      throw new Error(`${peak} is not in your current goals`);
    }
    // if (this.goals.hasOwnProperty(peak) && this.resources > 0) {
    //   throw new Error("You don't have enough resources to start the hike");
    // }
    const usedResources = time * 10;
    const difference = this.resources - usedResources;
    if (difference < 0) {
      return "You don't have enough resources to complete the hike";
    }
    this.resources -= usedResources;
    this.listOfHikes.push({ peak, time, difficultyLevel });
    return `You hiked ${peak} peak for ${time} hours and you have ${this.resources}% resources left`;
  }
  rest(time) {
    this.resources += time * 10;
    if (this.resources > 100) {
      this.resources = 100;
      return `Your resources are fully recharged. Time for hiking!`;
    }
    return `You have rested for ${time} hours and gained ${
      time * 10
    }% resources`;
  }
  showRecord(criteria) {
    if (this.listOfHikes.length === 0) {
      return `${this.username} has not done any hiking yet`;
    }
    if (criteria === 'hard' || criteria === 'easy') {
      const hikes = this.listOfHikes.filter(
        (hike) => hike.difficultyLevel === criteria
      );
      const sortedHikes = hikes.sort((a, b) => a.time - b.time);
      const best = sortedHikes[0];
      if (best === undefined) {
        return `${this.username} has not done any ${criteria} hiking yet`;
      }
      return `${this.username}'s best ${criteria} hike is ${best.peak} peak, for ${best.time} hours`;
    }

    if (criteria === 'all') {
      const res = ['All hiking records:'];
      this.listOfHikes.forEach((x) => {
        res.push(`${this.username} hiked ${x.peak} for ${x.time} hours`);
      });
      return res.join('\n');
    }
  }
}
const user = new SmartHike('Vili');
user.addGoal('Musala', 2925);
user.hike('Musala', 8, 'hard');
console.log(user.showRecord('easy'));
user.addGoal('Vihren', 2914);
user.hike('Vihren', 4, 'hard');
console.log(user.showRecord('hard'));
user.addGoal('Rui', 1706);
user.hike('Rui', 3, 'easy');
console.log(user.showRecord('all'));

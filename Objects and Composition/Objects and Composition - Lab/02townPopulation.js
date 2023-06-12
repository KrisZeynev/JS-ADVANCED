function townPopulation(arr) {
  const townMap = new Map();
  for (const el of arr) {
    let [townName, townPopulation] = el.split(' <-> ');
    townPopulation = Number(townPopulation);
    if (townMap.has(townName)) {
      let current = Number(townMap.get(townName));
      townMap.set(townName, townPopulation + current);
    } else {
      townMap.set(townName, townPopulation);
    }
  }
  for (const [name, population] of townMap) {
    console.log(`${name} : ${population}`);
  }
}
// townPopulation([
//   'Sofia <-> 1200000',
//   'Montana <-> 20000',
//   'New York <-> 10000000',
//   'Washington <-> 2345000',
//   'Las Vegas <-> 1000000',
// ]);
townPopulation([
  'Istanbul <-> 100000',
  'Honk Kong <-> 2100004',
  'Jerusalem <-> 2352344',
  'Mexico City <-> 23401925',
  'Istanbul <-> 1000',
]);

function heroicInventory(input) {
  const result = [];

  input.forEach((str) => {
    const obj = {};
    const heroDataArr = str.split(' / ');
    obj.name = heroDataArr[0];
    obj.level = Number(heroDataArr[1]);

    const items = heroDataArr[2];
    obj.items = items ? items.split(', ') : [];

    result.push(obj);
  });

  return JSON.stringify(result);
}
console.log(
  heroicInventory([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara',
  ])
);

function storeCatalogue(arr) {
  let resMap = new Map();
  arr.sort((a, b) => a.localeCompare(b));
  for (const line of arr) {
    let [name, price] = line.split(' : ');
    let firstChar = name[0].toUpperCase();
    if (!resMap.has(firstChar)) {
      resMap.set(firstChar, []);
    }
    resMap.get(firstChar).push({ name, price });
  }
  for (const [firstChar, products] of resMap) {
    console.log(firstChar);

    for (const product of products) {
      console.log(`  ${product.name}: ${product.price}`);
    }
  }
}
storeCatalogue([
  'Appricot : 20.4',
  'Fridge : 1500',
  'TV : 1499',
  'Deodorant : 10',
  'Boiler : 300',
  'Apple : 1.25',
  'Anti-Bug Spray : 15',
  'T-Shirt : 10',
]);

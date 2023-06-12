function townsToJson(arr) {
  const resArr = [];
  let [town, latitude, longitude] = arr.shift().split(' |');
  town = town.slice(2);
  latitude = latitude.trim();
  longitude = longitude.trim();

  for (const line of arr) {
    let [Town, Latitude, Longitude] = line.split(' |');
    Town = Town.slice(2);
    Latitude = Number(Latitude.trim()).toFixed(2);
    Longitude = Number(Longitude.trim()).toFixed(2);

    const townObject = {};
    townObject[town] = Town;
    townObject[latitude] = Number(Latitude);
    townObject[longitude] = Number(Longitude);
    resArr.push(townObject);
  }
  return JSON.stringify(resArr);
}
console.log(
  townsToJson([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |',
  ])
);
// Town = Town.slice(2).trim();
//     Longitude = Longitude.slice(0, Longitude.length - 2).trim();
//     Latitude = Number(Latitude);
//     Longitude = Number(Longitude);
//     townObject[Town] = Town;
//     townObject[Latitude] = Number(Latitude).toFixed(2);
//     townObject[Longitude] = Number(Longitude).toFixed(2);
//     resArr.push(townObject);

function carFactory(car) {
  let newCar = {};
  newCar['model'] = car.model;

  if (car.power <= 90) {
    newCar['engine'] = { power: 90, volume: 1800 };
  } else if (car.power > 90 && car.power <= 120) {
    newCar['engine'] = { power: 120, volume: 2400 };
  } else if (car.power > 130) {
    newCar['engine'] = { power: 200, volume: 3500 };
  }

  if (car.carriage === 'hatchback') {
    newCar['carriage'] = { type: 'hatchback', color: car.color };
  } else if (car.carriage === 'coupe') {
    newCar['carriage'] = { type: 'coupe', color: car.color };
    delete car.color;
  }

  if (Number(car.wheelsize) % 2 === 0) {
    const size = car.wheelsize - 1;
    newCar['wheels'] = [size, size, size, size];
  } else {
    const size = car.wheelsize;
    newCar['wheels'] = [size, size, size, size];
  }

  return newCar;
}
carFactory({
  model: 'VW Golf II',
  power: 90,
  color: 'blue',
  carriage: 'hatchback',
  wheelsize: 14,
});
// console.log(
//   carFactory({
//     model: 'VW Golf II',
//     power: 90,
//     color: 'blue',
//     carriage: 'hatchback',
//     wheelsize: 14,
//   })
// );
// console.log('--------');
// console.log(
//   carFactory({
//     model: 'Opel Vectra',
//     power: 110,
//     color: 'grey',
//     carriage: 'coupe',
//     wheelsize: 17,
//   })
// );

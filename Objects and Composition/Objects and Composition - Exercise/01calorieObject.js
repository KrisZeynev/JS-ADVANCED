function calorieObject(arr) {
  let newObj = {};

  for (let i = 0; i < arr.length; i += 2) {
    newObj[arr[i]] = Number(arr[i + 1]);
  }
  return newObj;
}
calorieObject(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);
console.log(calorieObject(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']));

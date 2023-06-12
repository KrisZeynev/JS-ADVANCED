function createAssemblyLine() {
  let objs = {
    hasClima: function (obj) {
      obj.temp = 21;
      obj.tempSettings = 21;
      obj.adjustTemp = function () {
        if (this.temp < this.tempSettings) {
          this.temp += 1;
        } else if (this.temp > this.tempSettings) {
          this.temp -= 1;
        }
      };
    },
    hasAudio: function (obj) {
      obj.currentTrack = null;
      obj.nowPlaying = function () {
        if (this.currentTrack !== null) {
          console.log(
            `Now playing '${this.currentTrack.name}' by ${this.currentTrack.artist}`
          );
        }
      };
    },
    hasParktronic: function (obj) {
      obj.checkDistance = function (distance) {
        if (distance < 0.1) {
          console.log('Beep! Beep! Beep!');
        } else if (distance >= 0.1 && distance < 0.25) {
          console.log('Beep! Beep!');
        } else if (distance >= 0.25 && distance < 0.5) {
          console.log('Beep!');
        } else {
          console.log('');
        }
      };
    },
  };
  return objs;
}
const assemblyLine = createAssemblyLine();
const myCar = {
  make: 'Toyota',
  model: 'Avensis',
};
console.log(myCar);

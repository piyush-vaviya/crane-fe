let date, timeType, hour, minutes, seconds;

date = new Date();

hour = date.getHours();

if (hour <= 11) {
  timeType = "AM";
} else {
  timeType = "PM";
}

if (hour > 12) {
  hour = hour - 12;
}

if (hour === 0) {
  hour = 12;
}

minutes = date.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes.toString();
}

seconds = date.getSeconds();

if (seconds < 10) {
  seconds = "0" + seconds.toString();
}

const getFullTime = (type = "hh:mm:ss, tt") => {
  return type
    .replace("hh", hour)
    .replace("mm", minutes)
    .replace("ss", seconds)
    .replace("tt", timeType);
};
// const date1 = new Date();

// const diff = date1.getTime() - date2.getTime();

// let msec = diff;
// const hh = Math.floor(msec / 1000 / 60 / 60);
// msec -= hh * 1000 * 60 * 60;
// const mm = Math.floor(msec / 1000 / 60);
// msec -= mm * 1000 * 60;
// const ss = Math.floor(msec / 1000);
// msec -= ss * 1000;

// console.log(hh, mm, ss);
export default getFullTime;

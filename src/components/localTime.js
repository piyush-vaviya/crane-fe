let date, timeType, hour, minutes, seconds, fullTime;

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

export default getFullTime;

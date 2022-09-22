let date, TimeType, hour, minutes, seconds, fullTime;

date = new Date();

hour = date.getHours();

if (hour <= 11) {
  TimeType = "AM";
} else {
  TimeType = "PM";
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

fullTime =
  hour.toString() + ":" + minutes.toString() + ":" + TimeType.toString();

export default fullTime;

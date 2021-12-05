export function getTimeFormat(dateTime) {
    return (new Date(dateTime).getHours() < 10 ? '0' : '') + new Date(dateTime).getHours() + ':' +
        (new Date(dateTime).getMinutes() < 10 ? '0' : '') + new Date(dateTime).getMinutes() + ':' +
        (new Date(dateTime).getSeconds() < 10 ? '0' : '') + new Date(dateTime).getSeconds();
}

export function addTime(dateTime, minutes) {
  return  new Date(new Date(dateTime).setTime(new Date(dateTime).getTime() + minutes * 60 * 1000));
}
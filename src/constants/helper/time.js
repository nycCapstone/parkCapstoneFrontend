//Sets checkOut state
export function checkOutLoad(date = new Date()) {
  let tempCheck = new Date(date);
  tempCheck.setHours(date.getHours() + 3);
  return tempCheck;
}
//Set checkIn state
export function roundToNearest30(date = new Date()) {
  const minutes = 30;
  const ms = 1000 * 60 * minutes;

  //replace Math.round with Math.ceil to always round UP
  return new Date(Math.ceil(date.getTime() / ms) * ms);
}
//Return boolean
export function filterPassedTime(time, checkInDate) {
  const currentDate = new Date();
  const selectedDate = new Date(time);
  return currentDate.getTime() < selectedDate.getTime();
}
//Return boolean
export function filterPassedTimeCheckOut(time, checkInDate) {
  const currentDate = checkInDate;
  const selectedDate = new Date(time);
  let tempCheck = new Date(currentDate);
  tempCheck.setHours(tempCheck.getHours() + 3);

  if (
    tempCheck.getHours() == selectedDate.getHours() &&
    selectedDate.getDate() === tempCheck.getDate()
  ) {
    return !(selectedDate.getMinutes() < currentDate.getMinutes());
  } else if (
    selectedDate.getDate() === currentDate.getDate() + 1 &&
    (currentDate.getHours() + 3) % 24 >= 0 &&
    (currentDate.getHours() + 3) % 24 <= 3
  ) {
    return !(selectedDate.getHours() < tempCheck.getHours());
  } else
    return (
      selectedDate.getHours() >= currentDate.getHours() + 3 ||
      !(currentDate.getDate() === selectedDate.getDate())
    );
}

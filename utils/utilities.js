exports.getCurrentTime = () => {
  const options = {
    timeZone: 'Asia/Bangkok',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  };
  const currentTime = new Date().toLocaleTimeString('en-US', options);
  return currentTime;
};  

exports.addHoursToTime = (time, hoursToAdd) => {
  const [originalHours, originalMinutes] = time.split(':').map(Number);

  // Add the specified number of hours
  const newHours = originalHours + hoursToAdd;

  // Ensure newHours is within the valid range (0-23)
  const normalizedHours = (newHours + 24) % 24;

  // Format the result
  const result = `${String(normalizedHours).padStart(2, '0')}:${String(
    originalMinutes
  ).padStart(2, '0')}`;

  return result;
};

exports.calculateTotalHours = (timeStart, timeEnd) => {
    console.log(timeStart, timeEnd);
    const [startHours, startMinutes] = timeStart.split(":").map(Number);
    const [endHours, endMinutes] = timeEnd.split(":").map(Number);

    // Calculate the difference in hours and minutes
    const totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);

    // Convert totalMinutes to total hours as a decimal
    const totalHours = totalMinutes / 60;

    return totalHours;
}
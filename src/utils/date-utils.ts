// This function is taken from ChatGPT
/**
 * Formats a given Date object into a human-readable string.
 * - If the input date is today, returns the time in the format "h:mm am/pm".
 * - If the input date was yesterday, returns 'yesterday'.
 * - If the input date was within the last week, returns the number of days ago.
 * - If the input date was within the current year, returns the month and day.
 * - If the input date was before the current year, returns the year.
 *
 * @param {Date} inputDate - The Date object to format.
 * @returns {string} A string representing the formatted date.
 */
export function formatDate(inputDate: Date): string {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const inputDayStart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

  if (inputDayStart.getTime() === todayStart.getTime()) {
    // Format as time without seconds if the input date is today
    return inputDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }).toLowerCase();
  } else if (inputDayStart.getTime() === yesterdayStart.getTime()) {
    return "yesterday";
  } else {
    const daysDiff = (todayStart.getTime() - inputDayStart.getTime()) / (1000 * 3600 * 24);
    if (daysDiff < 7) {
      return `${Math.round(daysDiff)} days ago`;
    } else if (now.getFullYear() === inputDate.getFullYear()) {
      return inputDate.toLocaleDateString([], { month: "long", day: "numeric" });
    } else {
      return inputDate.toLocaleDateString([], { year: "numeric" });
    }
  }
}

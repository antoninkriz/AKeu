/**
 * Try to parse a date from a given object
 * @param {any} d Supposedly a date in some form
 * @return {Date} Definitely a date
 */
const getDate = (d) => {
  if (!d)
    throw Error(`Not a date - ${d}`);

  if (!d.constructor)
    throw Error(`Not an object - ${d}`);

  switch (d.constructor.name) {
    case "Date":
      return d;
    case "String" :
    case "Number":
      return new Date(d);
    default:
      throw Error(`Invalid object - ${d}`);
  }
};

/**
 * Format a date in the YYYY/MM format
 * @param date Date to be formatted
 * @return {string} Date in the YYYY/MM format
 */
export const dateToYearMonths = (date) => `${getDate(date).getFullYear()}/${getDate(date).getMonth()}`;

/**
 * Format a date in the YYYY format
 * @param date Date to be formatted
 * @return {string} Date in the YYYY format
 */
export const dateToYear = (date) => `${getDate(date).getFullYear()}`;

/**
 * Format a date difference as "X years and Y months"
 * @param d1 First date
 * @param d2 Second date
 * @return {string} Formatted date difference
 */
export const dateToHumanDuration = (d1, d2) => {
  d1 = getDate(d1);
  d2 = d2 ? getDate(d2) : null;

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const AVG_DAYS_PER_MONTH = 7 * 31 + 5 * 30 + 28.25;

  const diffMilliseconds = Math.abs(d1 - d2);
  const diffDays = diffMilliseconds / MS_PER_DAY;
  const diffMonths = diffDays / AVG_DAYS_PER_MONTH;

  const diff = {
    years: Math.floor(diffMonths / 12),
    months: Math.floor(diffMonths % 12),
  };

  const yearsText = diff.years > 1 ? 'years' : 'year';
  const monthsText = diff.years > 1 ? 'months' : 'month';

  if (!diff.months)
    return `${diff.years} ${yearsText}`;
  return `${diff.years} ${yearsText} and ${diff.months} ${monthsText}`;
}

/**
 * Converts seconds to the mm:ss format
 * @param {number} num Number of seconds
 * @return {string} Time in the mm:ss format
 */
export const secondsToMinutesSeconds = (num) => {
  let minutes = Math.floor(num / 60);
  let seconds = Math.round(num % 60);

  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }

  if (seconds < 10)
    seconds = ("" + seconds).padStart(2, "0");

  return minutes + ":" + seconds;
};

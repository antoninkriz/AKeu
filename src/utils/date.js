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

export const dateToYearMonths = (date) => `${getDate(date).getFullYear()}/${getDate(date).getMonth()}`;

export const dateToYear = (date) => `${getDate(date).getFullYear()}`;

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

  return `${diff.years} ${yearsText} and ${diff.months} ${monthsText}`;
}

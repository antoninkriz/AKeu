export const dateToYearMonths = (date) => `${date.getFullYear()}/${date.getMonth()}`

export const dateToHumanDuration = (d1, d2) => {
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

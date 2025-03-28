export function formatDate(date: Date) {
  if (!date) return '';
  if (typeof date === 'string') date = new Date(date);
  let month = '' + (date.getMonth() + 1);
  let year = date.getFullYear();

  if (month.length < 2)
    month = '0' + month;

  return [month, year].join('-');
}
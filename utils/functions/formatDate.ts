export function formatDatetime(isoDateString: string): string {
  const date = new Date(isoDateString);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();

  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export function formatCustomDatetimeToISO(customDatetime: string): string {
  const [datePart, timePart] = customDatetime.split(', ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  return date.toISOString();
}

export function isValidCustomDatetimeFormat(customDatetime: string): boolean {
  const regex = /^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}$/; // Matches "DD/MM/YYYY, HH:mm"
  return regex.test(customDatetime);
}

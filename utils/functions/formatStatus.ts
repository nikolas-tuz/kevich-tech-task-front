/* YUP. Damnable regex. This operation might be costly. I do use it just for the sake of beauty. Please do not beat me the reviewer 😁 */
export function formatStatus(status: string) {
  return status.replaceAll(`-`, ` `).replace(/\b\w/g, char => char.toUpperCase());
}
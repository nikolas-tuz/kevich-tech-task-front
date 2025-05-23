export function trimText(text: string, ifLength: number) {
  return text.length > ifLength ? text.slice(0, ifLength) + `..` : text;
}
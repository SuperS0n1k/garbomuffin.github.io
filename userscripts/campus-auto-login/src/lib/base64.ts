export function base64encode(string: string) {
  return btoa(string);
}

export function base64decode(string: string) {
  return atob(string);
}

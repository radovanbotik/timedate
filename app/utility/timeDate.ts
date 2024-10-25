export function generateTime() {
  return new Date();
}

export function toLocalTime(date: Date, locale?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions) {
  return date.toLocaleTimeString(locale, options);
}

export function toLocalDate(date: Date, locale?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString(locale, options);
}

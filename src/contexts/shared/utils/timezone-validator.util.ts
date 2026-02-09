export function isValidTimeZone(timezone: string): boolean {
  if (!timezone) {
    return false;
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

export function normalizeTimeZone(timezone: string | undefined): string {
  if (!timezone) {
    return 'UTC';
  }

  const trimmed = timezone.trim();

  if (isValidTimeZone(trimmed)) {
    return trimmed;
  }

  return 'UTC';
}

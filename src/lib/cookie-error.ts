import { inferBackendErrorCode } from '@/lib/backend-error';

export type CookieErrorType = 'db_locked' | 'fresh_required';

export function inferCookieErrorType(
  errorCode?: string,
  errorMessage?: string,
): CookieErrorType | null {
  const resolvedCode =
    errorCode ?? (errorMessage ? inferBackendErrorCode(errorMessage) : undefined);

  if (resolvedCode === 'YT_COOKIE_DB_LOCKED') return 'db_locked';
  if (resolvedCode === 'YT_FRESH_COOKIES_REQUIRED') return 'fresh_required';
  return null;
}

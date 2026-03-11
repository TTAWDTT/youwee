import { inferBackendErrorCode } from '@/lib/backend-error';

export type CookieErrorType = 'db_locked' | 'fresh_required';

function inferCookieErrorTypeFromMessage(errorMessage?: string): CookieErrorType | null {
  if (!errorMessage) return null;

  const inferredCode = inferBackendErrorCode(errorMessage);
  if (inferredCode === 'YT_COOKIE_DB_LOCKED') return 'db_locked';
  if (inferredCode === 'YT_FRESH_COOKIES_REQUIRED') return 'fresh_required';

  const normalizedMessage = errorMessage.toLowerCase();
  const dbLockedPattern =
    /permission denied.*cookies?|failed to.*cookie|failed to decrypt.*dpapi|app[\s._-]*bound[\s._-]*encryption/i;
  const freshCookiesPattern = /fresh(?:\s+login)?\s+cookies|douyin.*cookies.*(?:needed|requires)/i;

  if (dbLockedPattern.test(normalizedMessage)) return 'db_locked';
  if (freshCookiesPattern.test(normalizedMessage)) return 'fresh_required';

  return null;
}

export function inferCookieErrorType(
  errorCode?: string,
  errorMessage?: string,
): CookieErrorType | null {
  if (errorCode === 'YT_COOKIE_DB_LOCKED') return 'db_locked';
  if (errorCode === 'YT_FRESH_COOKIES_REQUIRED') return 'fresh_required';

  return inferCookieErrorTypeFromMessage(errorMessage);
}

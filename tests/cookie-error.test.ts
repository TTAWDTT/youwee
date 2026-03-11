import { describe, expect, test } from 'bun:test';
import { inferCookieErrorType } from '../src/lib/cookie-error';

describe('inferCookieErrorType', () => {
  test('prefers structured backend error codes', () => {
    expect(inferCookieErrorType('YT_COOKIE_DB_LOCKED')).toBe('db_locked');
    expect(inferCookieErrorType('YT_FRESH_COOKIES_REQUIRED')).toBe('fresh_required');
  });

  test('detects fresh login cookies messages as fresh_required', () => {
    expect(
      inferCookieErrorType(
        undefined,
        'This Douyin/TikTok content requires fresh login cookies. Please refresh login in browser cookie mode, then retry.',
      ),
    ).toBe('fresh_required');
  });

  test('detects browser cookie database lock errors', () => {
    expect(
      inferCookieErrorType(
        undefined,
        'ERROR: could not copy Chrome cookie database because the database is locked',
      ),
    ).toBe('db_locked');
  });

  test('does not treat generic cookies required errors as fresh_required', () => {
    expect(
      inferCookieErrorType(
        undefined,
        'Sign in required. Cookies are required to access this content.',
      ),
    ).toBeNull();
  });
});

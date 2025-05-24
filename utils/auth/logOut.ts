import { isWindowDefined } from '@/utils/functions/isWindowDefined';

export function logOut() {
  if (isWindowDefined()) {
    document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    // Redirect to auth page
    window.location.href = '/auth';
    if (window.localStorage.getItem(`email`)) window.localStorage.removeItem(`email`);

  }
}
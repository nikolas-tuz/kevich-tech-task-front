import { isWindowDefined } from '@/utils/functions/isWindowDefined';

export function logIn(accessToken: string, email: string) {
  if (isWindowDefined()) {
    document.cookie = `access_token=${accessToken}; path=/; max-age=28800;`;
    window.localStorage.setItem(`email`, email);

    window.location.href = `/`;
  }

}
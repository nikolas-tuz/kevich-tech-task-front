import { isWindowDefined } from '../functions/isWindowDefined';

export function getAccessToken() {
  if (isWindowDefined()) {
    // get access token from a cookie
    const cookies = document.cookie.split(`; `);
    const accessToken = cookies.find((cookie) => cookie.startsWith(`access_token=`));
    if (accessToken) {
      return accessToken.split(`=`)[1];
    }
    return null;

  }
}
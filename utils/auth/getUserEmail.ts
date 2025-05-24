import { isWindowDefined } from '@/utils/functions/isWindowDefined';

export function getUserEmail() {
  if (isWindowDefined()) {
    return window.localStorage.getItem('email');
  }
  return null;
}
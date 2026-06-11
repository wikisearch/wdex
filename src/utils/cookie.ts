export function getCookie(key: string): string | null {
  try {
    const keyName = `${key}=`;
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("; ");
    for (const val of cArr) {
      if (val.indexOf(keyName) === 0) return val.substring(keyName.length);
    }
  } catch (error) {
    console.error("Error getting cookie:", error);
  }
  return null;
}

export function setCookie(
  key: string,
  value: string,
  daysUntilExpiration: number = 0,
) {
  try {
    const serializedValue = encodeURIComponent(value);
    let cookieOptions = `${key}=${serializedValue}; path=/`;
    if (daysUntilExpiration > 0) {
      const expirationDate = new Date(
        Date.now() + daysUntilExpiration * 24 * 60 * 60 * 1000,
      );
      cookieOptions += `; expires=${expirationDate.toUTCString()}`;
    }
    document.cookie = cookieOptions;
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
}

export function removeCookie(key: string) {
  try {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } catch (error) {
    console.error("Error removing cookie:", error);
  }
}

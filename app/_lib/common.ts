/**
 * 공통 함수 모듈
 */

/**
 * 모든 문자가 소문자인지 확인
 * @param str 
 * @returns 
 */
export function isAllLowerCase(str: string): boolean {
  return str === str.toLowerCase();
}

/**
 * 모든 문자가 대문자인지 확인
 * @param str 
 * @returns 
 */
export function isAllUpperCase(str: string): boolean {
  return str === str.toUpperCase();
}


export function isExistUpperCase(str: string): boolean {
  let isExistUpperCase = false;
  const numRegExp = /^[0-9]$/;

  for (let s of str) {
    // 숫자는 식별하지 않음
    if (numRegExp.test(s)) continue;

    // 대문자 변환한 것과 같을 경우 true return
    if (s === s.toUpperCase()) {
      isExistUpperCase = true;
      break;
    }
  }

  return isExistUpperCase;
}

export function isExistNumber(str: string): boolean {
  const numRegExp = /[^0-9]/g;

  const notExistNumStr = str.replace(numRegExp, '');

  if (notExistNumStr.length > 0) {
    return true;
  } else {
    return false;
  }
}
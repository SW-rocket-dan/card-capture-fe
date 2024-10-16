/**
 * 객체를 깊은 비교하는 함수
 * 내부의 key-value들이 같은지 제귀적으로 확인함
 */
const isEqual = (obj1: any, obj2: any): boolean => {
  // 완전히 같은 객체, 같은 값을 가진 원사타입이면 true
  if (obj1 === obj2) return true;

  // 객체가 아니거나 null이면 false
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // key의 개수가 같지 않으면 false;
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    // 각 key의 value들이 같은지 재귀로 검사
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) return false;
  }

  return false;
};

export default { isEqual };

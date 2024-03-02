import { selectSQL } from "../_lib/db";

export interface TbUserInterface {
  seq: string;
  id: string;
  pw: string;
  role: string;
  regDt: string;
}

/**
 * 유저 정보 조회 (로그인)
 * @param userId 
 * @param userPw 
 * @returns 
 */
export const getUserData = (userId: string, userPw: string) => {
  const sql = `
    SELECT USER_SEQ
          , USER_ID
          , USER_ROLE
    FROM TB_USER
    WHERE USER_ID = '${userId}'
      AND USER_PW = '${userPw}'
  `;

  return selectSQL(sql);
}
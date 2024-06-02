import { selectSQL } from "../_lib/db";
import { sql } from "@vercel/postgres";


export interface TbUserInterface {
  seq: string;
  id: string;
  pw: string;
  role: string;
  regDt: string;
}

/**
 * 로그인 - 유저 정보 조회
 * @param userId 
 * @param userPw 
 * @returns 
 */
export const getUserData = (id: string, pw: string) => {

  return sql`SELECT "USER_SEQ"
                , "USER_ID"
                , "USER_ROLE"
              FROM "TB_USER"
              WHERE "USER_ID" = ${'id'}
              AND "USER_PW" = ${'pw'}`;
}

/**
 * 회원가입 - 회원 정보 등록
 * @param data 
 * @returns 
 */
export const insUserData = (data: { id: string, pw: string }) => {

  return sql`
    INSERT INTO "TB_USER" (
      "USER_ID",
      "USER_PW",
      "USER_ROLE",
      "REG_DT"
    ) VALUES (
      '` + data.id + `',
      '` + data.pw + `',
      'USER',
      CURRENT_TIMESTAMP
    )
  `;
}

/**
 * 회원가입 - 아이디 중복 확인
 * @param data 
 * @returns 
 */
export const getDupUserId = (data: { id: string }) => {

  return sql`
    SELECT "USER_ID" as "isDupUserId"
    FROM "TB_USER"
    WHERE "USER_ID" = '${data.id}'
  `;
}
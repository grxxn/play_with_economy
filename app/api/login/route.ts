import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";

/**
 * 로그인 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json();

    const id = body.userId;
    const pw = body.userPw;

    const { rows } = await sql`SELECT "USER_SEQ"
                                , "USER_ID"
                                , "USER_ROLE"
                              FROM "TB_USER"
                              WHERE "USER_ID" = ${id}
                              AND "USER_PW" = ${pw}`;

    // 쿠키 설정
    if (rows) {
      const jsonData = JSON.parse(JSON.stringify(rows))[0];
      // const token = res.headers.get('cookie')

      cookies().set('userSeq', jsonData.USER_SEQ);
      cookies().set('userId', jsonData.USER_ID);
      cookies().set('userRole', jsonData.USER_ROLE);
    }

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      data: rows
    });

  } catch (err) {

    return NextResponse.json({
      status: 400,
      statusText: 'Failed',
      message: "ERR S001: 로그인 실패. 잠시 후 다시 시도해주세요."
    });

  }

}

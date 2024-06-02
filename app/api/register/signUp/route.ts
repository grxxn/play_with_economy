import { NextRequest, NextResponse } from "next/server";
import { insUserData } from "../../tbUser";
import { sql } from "@vercel/postgres";


/**
 * 회원등록 API
 * @param req 
 * @param res 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const id = body.id;
    const pw = body.pw;

    await sql`
      INSERT INTO "TB_USER" (
        "USER_ID",
        "USER_PW",
        "USER_ROLE",
        "REG_DT"
      ) VALUES (
        ${id},
        ${pw},
        'USER',
        CURRENT_TIMESTAMP
      )
    `
    return NextResponse.json({
      status: 200,
      statusText: 'Success',
      message: "회원가입이 완료되었습니다."
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 400,
      statusText: 'Failed',
      message: "ERR S002: 회원가입 실패. 잠시 후 다시 시도해주세요."
    });
  }
}
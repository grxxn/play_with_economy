import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";


/**
 * 아이디 중복 확인 API
 * @param req 
 * @param res 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { rows } = await sql`SELECT "USER_ID" as "isDupUserId"
                              FROM "TB_USER"
                              WHERE "USER_ID" = ${body.id}`;

    return NextResponse.json({ isDupUserId: rows });

  } catch (err) {
    return NextResponse.json({
      status: 400,
      statusText: 'Failed',
      message: "ERR S001: 중복 확인 실패. 잠시 후 다시 시도해주세요."
    });
  }
}
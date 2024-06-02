import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * 게시글 최신 SEQ 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function GET(req: NextRequest, res: NextResponse) {
  try {

    const { rows } = await sql`
      SELECT COUNT(*) as "totAmt"
      FROM "TB_LRN_BARD"
      WHERE "USE_YN" = 'Y'
    `;
    console.log(rows)

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      data: rows[0]
    });

  } catch (err) {

    return NextResponse.json({
      status: 400,
      statusText: 'Failed',
      message: "ERR S001: SEQ 조회 실패. 잠시 후 다시 시도해주세요."
    });

  }
}
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * Learn 게시물 삭제 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json();
    const seq = body.lrnBardSeq;

    await sql`
      UPDATE  "TB_LRN_BARD"
      SET     "USE_YN" = 'N'
      WHERE   "LRN_BARD_SEQ" = ${seq}
    `;

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      message: "게시물이 삭제되었습니다. 목록으로 이동합니다."
    });

  } catch (err) {
    return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: 게시물 삭제 실패. 잠시 후 다시 시도해주세요."
    });
  }

}
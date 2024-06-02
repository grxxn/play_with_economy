import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * 다이어리 아이템 삭제 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {

    const body = await req.json();
    const recSeq = body.recSeq;

    await sql`
      UPDATE  "TB_REC"
      SET     "USE_YN" = 'N'
      WHERE   "REC_SEQ" = ${recSeq}
    `;

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      message: "게시물 삭제가 완료되었습니다."
    });

  } catch (err) {

    return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: 게시물 삭제 실패. 잠시 후 다시 시도해주세요."
    });

  }

}
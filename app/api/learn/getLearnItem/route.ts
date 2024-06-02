import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * 학습 게시글 상세 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {

    const body = await req.json();
    const seq = body.lrnBardSeq;

    const { rows } = await sql`
      SELECT "LRN_BARD_TITL"          as "lrnBardTitl"
              , "LRN_BARD_SUB_TITL"     as "lrnBardSubTitl"
              , "LRN_BARD_THUM_PATH"    as "lrnBardThumPath"
              , "LRN_BARD_CONT"         as "lrnBardCont"
              , to_char("REG_DT", 'YYYY.mm.dd')    as "regDt"
              , to_char("UPD_DT", 'YYYY.mm.dd')    as "updDt"
        FROM "TB_LRN_BARD"
        WHERE "LRN_BARD_SEQ" = ${seq}
    `;

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      data: rows[0]
    });

  } catch (err) {

    return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: 게시글 상세 조회 실패. 잠시 후 다시 시도해주세요."
    });

  }
}
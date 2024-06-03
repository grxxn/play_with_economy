import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * 학습 게시판 리스트 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {

    const body = await req.json();
    const currItemCnt = parseInt(body.currItemCnt);

    const { rows } = await sql`
      SELECT "LRN_BARD_SEQ"			  as "lrnBardSeq"
            , "LRN_BARD_TITL" 	    as "lrnBardTitl"
            , "LRN_BARD_SUB_TITL" 	as "lrnBardSubTitl"
            , "LRN_BARD_THUM_PATH"   as "lrnBardThumPath"
            , to_char("REG_DT", 'YYYY.mm.dd')		as "regDt"
            , to_char("UPD_DT", 'YYYY.mm.dd')   as "updDt"
      FROM "TB_LRN_BARD"
      WHERE "USE_YN" = 'Y'
      ORDER BY "LRN_BARD_SEQ" DESC
      LIMIT 8
      OFFSET ${currItemCnt};
    `;

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      data: rows
    });

  } catch (err) {

    return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: 중복 확인 실패. 잠시 후 다시 시도해주세요."
    });

  }
}
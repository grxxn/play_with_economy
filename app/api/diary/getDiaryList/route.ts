import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

/**
 * 다이어리 리스트 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {

    const body = await req.json();
    const userSeq = parseInt(body.userSeq);

    const { rows } = await sql`
      SELECT "REC_SEQ"			as "recSeq"
          , "EXC_RAT_VAL" 	as "excRatVal"
          , "INTR_RAT_VAL"	as "intrRatVal"
          , "STC_PRIC_VAL"	as "stcPricVal"
          , "OIL_PRIC_VAL"	as "oilPricVal"
          , to_char("REG_DT", 'YYYY.mm.dd')    as "regDt"
      FROM "TB_REC"
      WHERE "USE_YN" = 'Y'
      AND "USER_SEQ" = ${userSeq}
      ORDER BY "REC_SEQ" DESC;
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
      message: "ERR S001: 리스트 조회 실패. 잠시 후 다시 시도해주세요.",
    });

  }
}
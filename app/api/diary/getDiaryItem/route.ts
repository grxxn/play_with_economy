import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

/**
 * 다이어리 아이템 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {

    const body = await req.json();
    const seq = parseInt(body.recSeq);

    const { rows } = await sql`
      SELECT "EXC_RAT_NAT"		as "excRatNat"
            , "EXC_RAT_VAL"	  as "excRatVal"
            , "EXC_RAT_FLU"	  as "excRatFlu"
            , "EXC_RAT_MEMO"	as "excRatMemo"
            , "INTR_RAT_SRT"	as "intrRatSrt"
            , "INTR_RAT_VAL"	as "intrRatVal"
            , "INTR_RAT_FLU"	as "intrRatFlu"
            , "INTR_RAT_MEMO"	as "intrRatMemo"
            , "STC_PRIC_SRT"	as "stcPricSrt"
            , "STC_PRIC_VAL"	as "stcPricVal"
            , "STC_PRIC_FLU"	as "stcPricFlu"
            , "STC_PRIC_MEMO"	as "stcPricMemo"
            , "OIL_PRIC_SRT"	as "oilPricSrt"
            , "OIL_PRIC_VAL"	as "oilPricVal"
            , "OIL_PRIC_FLU"	as "oilPricFlu"
            , "OIL_PRIC_MEMO"	as "oilPricMemo"
            , "REC_GENR_REVW"	as "recGenrRevw"
            , to_char("REG_DT", 'YYYY.mm.dd')   as "regDt"
            , to_char("MOD_DT", 'YYYY.mm.dd')	  as "modDt"
      FROM "TB_REC" A
      WHERE "REC_SEQ" = ${seq};
    `;
    const diaryData = rows[0];


    const artcArr = await sql`
      SELECT  "ARTC_SEQ"  as "artcSeq"
            , "ARTC_ADDR" as "artcAddr"
            , "USE_YN"    as "useYn"
      FROM    "TB_REC_ARTCS"
      WHERE   "REC_SEQ" = ${seq}
      AND     "USE_YN" = 'Y'
    `;


    return NextResponse.json({
      status: 200,
      statusText: "Success",
      data: {
        diaryData: diaryData,
        artcArr: artcArr.rows
      }
    });

  } catch (err) {

    return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: 게시물 조회 실패. 잠시 후 다시 시도해주세요."
    });

  }

}
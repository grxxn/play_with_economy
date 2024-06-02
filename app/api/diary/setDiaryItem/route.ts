import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * 다이어리 아이템 등록 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {

    if (req.method !== "POST") {
      return NextResponse.json({
        status: 400,
        statusText: "Failed",
        message: "HTTP ERROR",
      });
    }

    const body = await req.json();

    // 게시물 등록
    await sql`
      INSERT INTO "TB_REC" (
        "USER_SEQ",
        "EXC_RAT_NAT",
        "EXC_RAT_VAL",
        "EXC_RAT_FLU",
        "EXC_RAT_MEMO",
        "INTR_RAT_SRT",
        "INTR_RAT_VAL",
        "INTR_RAT_FLU",
        "INTR_RAT_MEMO",
        "STC_PRIC_SRT",
        "STC_PRIC_VAL",
        "STC_PRIC_FLU",
        "STC_PRIC_MEMO",
        "OIL_PRIC_SRT",
        "OIL_PRIC_VAL",
        "OIL_PRIC_FLU",
        "OIL_PRIC_MEMO",
        "REC_GENR_REVW",
        "REG_DT"
      ) VALUES (
        ${body.userSeq},
        ${body.excRatNat},
        ${body.excRatVal},
        ${body.excRatFlu},
        ${body.excRatMemo.replaceAll('\n', '<br/>')},
        ${body.intrRatSrt},
        ${body.intrRatVal},
        ${body.intrRatFlu},
        ${body.intrRatMemo.replaceAll('\n', '<br/>')},
        ${body.stcPricSrt},
        ${body.stcPricVal},
        ${body.stcPricFlu},
        ${body.stcPricMemo.replaceAll('\n', '<br/>')},
        ${body.oilPricSrt},
        ${body.oilPricVal},
        ${body.oilPricFlu},
        ${body.oilPricMemo.replaceAll('\n', '<br/>')},
        ${body.recGenrRevw.replaceAll('\n', '<br/>')},
        CURRENT_TIMESTAMP
      )
    `;

    // 게시물 기사 등록
    for (let i = 0; i < body.artcAddrArr.length; i++) {
      if (body.artcAddrArr[i].useYn !== 'N') {

        await sql`
          INSERT INTO "TB_REC_ARTCS" (
            "REC_SEQ",
            "ARTC_ADDR",
            "REG_DT"
          ) VALUES (
            (SELECT "REC_SEQ" FROM "TB_REC" ORDER BY "REC_SEQ" DESC LIMIT 1),
            ${body.artcAddrArr[i].artcAddr},
            CURRENT_TIMESTAMP
          )
        `;

      }
    }

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      message: "게시물 등록이 완료되었습니다."
    });

  } catch (err) {

    return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: 게시물 등록 실패. 잠시 후 다시 시도해주세요."
    });


  }
}
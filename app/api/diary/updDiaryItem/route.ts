import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * 다이어리 아이템 수정 API
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
      SET     "EXC_RAT_NAT" = ${body.diaryDto.excRatNat},
              "EXC_RAT_VAL" = ${body.diaryDto.excRatVal},
              "EXC_RAT_FLU" = ${body.diaryDto.excRatFlu},
              "EXC_RAT_MEMO" = ${body.diaryDto.excRatMemo},
              "INTR_RAT_SRT" = ${body.diaryDto.intrRatSrt},
              "INTR_RAT_VAL" = ${body.diaryDto.intrRatVal},
              "INTR_RAT_FLU" = ${body.diaryDto.intrRatFlu},
              "INTR_RAT_MEMO" = ${body.diaryDto.excRatMemo},
              "STC_PRIC_SRT" = ${body.diaryDto.stcPricSrt},
              "STC_PRIC_VAL" = ${body.diaryDto.stcPricVal},
              "STC_PRIC_FLU" = ${body.diaryDto.stcPricFlu},
              "STC_PRIC_MEMO" = ${body.diaryDto.stcPricMemo},
              "OIL_PRIC_SRT" = ${body.diaryDto.oilPricSrt},
              "OIL_PRIC_VAL" = ${body.diaryDto.oilPricVal},
              "OIL_PRIC_FLU" = ${body.diaryDto.oilPricFlu},
              "OIL_PRIC_MEMO" = ${body.diaryDto.oilPricMemo},
              "REC_GENR_REVW" = ${body.diaryDto.recGenrRevw},
              "MOD_DT" = CURRENT_TIMESTAMP,
              "USE_YN" = 'Y'
      WHERE   "REC_SEQ" = ${recSeq}
    `;

    // 기사 수정 및 등록
    if (body.diaryDto.artcAddrArr) {

      for (let i = 0; i < body.diaryDto.artcAddrArr.length; i++) {
        if (body.diaryDto.artcAddrArr[i].artcSeq.length === 0) {
          // 수정모드에서 기사 등록 시

          await sql`
            INSERT INTO "TB_REC_ARTCS" (
              "REC_SEQ",
              "ARTC_ADDR",
              "REG_DT"
            ) VALUES (
              ${recSeq},
              ${body.diaryDto.artcAddrArr[i].artcAddr},
              CURRENT_TIMESTAMP
            )
          `;

        } else {
          // 기존 기사 수정

          await sql`
            UPDATE  "TB_REC_ARTCS"  
            SET     "ARTC_ADDR" = ${body.diaryDto.artcAddrArr[i].artcAddr},
                    "MOD_DT" = CURRENT_TIMESTAMP,
                    "USE_YN" = ${body.diaryDto.artcAddrArr[i].useYn}
            WHERE   "ARTC_SEQ" = ${body.diaryDto.artcAddrArr[i].artcSeq}
          `;
        }
      }

    }

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      message: "게시물 수정이 완료되었습니다."
    });

  } catch (err) {
    console.log(err)

    return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: 게시물 수정 실패. 잠시 후 다시 시도해주세요."
    });

  }
}
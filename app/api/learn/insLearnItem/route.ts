import fs from "node:fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getLrnLatestSeq, insLrnItem } from "../../tbLrnBard";
import { sql } from "@vercel/postgres";

// export const config = {
//   api: {
//     bodyParser: false,
//   }
// }

/**
 * Learn 아이템 등록 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextApiResponse) {

  try {
    // 이미지 파일 이름에 SEQ 추가
    // const latestSeqRes = await getLrnLatestSeq();
    const { rows } = await sql`SELECT ("LRN_BARD_SEQ" + 1) as "latestSeq"
                              FROM "TB_LRN_BARD"
                              ORDER BY "LRN_BARD_SEQ" DESC
                              LIMIT 1`;
    let latestSeq;
    if (rows) {
      const latestSeqArr = JSON.parse(JSON.stringify(rows))[0];
      latestSeq = latestSeqArr.latestSeq;
    }

    // 이미지 저장 dir (local public 폴더에 저장)
    const imgStoragePath = path.join(
      process.cwd() + "/app" + "/server" + "/images"
    );

    const formData = await req.formData();
    const file = formData.get("lrnThumImgfile") as File;

    if (!file) return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: 파일 확인 실패. 잠시 후 다시 시도해주세요."
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    let fileNm = file.name.replaceAll(" ", "_");
    fileNm = latestSeq + "_" + fileNm;

    // local 폴더에 이미지 저장
    try {
      await fs.writeFile(
        `${imgStoragePath}/${fileNm}`,
        buffer
      );
      formData.set("lrnBardThumPath", fileNm);

      const lrnDetailDto = {
        lrnBardTitl: formData.get("lrnBardTitl") as string,
        lrnBardSubTitl: formData.get("lrnBardSubTitl") as string,
        lrnBardCont: formData.get("lrnBardCont") as string,
        lrnBardThumPath: formData.get("lrnBardThumPath") as string,
        regSeq: formData.get("regSeq") as string
      }

      // 게시글 등록 쿼리
      await sql`
        INSERT INTO "TB_LRN_BARD" (
          "LRN_BARD_TITL",
          "LRN_BARD_SUB_TITL",
          "LRN_BARD_CONT",
          "LRN_BARD_THUM_PATH",
          "REG_DT",
          "REG_SEQ"
        ) VALUES (
          ${lrnDetailDto.lrnBardTitl},
          ${lrnDetailDto.lrnBardSubTitl},
          ${lrnDetailDto.lrnBardCont},
          ${lrnDetailDto.lrnBardThumPath},
          CURRENT_TIMESTAMP,
          ${lrnDetailDto.regSeq}
        )
      `;
      // await insLrnItem(lrnDetailDto);

      return NextResponse.json({
        status: 200,
        statusText: "Success",
      });
    } catch (err) {
      return NextResponse.json({
        status: 400,
        statusText: "Failed",
        message: "ERR S001: 게시글 작성 실패. 잠시 후 다시 시도해주세요."
      });
    }

  } catch (err) {

    return NextResponse.json({
      status: 400,
      statusText: "Failed",
      message: "ERR S001: SEQ 조회 실패. 잠시 후 다시 시도해주세요."
    });

  }


}
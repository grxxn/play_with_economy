import { NextRequest, NextResponse } from "next/server";
import { updLrnItem } from "../../tbLrnBard";
import fs from "node:fs/promises";
import path from "path";

/**
 * Learn 게시글 수정 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  const formData = await req.formData();

  // 썸네일을 새로 추가한 경우 이미지 새로 등록
  const lrnBardThumPath = formData.get('lrnBardThumPath') as string;
  console.log(lrnBardThumPath)
  if (lrnBardThumPath.length === 0) {

    const lrnSeq = formData.get('lrnBardSeq');
    const imgStoragePath = path.join(
      process.cwd() + "/app" + "/server" + "/images"
    );
    const file = formData.get("lrnThumImgfile") as File;

    if (!file) return NextResponse.json({
      status: 400,
      statusText: 'Failed',
      message: "ERR S001: 수정 실패. 잠시 후 다시 시도해주세요."
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    let fileNm = file.name.replaceAll(" ", "_");
    fileNm = lrnSeq + "_" + fileNm;

    // local 폴더에 이미지 저장
    try {

      await fs.writeFile(
        `${imgStoragePath}/${fileNm}`,
        buffer
      );
      formData.set("lrnBardThumPath", fileNm);

    } catch (err) {

      return NextResponse.json({
        status: 400,
        statusText: 'Failed',
        message: "ERR S001: 수정 실패. 잠시 후 다시 시도해주세요."
      });
    }

  }

  try {
    const lrnDetailDto = {
      lrnBardSeq: formData.get("lrnBardSeq") as string,
      lrnBardTitl: formData.get("lrnBardTitl") as string,
      lrnBardSubTitl: formData.get("lrnBardSubTitl") as string,
      lrnBardCont: formData.get("lrnBardCont") as string,
      lrnBardThumPath: formData.get("lrnBardThumPath") as string,
      updSeq: formData.get("updSeq") as string
    }

    await updLrnItem(lrnDetailDto);

    return NextResponse.json({
      status: 200,
      statusText: "Success",
      message: "수정이 완료되었습니다."
    });
  } catch (err) {
    console.log("Error occured ", err);
    return NextResponse.json({
      status: 400,
      statusText: 'Failed',
      message: "ERR S001: 수정 실패. 잠시 후 다시 시도해주세요."
    });
  }

}
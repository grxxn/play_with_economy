import formidable from "formidable";
import fs from "node:fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getLrnLatestSeq, insLrnItem } from "../../tbLrnBard";

export const config = {
  api: {
    bodyParser: false,
  }
}

/**
 * Learn 아이템 등록 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextApiResponse) {

  // 이미지 파일 이름에 SEQ 추가
  const latestSeqRes = await getLrnLatestSeq();
  let latestSeq;
  if (latestSeqRes) {
    const latestSeqArr = JSON.parse(JSON.stringify(latestSeqRes))[0];
    latestSeq = latestSeqArr.latestSeq;
  }

  // 이미지 저장 dir (local public 폴더에 저장)
  const imgStoragePath = path.join(
    process.cwd() + "/app" + "/server" + "/images"
  );

  const formData = await req.formData();
  const file = formData.get("lrnThumImgfile") as File;

  if (!file) return NextResponse.json({ error: "No files received." }, { status: 400 });

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

    await insLrnItem(lrnDetailDto);
    return NextResponse.json({ message: "Success", status: 201 });
  } catch (err) {
    console.log("Error occured ", err);
    return NextResponse.json({ message: "Failed", status: 500 });
  }

}
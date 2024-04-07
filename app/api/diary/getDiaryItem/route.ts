import { getArtcAddr, getDiaryItem } from "../../tbRec";
import { NextRequest, NextResponse } from "next/server";

/**
 * 다이어리 아이템 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const seq = req.nextUrl.searchParams.get("recSeq");
  const data = await getDiaryItem(seq as string);

  const artcArr = await getArtcAddr(seq as string);

  return NextResponse.json({
    diaryData: data,
    artcArr: artcArr
  });
}
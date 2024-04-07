import { getDiaryList } from "../../tbRec";
import { NextRequest, NextResponse } from "next/server";

/**
 * 다이어리 리스트 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const userSeq = req.nextUrl.searchParams.get("userSeq");
  const data = await getDiaryList(userSeq as string);

  return NextResponse.json(data);
}
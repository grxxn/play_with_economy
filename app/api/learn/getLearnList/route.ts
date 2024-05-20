import { NextRequest, NextResponse } from "next/server";
import { getLrnBardList } from "../../tbLrnBard";

/**
 * 학습 게시판 리스트 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const currItemCnt = parseInt(body.currItemCnt);

  const data = await getLrnBardList(currItemCnt);

  return NextResponse.json(data);
}
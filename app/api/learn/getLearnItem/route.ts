import { NextRequest, NextResponse } from "next/server";
import { getLrnDetail } from "../../tbLrnBard";

/**
 * 학습 게시글 상세 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const seq = body.lrnBardSeq;

  const data = await getLrnDetail(seq);

  return NextResponse.json(data);
}
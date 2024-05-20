import { NextRequest, NextResponse } from "next/server";
import { getLrnBardTotAmt } from "../../tbLrnBard";

/**
 * 게시글 최신 SEQ 조회 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const data = await getLrnBardTotAmt();

  return NextResponse.json(data);
}
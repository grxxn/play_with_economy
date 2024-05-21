import { NextRequest, NextResponse } from "next/server";
import { updLrnItem } from "../../tbLrnBard";

/**
 * Learn 게시글 수정 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json();
    await updLrnItem(body);

    return new NextResponse(null, {
      status: 200,
      statusText: "수정이 완료되었습니다."
    });

  } catch (err) {
    return new NextResponse(null, {
      status: 400,
      statusText: "ERR S001: 수정 실패. 잠시 후 다시 시도해주세요."
    });
  }

}
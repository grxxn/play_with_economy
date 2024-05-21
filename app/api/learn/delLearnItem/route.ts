import { NextRequest, NextResponse } from "next/server";
import { delLrnItem } from "../../tbLrnBard";

/**
 * Learn 게시물 삭제 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json();
    const seq = body.lrnBardSeq;

    await delLrnItem(seq);

    return NextResponse.json({
      message: "게시글이 삭제되었습니다. 목록으로 이동합니다.",
      status: 200
    });

  } catch (err) {
    return new NextResponse(null, {
      status: 400,
      statusText: "ERR S002: 삭제 실패. 잠시 후 다시 시도해주세요."
    });
  }

}
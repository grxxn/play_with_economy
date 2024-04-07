import { NextRequest, NextResponse } from "next/server";
import { insArtcAddrs, updNewAtrcAddrs, updateAtrcAddrs, updateDiaryItem } from "../../tbRec";

/**
 * 다이어리 아이템 수정 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const body = await req.json();
    const recSeq = body.recSeq;

    await updateDiaryItem(recSeq as string, body.diaryDto);
    for (let i = 0; i < body.diaryDto.artcAddrArr.length; i++) {
      if (body.diaryDto.artcAddrArr[i].artcSeq.length === 0) {
        await updNewAtrcAddrs(recSeq, body.diaryDto.artcAddrArr[i].artcAddr);
      } else {
        await updateAtrcAddrs(body.diaryDto.artcAddrArr[i]);
      }
    }

    return new NextResponse(null, {
      status: 200,
      statusText: "OK",
    });

  } catch (err) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request"
    });
  }
}
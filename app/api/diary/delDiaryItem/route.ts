import { NextRequest, NextResponse } from "next/server";
import { deleteDiaryItem } from "../../tbRec";

/**
 * 다이어리 아이템 삭제 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const recSeq = body.recSeq;

  const data = await deleteDiaryItem(recSeq as string);

  return NextResponse.json(data);
}
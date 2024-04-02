import { getArtcCnt, getDiaryList } from "../../tbRec";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const userSeq = req.nextUrl.searchParams.get("userSeq");
  const data = await getDiaryList(userSeq as string);

  return NextResponse.json(data);
}
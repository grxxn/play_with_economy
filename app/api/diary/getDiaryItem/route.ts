import { getDiaryItem, getDiaryList } from "../../tbRec";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const seq = req.nextUrl.searchParams.get("recSeq");
  const data = await getDiaryItem(seq as string);

  return NextResponse.json(data);
}
import { getDiaryList } from "../../tbRec";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

  const data = await getDiaryList();

  return NextResponse.json(data);
}
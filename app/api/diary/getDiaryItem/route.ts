import { NextApiRequest, NextApiResponse } from "next";
import { getDiaryItem } from "../../tbRec";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const data = await getDiaryItem(req.query.recSeq as string);

  return NextResponse.json(data);
}
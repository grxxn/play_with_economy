import { NextApiRequest, NextApiResponse } from "next";
import { getDiaryList } from "../../tbRec";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  const data = await getDiaryList();

  return NextResponse.json(data);
}
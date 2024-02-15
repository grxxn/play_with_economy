import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getUserData } from "../tbUser";

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  const data = await getUserData();

  return NextResponse.json(data);
}

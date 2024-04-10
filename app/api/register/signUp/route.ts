import { NextRequest, NextResponse } from "next/server";
import { insUserData } from "../../tbUser";


/**
 * 회원등록 API
 * @param req 
 * @param res 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body)

    await insUserData(body);
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
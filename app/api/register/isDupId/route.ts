import { NextRequest, NextResponse } from "next/server";
import { getDupUserId, insUserData } from "../../tbUser";
import { RowDataPacket } from "mysql2";


/**
 * 아이디 중복 확인 API
 * @param req 
 * @param res 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const isDupUserId = await getDupUserId(body);
    return NextResponse.json({ isDupUserId: isDupUserId });

  } catch (err) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request"
    });
  }
}
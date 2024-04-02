import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "../tbUser";
import { cookies } from "next/headers";

/**
 * 로그인 API
 * @param req 
 * @param res 
 * @returns 
 */
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const id = body.userId;
  const pw = body.userPw;

  if (id && pw) {
    const data = await getUserData(id, pw);

    // 쿠키 설정
    if (data) {
      const jsonData = JSON.parse(JSON.stringify(data))[0];
      // const token = res.headers.get('cookie')

      cookies().set('userSeq', jsonData.USER_SEQ);
      cookies().set('userId', jsonData.USER_ID);
      cookies().set('userRole', jsonData.USER_ROLE);
    }

    return NextResponse.json(data);

  } else {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request"
    });
  }

}

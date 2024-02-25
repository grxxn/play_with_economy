import { NextRequest, NextResponse } from "next/server";
import { setAtrcAddrs, setDiaryItem } from "../../tbRec";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new NextResponse(null, {
      status: 404,
      statusText: "Not Found"
    });
  }

  try {
    const body = await req.json();

    await setDiaryItem(body);
    for (let i = 0; i < body.artcAddrArr.length; i++) {
      await setAtrcAddrs(body.artcAddrArr[i], body.date);
    }

    return new NextResponse(null, {
      status: 200,
      statusText: "OK"
    });
  } catch (err) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request"
    });
  }
}
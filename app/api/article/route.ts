import { NextRequest, NextResponse } from "next/server";

/**
 * 기사 조회 API
 */
export async function POST(req: NextRequest, res: NextResponse) {

  // fetch('/v1/search/news.json?query=%EC%A3%BC%EC%8B%9D&start=1&sort=sim', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Naver-Client-Id': CLIENT_ID as string,
  //     'X-Naver-Client-Secret': CLIENT_PW as string
  //   },
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     if (data.items) setArtcList(data.items);
  //   })

  const data = {};

  return NextResponse.json(data);
}
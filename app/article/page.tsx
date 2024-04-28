"use client";

import Link from "next/link";
import styles from './components/list.module.scss';
import { useEffect, useState } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_API_KEY_NAVER_ID;
const CLIENT_PW = process.env.NEXT_PUBLIC_API_KEY_NAVER_PW;

type ArtcType = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export default function ArticleList() {
  // ======================== 변수 선언 ========================
  const [artcList, setArtcList] = useState<ArtcType[]>([]);


  // ======================== 함수 선언 ========================
  /**
   * 네이버 기사 데이터 조회
   */
  const getArticleList = () => {
    fetch('/v1/search/news.json?query=%EC%A3%BC%EC%8B%9D&display=10&start=1&sort=sim', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': CLIENT_ID as string,
        'X-Naver-Client-Secret': CLIENT_PW as string
      },
    })
      .then(res => res.json())
      .then(data => {
        setArtcList(data.items);
      })
  }


  // ======================== 이벤트 선언 ========================

  useEffect(() => {
    getArticleList();
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.articleListHeader}>
        <h1>
          <Link href={'/'}>경제야 놀자</Link>
        </h1>
        <button type="button">
          로그아웃
        </button>
      </div>

      <div className={styles.articleList}>
        {
          artcList.length > 0
            ?
            <table>
              <tbody>
                {
                  artcList.map((item) => (
                    <tr key={item.title}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>?
                    </tr>
                  ))
                }
              </tbody>
            </table>

            : null
        }
      </div>
    </div>
  )
}
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
    fetch('/v1/search/news.json?query=%EC%A3%BC%EC%8B%9D&start=1&sort=sim', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': CLIENT_ID as string,
        'X-Naver-Client-Secret': CLIENT_PW as string
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.items) setArtcList(data.items);
      })
  }


  // ======================== 이벤트 선언 ========================

  useEffect(() => {
    getArticleList();
  }, [])


  return (
    <div className={styles.container}>
      {
        artcList.length > 0
          ? <>
            <table>
              <colgroup>
                <col width={'80%'} />
                <col width={'20%'} />
              </colgroup>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>게시일</th>
                </tr>
              </thead>
              <tbody>
                {
                  artcList.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <a href={item.link} target='_blank'>
                          <p dangerouslySetInnerHTML={{ __html: item.title }} className={styles.newTitl}></p>
                          <p dangerouslySetInnerHTML={{ __html: item.description }} className={styles.newsDesc}></p>
                        </a>
                      </td>
                      {/* <td dangerouslySetInnerHTML={{ __html: item.description }}></td> */}
                      <td className={styles.newDt}>
                        {new Date(item.pubDate).getFullYear() + '.'
                          + (new Date(item.pubDate).getMonth() + 1) + '.'
                          + new Date(item.pubDate).getDate()}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <div className={styles.paginationBox}>
              <button type="button" className={styles.prevBtn}>&lt;</button>
              <button type="button" className={styles.nextBtn}>&gt;</button>
            </div>
          </>


          : null
      }
    </div>
  )
}
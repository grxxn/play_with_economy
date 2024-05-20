"use client";

import Link from "next/link";
import LearnCard, { LearnCardType } from "./components/LearnCard";
import styles from "./components/learn.module.scss";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

/**
 * 학습 게시판
 * 
 * @author yjjeon
 * @returns 
 */
export default function LearnCardList() {
  // ======================== 변수 선언 ========================
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [learnCardList, setLearnCardList] = useState<LearnCardType[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [totAmt, setTotAmt] = useState<number>(0);

  // ======================== 함수 선언 ========================

  /**
   * 게시판 리스트 조회
   */
  const getLrnBard = () => {
    fetch('/api/learn/getLearnList', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currItemCnt: pageNum * 8
      })
    })
      .then(res => res.json())
      .then(data => {
        let copyPageNum = pageNum;
        setPageNum(++copyPageNum);

        setLearnCardList([...learnCardList, ...data]);
      });
  }

  /**
   * 게시판 글 총 갯수 조회
   */
  const getLrnBardTotAmt = () => {
    fetch('/api/learn/getLearnAmt')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setTotAmt(data[0].totAmt);
        }
      })
  }

  // ======================== 이벤트 선언 ========================


  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole && userRole.indexOf('ADMIN') > -1 ? true : false);

    // 게시글 총 갯수 조회
    getLrnBardTotAmt();
  }, [])


  return (
    <div className={styles.container}>
      {
        isAdmin
          ? <button type="button" className={styles.goEditBtn}>
            <Link href={'/learn/write'}>글쓰기</Link>
          </button>
          : null
      }

      <InfiniteScroll
        pageStart={0}
        loadMore={getLrnBard}
        hasMore={learnCardList.length !== totAmt}
        className={styles.cardList}
      >
        {
          learnCardList.map(item => (
            <LearnCard
              key={item.lrnBardSeq}
              lrnBardSeq={item.lrnBardSeq}
              lrnBardTitl={item.lrnBardTitl}
              lrnBardSubTitl={item.lrnBardSubTitl}
              lrnBardThumPath={item.lrnBardThumPath}
              regDt={item.regDt}
            />
          ))
        }
      </InfiniteScroll>

      <button
        type="button"
        className={styles.moveUpBtn}
        onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }) }}
      >🔝</button>
    </div>
  )
}
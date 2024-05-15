"use client";

import styles from './components/list.module.scss';
import DiaryCard from "./components/DiaryCard";
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ListItemType {
  recSeq: string;
  excRatVal: string;
  intrRatVal: string;
  stcPricVal: string;
  oilPricVal: string;
  regDt: string;
}

/**
 * 다이어리 리스트 페이지
 * 
 * @author yjjeon 
 * @returns 
 */
export default function DiaryList() {
  // ======================== 변수 선언 ========================
  const [listData, setListData] = useState<ListItemType[]>();

  // ======================== 함수 선언 ========================

  /**
   * 다이어리 리스트 조회
   */
  const getListData = (userSeq: string) => {
    fetch(`/api/diary/getDiaryList?userSeq=${userSeq}`)
      .then(res => res.json())
      .then(data => setListData(data));
  }

  // ======================== 이벤트 선언 ========================


  useEffect(() => {
    // 로그인 데이터 확인
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      getListData(accessToken);
    } else {
      alert('로그인 후 이용 가능합니다.');
      window.location.href = '/login';
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.diaryGuide}>
        <button type='button'>
          <Link href={'/howtouse'}>가이드 보러가기</Link>
        </button>
        <button type='button'>
          <Link href={'/diary/record'}>기록하기</Link>

        </button>
      </div>
      <div className={styles.cardWrapper}>
        {
          listData && listData.length > 0
            ? listData.map((item: ListItemType) => (
              <DiaryCard
                key={item.recSeq}
                seq={item.recSeq}
                date={item.regDt}
                excRattVal={item.excRatVal}
                intrRatVal={item.intrRatVal}
                stcPricVal={item.stcPricVal}
                oilPricVal={item.oilPricVal}
              />
            ))
            : null
        }
      </div>
    </div>
  )
}
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

export default function DiaryList() {
  // ======================== 변수 선언 ========================
  const [listData, setListData] = useState<ListItemType[]>();

  // ======================== 함수 선언 ========================

  /**
   * 다이어리 리스트 조회
   */
  const getListData = () => {
    fetch('/api/diary/getDiaryList')
      .then(res => res.json())
      .then(data => setListData(data));
  }

  // ======================== 이벤트 선언 ========================


  useEffect(() => {
    getListData();
  }, [])

  return (
    <div className={styles.container}>
      <h1>
        <Link href={'/'}>경제야 놀자</Link>
      </h1>

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

      <button type='button'>
        <Link href={'/diary/record'}>기록하기</Link>
      </button>
    </div>
  )
}
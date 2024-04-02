"use client";

import styles from './components/list.module.scss';
import DiaryCard from "./components/DiaryCard";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cookies } from 'next/headers';

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
 * @returns 
 * @author yjjeon
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

  /**
   * 로그아웃 버튼 클릭 이벤트
   */
  const logoutOnClick = () => {
    // 로그아웃 -> 첫 페이지로 이동 + localStorage 로그인정보 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  }


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
      <div className={styles.diaryListHeader}>
        <h1>
          <Link href={'/'}>경제야 놀자</Link>
        </h1>
        <button onClick={logoutOnClick}>
          로그아웃
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

      <button type='button'>
        <Link href={'/diary/record'}>기록하기</Link>
      </button>
    </div>
  )
}
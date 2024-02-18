"use client";

import { useRouter } from 'next/navigation';
import styles from './card.module.scss';

interface DiaryCardType {
  seq: string;
  date: string;
  excRattVal: string;
  intrRatVal: string;
  stcPricVal: string;
  oilPricVal: string;
}

export default function DiaryCard({ seq, date, excRattVal, intrRatVal, stcPricVal, oilPricVal }: DiaryCardType) {
  const router = useRouter();

  const clickDiaryItem = () => {
    const dateArr = date.substring(0, 10).split('.');
    const dateParams = dateArr[0] + dateArr[1] + dateArr[2];
    console.log(dateParams)

    router.push(`/diary/${dateParams}`)
  }

  return (
    <div className={styles.container} onClick={clickDiaryItem}>
      <h3>{date}</h3>
      <p>
        <span>환율</span>
        {excRattVal}
      </p>
      <p>
        <span>금리</span>
        {intrRatVal}
      </p>
      <p>
        <span>주가</span>
        {stcPricVal}
      </p>
      <p>
        <span>유가</span>
        {oilPricVal}
      </p>
    </div>
  )
}
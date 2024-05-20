"use client";

import { useEffect, useState } from 'react';
import styles from '../components/learnDetail.module.scss';
import Link from 'next/link';

type LearnParamsType = {
  params: { id: string };
}
export type LrnDetailDtoType = {
  lrnBardSeq?: string;
  lrnBardTitl?: string;
  lrnBardSubTitl?: string;
  lrnBardCont?: string;
  lrnThumFileInfo?: File;
  lrnBardThumPath?: string;
  regDt?: string;
  regSeq?: string;
  updDt?: string;
  updSeq?: string;
}

/**
 * 학습 게시물 상세페이지
 * 
 * @author yjjeon
 * @return
 */
export default function LearnDetail({ params: { id } }: LearnParamsType) {
  // ======================== 변수 선언 ========================
  const [lrnDetailDto, setLrnDetailDto] = useState<LrnDetailDtoType>();

  // ======================== 함수 선언 ========================
  const getLrnDetail = (seq: string) => {
    fetch('/api/learn/getLearnItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lrnBardSeq: seq
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setLrnDetailDto(data[0]);
        }
      })
  }

  // ======================== 이벤트 선언 ========================
  useEffect(() => {
    getLrnDetail(id);
  }, [])

  return (
    <div className={styles.container}>
      <button type='button' className={styles.backBtn}>
        <Link href={'/learn'}>&lt; 목록으로</Link>
      </button>
      <h2>{lrnDetailDto?.lrnBardTitl}</h2>
      <p className={styles.subTitl}>
        {lrnDetailDto?.lrnBardSubTitl}
      </p>
      <span className={styles.regDt}>{lrnDetailDto?.regDt}</span>

      <div className={styles.conts}>
        <img src={lrnDetailDto?.lrnBardThumPath} alt="썸네일 이미지" />
        <p>{lrnDetailDto?.lrnBardCont}</p>
      </div>
    </div>
  )
}
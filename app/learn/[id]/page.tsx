"use client";

import styles from '../components/learnDetail.module.scss';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [lrnDetailDto, setLrnDetailDto] = useState<LrnDetailDtoType>({});

  const router = useRouter();

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

  /**
   * 삭제 버튼 클릭 이벤트
   */
  const delBtnClickHandler = () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      fetch('/api/learn/delLearnItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lrnBardSeq: id
        })
      })
        .then(res => res.json())
        .then((data) => {
          alert(data.message);
          router.push('/learn');
        })
    }
  }

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole && userRole.indexOf('ADMIN') > -1 ? true : false);

    getLrnDetail(id);
  }, [])

  return (
    <div className={styles.container}>
      <button type='button' className={styles.backBtn}>
        <Link href={'/learn'}>&lt; 목록으로</Link>
      </button>
      {
        isAdmin
          ? <div className={styles.btnGroup}>
            <button type='button'>
              <Link href={'/learn/write?mode=modi'}>수정</Link>
            </button>
            <button type='button' onClick={delBtnClickHandler}>삭제</button>
          </div>
          : null
      }
      <h2>{lrnDetailDto.lrnBardTitl}</h2>
      <p className={styles.subTitl}>
        {lrnDetailDto.lrnBardSubTitl}
      </p>
      <span className={styles.regDt}>{lrnDetailDto.regDt}</span>

      <div className={styles.conts}>
        {
          lrnDetailDto.lrnBardThumPath
            ? <Image
              src={require(`/app/server/images/${lrnDetailDto.lrnBardThumPath}`)}
              alt='thumbnail image'
              width={258}
              height={221}
            />
            : null
        }
        <pre>{lrnDetailDto.lrnBardCont}</pre>
      </div>
    </div>
  )
}
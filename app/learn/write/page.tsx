"use client";

import { useEffect, useState } from 'react';
import styles from '../components/write.module.scss';
import Link from 'next/link';

/**
 * 게시글 작성 화면
 * 
 * @author yjjeon
 * @returns 
 */
export default function Write() {
  // ======================== 변수 선언 ========================
  const [isAddmode, setIsAddMode] = useState<boolean>(true);

  // ======================== 함수 선언 ========================

  // ======================== 이벤트 선언 ========================

  useEffect(() => {

  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.editorWrapper}>
        <label>제목</label>
        <input
          type="text"
          placeholder='제목을 입력해주세요'
        />
        <label>작성일</label>
        <input
          type="date"
        />
        <textarea
          placeholder='내용을 입력해주세요'
        />
        <div className={styles.buttonWrapper}>
          <button type='button' className={styles.backBtn}>
            <Link href={'/learn'}>목록으로</Link>
          </button>

          <div>
            {
              isAddmode
                ? <button type='button'>작성</button>
                : <>
                  <button type='button'>수정</button>
                  <button type='button' className={styles.deleteBtn}>삭제</button>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
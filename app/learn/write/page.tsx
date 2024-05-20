"use client";

import { useEffect, useState } from 'react';
import styles from '../components/write.module.scss';
import Link from 'next/link';
import { LrnDetailDtoType } from '../[id]/page';
import { useRouter } from 'next/navigation';

/**
 * 게시글 작성 화면
 * 
 * @author yjjeon
 * @returns 
 */
export default function Write() {
  // ======================== 변수 선언 ========================
  const [isAddmode, setIsAddMode] = useState<boolean>(true);
  const [lrnDetailDto, setLrnDetailDto] = useState<LrnDetailDtoType>({});

  const router = useRouter();

  // ======================== 함수 선언 ========================

  /**
   * input change 이벤트
   * @param e 
   */
  const inptChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLrnDetailDto({ ...lrnDetailDto, [e.target.name]: e.target.value });
  }

  /**
   * file input change 이벤트
   * @param e 
   */
  const thumbFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLrnDetailDto({ ...lrnDetailDto, lrnThumFileInfo: e.target.files[0] });
    }
  }

  /**
   * 작성 버튼 클릭 이벤트
   */
  const submitBtnClickHandler = () => {
    const userSeq = localStorage.getItem('accessToken');

    // formData로 전송
    const formData = new FormData();
    formData.append('lrnBardTitl', lrnDetailDto.lrnBardTitl ? lrnDetailDto.lrnBardTitl : '');
    formData.append('lrnBardSubTitl', lrnDetailDto.lrnBardSubTitl ? lrnDetailDto.lrnBardSubTitl : '');
    formData.append('lrnBardCont', lrnDetailDto.lrnBardCont ? lrnDetailDto.lrnBardCont : '');
    formData.append('lrnThumImgfile', lrnDetailDto.lrnThumFileInfo ? lrnDetailDto.lrnThumFileInfo : '');
    formData.append('regSeq', userSeq && userSeq.length > 0 ? userSeq : '');

    fetch('/api/learn/insLearnItem', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Success") {
          alert('게시글이 등록되었습니다.');
          router.push('/learn');
        } else {
          alert('등록에 실패하였습니다. 잠시 후 다시 시도해주세요.');
        }
      })
  }

  // ======================== 이벤트 선언 ========================


  return (
    <div className={styles.container}>
      <div className={styles.editorWrapper}>
        <label>제목</label>
        <input
          type="text"
          name="lrnBardTitl"
          placeholder='제목을 입력해주세요'
          onChange={inptChangeHandler}
        />
        <label>부제목</label>
        <input
          type="text"
          name='lrnBardSubTitl'
          placeholder='제목을 입력해주세요'
          onChange={inptChangeHandler}
        />
        <label>썸네일</label>
        <input
          type='file'
          name='lrnBardThumPath'
          onChange={thumbFileChangeHandler}
        />
        <textarea
          placeholder='내용을 입력해주세요'
          name='lrnBardCont'
          onChange={inptChangeHandler}
        />
        <div className={styles.buttonWrapper}>
          <button type='button' className={styles.backBtn}>
            <Link href={'/learn'}>목록으로</Link>
          </button>

          <div>
            {
              isAddmode
                ? <button type='button' onClick={submitBtnClickHandler}>작성</button>
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
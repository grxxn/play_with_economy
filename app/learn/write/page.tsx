"use client";

import { useEffect, useState } from 'react';
import styles from '../components/write.module.scss';
import Link from 'next/link';
import { LrnDetailDtoType } from '../[id]/page';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * 게시글 작성 화면
 * 
 * @author yjjeon
 * @returns 
 */
export default function Write() {
  // ======================== 변수 선언 ========================
  const [isAddmode, setIsAddMode] = useState<boolean>(true);
  const [isNewThum, setIsNewThum] = useState<boolean>(false);
  const [lrnDetailDto, setLrnDetailDto] = useState<LrnDetailDtoType>({});
  const [newThumImgNm, setNewThumImgNm] = useState<string>('');

  const router = useRouter();
  const urlParams = useSearchParams();

  // ======================== 함수 선언 ========================

  /**
   * 수정모드에서 아이템 데이터 조회
   */
  const getLearnItemInfo = () => {
    const seq = urlParams.get('seq');

    if (seq) {
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
          data[0].lrnBardSeq = seq;
          setLrnDetailDto(data[0]);
        })
    } else {
      alert('ERR C001: 데이터 조회 실패. 잠시 후 다시 시도해주세요.');
      router.push(`/learn`);
    }
  }


  // ======================== 이벤트 선언 ========================

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

  /**
   * 수정 버튼 클릭 이벤트
   */
  const modiBtnClickHandler = () => {
    const formData = new FormData();
    const userSeq = localStorage.getItem('accessToken');

    formData.append('lrnBardSeq', lrnDetailDto.lrnBardSeq ? lrnDetailDto.lrnBardSeq : '');
    formData.append('lrnBardTitl', lrnDetailDto.lrnBardTitl ? lrnDetailDto.lrnBardTitl : '');
    formData.append('lrnBardSubTitl', lrnDetailDto.lrnBardSubTitl ? lrnDetailDto.lrnBardSubTitl : '');
    formData.append('lrnBardCont', lrnDetailDto.lrnBardCont ? lrnDetailDto.lrnBardCont : '');
    formData.append('lrnBardThumPath', lrnDetailDto.lrnBardThumPath ? lrnDetailDto.lrnBardThumPath : '');
    formData.append('lrnThumImgfile', lrnDetailDto.lrnThumFileInfo ? lrnDetailDto.lrnThumFileInfo : '');
    formData.append('updSeq', userSeq && userSeq.length > 0 ? userSeq : '')


    fetch('/api/learn/updLearnItem', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.statusText === 'Success') {
          alert('게시글이 수정되었습니다.');
          router.push(`/learn/${lrnDetailDto.lrnBardSeq}`);
        } else {
          alert(data.message);
        }
      })
  }

  /**
   * 새로운 썸네일 등록 버튼 클릭 이벤트
   */
  const setNewThumChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      setNewThumImgNm(e.target.files[0].name);
      setLrnDetailDto({ ...lrnDetailDto, lrnThumFileInfo: e.target.files[0], lrnBardThumPath: '' });
    }
  }

  useEffect(() => {
    setIsAddMode(urlParams.get('mode') === 'add')
  }, [])

  useEffect(() => {
    if (!isAddmode) {
      // 수정모드
      getLearnItemInfo();
    }
  }, [isAddmode])

  return (
    <div className={styles.container}>
      <div className={styles.editorWrapper}>
        <label>제목</label>
        <input
          type="text"
          name="lrnBardTitl"
          placeholder='제목을 입력해주세요'
          value={lrnDetailDto.lrnBardTitl || ''}
          onChange={inptChangeHandler}
        />
        <label>부제목</label>
        <input
          type="text"
          name='lrnBardSubTitl'
          placeholder='제목을 입력해주세요'
          value={lrnDetailDto.lrnBardSubTitl || ''}
          onChange={inptChangeHandler}
        />
        <label>썸네일</label>
        {
          isAddmode
            ? <input
              type='file'
              name='lrnThumFileInfo'
              onChange={thumbFileChangeHandler}
            />
            : <div className={styles.newThumBox}>
              <label htmlFor='newThumPath' onClick={() => setIsNewThum(true)}>새로운 썸네일 등록하기</label>
              <input
                type='file'
                id='newThumPath'
                name='lrnThumFileInfo'
                onChange={setNewThumChangeHandler}
              />
              {
                !isNewThum
                  ? <span>({lrnDetailDto.lrnBardThumPath})</span>
                  : <span>({newThumImgNm})</span>
              }
            </div>
        }
        <textarea
          placeholder='내용을 입력해주세요'
          name='lrnBardCont'
          value={lrnDetailDto.lrnBardCont || ''}
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
                : <button type='button' onClick={modiBtnClickHandler}>수정</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
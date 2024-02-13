interface DiaryType {
  params: { id: string }
}

"use client";

import { useEffect, useState } from 'react';
import styles from '../components/record.module.scss';
import Link from "next/link";

interface diaryDtoInterface {
  date?: string;
  excRatNat?: string;
  excRattVal?: string;
  excRatFlu?: string;
  excRatMemo?: string;
  intrRatSrt?: string;
  intrRatVal?: string;
  intrRatFlu?: string;
  intrRatMemo?: string;
  stcPricSrt?: string;
  stcPricVal?: string;
  stcPricFlu?: string;
  stcPricMemo?: string;
  oilPricSrt?: string;
  oilPricVal?: string;
  oilPricFlu?: string;
  oilPricMemo?: string;
  artcAddrArr?: string[];
  recGenrRevw?: string;
}

/**
 * 기록 상세 페이지
 * 
 * @author yjjeon
 * @returns 
 */
export default function Record({ params: { id } }: DiaryType) {
  // ======================== 변수 선언 ========================

  const [isShowAddArtc, setIsShowAddArtc] = useState<boolean>(false);
  const [diaryDto, setDiaryDto] = useState<diaryDtoInterface>({});
  const [artcItemVal, setArtcItemVal] = useState<string>('');


  // ======================== 함수 선언 ========================

  /**
   * submit 전 validation 함수
   */
  const validationDiary = () => {
    // 필수 입력
    // 환율, 금리, 주가, 유가 -> 메모 부분 제외하고 모두 필수
    // 기사 필수 아님, 총평 필수

    if (!diaryDto.excRatNat || diaryDto.excRatNat.length === 0) {
      alert('환율 국가를 입력해 주세요.');
      return false;
    } else if (!diaryDto.excRattVal || diaryDto.excRattVal.length === 0) {
      alert('환율 수치를 입력해 주세요.');
      return false;
    } else if (!diaryDto.excRatFlu || diaryDto.excRatFlu.length === 0) {
      alert('환율 등락을 입력해 주세요.');
      return false;
    } else if (!diaryDto.intrRatSrt || diaryDto.intrRatSrt.length === 0) {
      alert('금리 종류를 입력해 주세요.');
      return false;
    } else if (!diaryDto.intrRatVal || diaryDto.intrRatVal.length === 0) {
      alert('금리 수치를 입력해 주세요.');
      return false;
    } else if (!diaryDto.intrRatFlu || diaryDto.intrRatFlu.length === 0) {
      alert('금리 등락을 입력해 주세요.');
      return false;
    } else if (!diaryDto.stcPricSrt || diaryDto.stcPricSrt.length === 0) {
      alert('주가 종류를 입력해 주세요.');
      return false;
    } else if (!diaryDto.stcPricVal || diaryDto.stcPricVal.length === 0) {
      alert('주가 수치를 입력해 주세요.');
      return false;
    } else if (!diaryDto.stcPricFlu || diaryDto.stcPricFlu.length === 0) {
      alert('주가 등락을 입력해 주세요.');
      return false;
    } else if (!diaryDto.oilPricSrt || diaryDto.oilPricSrt.length === 0) {
      alert('유가 종류를 입력해 주세요.');
      return false;
    } else if (!diaryDto.oilPricVal || diaryDto.oilPricVal.length === 0) {
      alert('유가 수치를 입력해 주세요.');
      return false;
    } else if (!diaryDto.oilPricFlu || diaryDto.oilPricFlu.length === 0) {
      alert('유가 등락을 입력해 주세요.');
      return false;
    } else if (!diaryDto.recGenrRevw || diaryDto.recGenrRevw.length === 0) {
      alert('총평을 입력해 주세요.');
      return false;
    } else {
      return true;
    }
  }


  // ======================== 이벤트 선언 ========================

  /**
   * input change 이벤트
   */
  const inptOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'artcAddrArr') {
      console.log(diaryDto.artcAddrArr)
    } else {
      setDiaryDto({ ...diaryDto, [e.target.name]: e.target.value });
    }
  }

  /**
   * 기사 추가하기 버튼 클릭 이벤트
   */
  const addArticleOnClick = () => {
    if (artcItemVal.length > 0) {
      const artcAddrCopyArr = diaryDto.artcAddrArr ? [...diaryDto.artcAddrArr] : [];
      artcAddrCopyArr.push(artcItemVal);
      setDiaryDto({ ...diaryDto, artcAddrArr: artcAddrCopyArr });
      // 초기화
      setArtcItemVal('');
      setIsShowAddArtc(false);
    }
  }

  /**
   * 기사 삭제 버튼 클릭 이벤트
   * @param artcAddr 
   * @param idx 
   */
  const deleteArtcOnClick = (artcAddr: string, idx: number) => {
    if (diaryDto.artcAddrArr?.indexOf(artcAddr) === idx) {
      const artcAddrCopyArr = [...diaryDto.artcAddrArr];
      artcAddrCopyArr.splice(idx, 1);
      setDiaryDto({ ...diaryDto, artcAddrArr: artcAddrCopyArr });
    }
  }

  /**
   * 다이어리 기록하기 버튼 클릭 이벤트
   */
  const submitDiaryOnClick = () => {
    if (validationDiary()) {
      console.log(diaryDto);
    }
  }

  return (
    <div className={styles.container}>
      <h1>
        {id}
      </h1>
      <div className={styles.ecnmValWrapper}>
        <div className={styles.ecnmValBox}>
          <h3>환율</h3>
          <div>
            <label>국가</label>
            <input type="text" name='excRatNat' onChange={inptOnChange} />
            <label>수치</label>
            <input type="text" name='excRatVal' onChange={inptOnChange} />
            <label>등락</label>
            <input type="text" name='excRatFlu' onChange={inptOnChange} />
          </div>
          <textarea name='excRatMemo' onChange={inptOnChange} />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>금리</h3>
          <div>
            <label>종류</label>
            <input type="text" name='intrRatSrt' onChange={inptOnChange} />
            <label>수치</label>
            <input type="text" name='intrRatVal' onChange={inptOnChange} />
            <label>등락</label>
            <input type="text" name='intrRatFlu' onChange={inptOnChange} />
          </div>
          <textarea name='intrRatMemo' />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>주가</h3>
          <div>
            <label>종류</label>
            <input type="text" name='stcPricSrt' onChange={inptOnChange} />
            <label>수치</label>
            <input type="text" name='stcPricVal' onChange={inptOnChange} />
            <label>등락</label>
            <input type="text" name='stcPricFlu' onChange={inptOnChange} />
          </div>
          <textarea name='srcPricMemo' onChange={inptOnChange} />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>유가</h3>
          <div>
            <label>종류</label>
            <input type="text" name='oilPricSrt' onChange={inptOnChange} />
            <label>수치</label>
            <input type="text" name='oilPricVal' onChange={inptOnChange} />
            <label>등락</label>
            <input type="text" name='oilPricFlu' onChange={inptOnChange} />
          </div>
          <textarea name='oilPricMemo' onChange={inptOnChange} />
        </div>
      </div>
      <div className={styles.articleWrapper}>
        <div>
          <h3>오늘의 기사</h3>
          {
            isShowAddArtc
              ? <div className={styles.artcInptWrappers}>
                <input
                  type="text"
                  name='artcAddrArr'
                  placeholder='기사 주소를 입력해 주세요.'
                  onChange={(e) => setArtcItemVal(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addArticleOnClick() }}
                />
                <button type="button" onClick={addArticleOnClick}>추가하기</button>
              </div>
              : <button type="button" onClick={() => setIsShowAddArtc(true)}>기사 추가</button>
          }
        </div>
        <ul>
          {
            diaryDto.artcAddrArr
              ? diaryDto.artcAddrArr.map((item: string, idx: number) => (
                <li key={idx}>
                  <div className={styles.artcItem}>
                    <Link href={item} target='_blank'>{item}</Link>
                    <button type="button" onClick={() => deleteArtcOnClick(item, idx)} >삭제</button>
                  </div>
                </li>
              ))
              : null
          }
        </ul>
      </div>
      <div className={styles.genrRevwWrapper}>
        <h3>오늘의 경제 총평 및 정리</h3>
        <textarea name='recGenrRevw' onChange={inptOnChange} />
      </div>
      <div className={styles.btnWrapper}>
        <button type="button">
          <Link href={'/diary'}>목록으로</Link>
        </button>
        <button type="button" onClick={submitDiaryOnClick}>기록하기</button>
      </div>
    </div >
  )
}
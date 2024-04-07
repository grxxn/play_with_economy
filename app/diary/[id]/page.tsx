"use client";

interface DiaryType {
  params: { id: string }
}

import { useEffect, useState } from 'react';
import styles from '../components/record.module.scss';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export interface DiaryDtoInterface {
  date?: string;
  excRatNat?: string;
  excRatVal?: string;
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
  artcAddrArr?: DiaryArtcArrType[];
  recGenrRevw?: string;
}

export type DiaryArtcArrType = {
  artcSeq: string
  artcAddr: string
  useYn: string
}

/**
 * 기록 상세 페이지
 * 
 * @author yjjeon
 * @returns 
 */
export default function Record({ params: { id } }: DiaryType) {
  // ======================== 변수 선언 ========================

  const [mode, setMode] = useState<string>('');
  const [diarySeq, setDiarySeq] = useState<string>('');
  const [recordDt, setRecordDt] = useState<string>('');
  const [isShowAddArtc, setIsShowAddArtc] = useState<boolean>(false);
  const [diaryDto, setDiaryDto] = useState<DiaryDtoInterface>({});
  const [artcItemVal, setArtcItemVal] = useState<string>('');

  const router = useRouter();

  // ======================== 함수 선언 ========================

  /**
   * seq가 있을 경우 상세 조회
   * @param recSeq 
   */
  const getDiaryItem = (recSeq: string) => {
    fetch(`/api/diary/getDiaryItem?recSeq=${recSeq}`)
      .then(res => res.json())
      .then(data => {
        if (data.artcArr.length > 0) data.diaryData[0].artcAddrArr = data.artcArr;
        setDiaryDto(data.diaryData[0]);
        setRecordDt(data.diaryData[0].regDt);
      });
  }

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
    } else if (!diaryDto.excRatVal || diaryDto.excRatVal.length === 0) {
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
    if (e.target.name !== 'artcAddrArr') {
      setDiaryDto({ ...diaryDto, [e.target.name]: e.target.value });
    }
  }

  /**
   * 기사 추가하기 버튼 클릭 이벤트
   */
  const addArticleOnClick = () => {
    if (artcItemVal.length > 0) {
      const artcAddrCopyArr = diaryDto.artcAddrArr ? [...diaryDto.artcAddrArr] : [];
      artcAddrCopyArr.push({
        artcSeq: '',
        artcAddr: artcItemVal,
        useYn: 'Y'
      });
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
  const deleteArtcOnClick = (artcAddr: string, artcSeq: string) => {
    if (diaryDto.artcAddrArr) {
      for (let i = 0; i < diaryDto.artcAddrArr.length; i++) {
        if (diaryDto.artcAddrArr[i].artcSeq === artcSeq) {
          const artcAddrCopyArr = [...diaryDto.artcAddrArr];
          artcAddrCopyArr[i].useYn = 'N';
          setDiaryDto({ ...diaryDto, artcAddrArr: artcAddrCopyArr });

          break;
        }
      }
    }
  }

  /**
   * 다이어리 기록하기 버튼 클릭 이벤트 (등록)
   */
  const submitDiaryOnClick = () => {
    if (validationDiary()) {
      fetch('/api/diary/setDiaryItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diaryDto),
      })
        .then(() => {
          alert('등록이 완료되었습니다');
          router.push('/diary');
        })
        .catch(error => {
          console.error(error);
          alert('등록이 실패하였습니다. 잠시 후 다시 시도해주세요.');
        });
    }
  }

  /**
   * 다이어리 수정하기 버튼 클릭 이벤트 (수정)
   */
  const updateDiaryOnclick = () => {
    if (window.confirm('수정하시겠습니까?')) {
      fetch('/api/diary/updDiaryItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diaryDto: diaryDto,
          recSeq: diarySeq
        }),
      })
        .then(() => {
          alert('수정이 완료되었습니다.');
        })
    }
  }

  /**
   * 다이어리 삭제하기 버튼 클릭 이벤트 (삭제)
   */
  const deleteDiaryOnclick = () => {
    if (window.confirm('삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.')) {
      fetch('/api/diary/delDiaryItem', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recSeq: diarySeq,
        }),
      })
        .then(() => {
          alert('삭제가 완료되었습니다');
          router.push('/diary');
        })
    }
  }


  useEffect(() => {
    setDiaryDto({});

    // Diary Date 및 데이터 설정
    if (id === 'record') {
      // 등록 모드
      setMode('add');

      const date = new Date();
      const Year = date.getFullYear();
      const Month = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1);
      const Day = date.getDate();
      const Today = Year + '.' + Month + '.' + Day;

      setRecordDt(Today);
      setDiaryDto({ ...diaryDto, date: Today });
    } else {
      setDiarySeq(id);
      // 수정, 삭제 모드
      if (id.length > 0) {
        setMode('modi');
        // seq 데이터 조회
        getDiaryItem(id);
      } else {
        alert('[err:001] 잠시 후 다시 시도해 주세요.');
      }
    }
  }, [id])


  return (
    <div className={styles.container}>
      <h1>
        {recordDt}
      </h1>
      <div className={styles.ecnmValWrapper}>
        <div className={styles.ecnmValBox}>
          <h3>환율</h3>
          <div>
            <label>국가</label>
            <input type="text" name='excRatNat' onChange={inptOnChange} value={diaryDto.excRatNat ? diaryDto.excRatNat : ""} />
            <label>수치</label>
            <input type="text" name='excRatVal' onChange={inptOnChange} value={diaryDto.excRatVal ? diaryDto.excRatVal : ""} />
            <label>등락</label>
            <input type="text" name='excRatFlu' onChange={inptOnChange} value={diaryDto.excRatFlu ? diaryDto.excRatFlu : ""} />
          </div>
          <textarea name='excRatMemo' onChange={inptOnChange} value={diaryDto.excRatMemo ? diaryDto.excRatMemo : ""} />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>금리</h3>
          <div>
            <label>종류</label>
            <input type="text" name='intrRatSrt' onChange={inptOnChange} value={diaryDto.intrRatSrt ? diaryDto.intrRatSrt : ""} />
            <label>수치</label>
            <input type="text" name='intrRatVal' onChange={inptOnChange} value={diaryDto.intrRatVal ? diaryDto.intrRatVal : ""} />
            <label>등락</label>
            <input type="text" name='intrRatFlu' onChange={inptOnChange} value={diaryDto.intrRatFlu ? diaryDto.intrRatFlu : ""} />
          </div>
          <textarea name='intrRatMemo' onChange={inptOnChange} value={diaryDto.intrRatMemo ? diaryDto.intrRatMemo : ""} />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>주가</h3>
          <div>
            <label>종류</label>
            <input type="text" name='stcPricSrt' onChange={inptOnChange} value={diaryDto.stcPricSrt ? diaryDto.stcPricSrt : ""} />
            <label>수치</label>
            <input type="text" name='stcPricVal' onChange={inptOnChange} value={diaryDto.stcPricVal ? diaryDto.stcPricVal : ""} />
            <label>등락</label>
            <input type="text" name='stcPricFlu' onChange={inptOnChange} value={diaryDto.stcPricFlu ? diaryDto.stcPricFlu : ""} />
          </div>
          <textarea name='stcPricMemo' onChange={inptOnChange} value={diaryDto.stcPricMemo ? diaryDto.stcPricMemo : ""} />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>유가</h3>
          <div>
            <label>종류</label>
            <input type="text" name='oilPricSrt' onChange={inptOnChange} value={diaryDto.oilPricSrt ? diaryDto.oilPricSrt : ""} />
            <label>수치</label>
            <input type="text" name='oilPricVal' onChange={inptOnChange} value={diaryDto.oilPricVal ? diaryDto.oilPricVal : ""} />
            <label>등락</label>
            <input type="text" name='oilPricFlu' onChange={inptOnChange} value={diaryDto.oilPricFlu ? diaryDto.oilPricFlu : ""} />
          </div>
          <textarea name='oilPricMemo' onChange={inptOnChange} value={diaryDto.oilPricMemo ? diaryDto.oilPricMemo : ""} />
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
              ? diaryDto.artcAddrArr.map((item: DiaryArtcArrType, idx: number) => {
                if (item.useYn !== 'N') {
                  return <li key={item.artcSeq + idx}>
                    <div className={styles.artcItem}>
                      <Link href={item.artcAddr} target='_blank'>{item.artcAddr}</Link>
                      <button type="button" onClick={() => deleteArtcOnClick(item.artcAddr, item.artcSeq)} >삭제</button>
                    </div>
                  </li>
                }
              })
              : null
          }
        </ul>
      </div>
      <div className={styles.genrRevwWrapper}>
        <h3>오늘의 경제 총평 및 정리</h3>
        <textarea name='recGenrRevw' onChange={inptOnChange} value={diaryDto.recGenrRevw ? diaryDto.recGenrRevw : ""} />
      </div>
      <div className={styles.btnWrapper}>
        <button type="button">
          <Link href={'/diary'}>목록으로</Link>
        </button>
        {
          mode === 'add'
            ? <button type="button" onClick={submitDiaryOnClick}>기록하기</button>
            : <div>
              <button type="button" onClick={deleteDiaryOnclick}>삭제하기</button>
              <button type="button" onClick={updateDiaryOnclick}>수정하기</button>
            </div>
        }
      </div>
    </div >
  )
}
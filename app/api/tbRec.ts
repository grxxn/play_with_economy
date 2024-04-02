import { DiaryDtoInterface } from './../diary/[id]/page';
import { selectSQL } from "../_lib/db";

export interface TbRecInterface {
  seq: string;
  excRatNat: string;
  excRatVal: string;
  excRatFlu: string;
  excRatMemo: string;
  intrRatSrt: string;
  intrRatVal: string;
  intrRatFlu: string;
  intrRatMemo: string;
  stcPricSrt: string;
  stcPricVal: string;
  stcPricFlu: string;
  stcPricMemo: string;
  oilPricSrt: string;
  oliPricVal: string;
  oilPricFlu: string;
  oilPricMemo: string;
  recGenrRevw: string;
  regDt: string;
  modDt: string;
}


/**
 * 다이어리 리스트 조회
 * @returns 
 */
export const getDiaryList = (userSeq: string) => {
  const sql = `
    SELECT REC_SEQ			as recSeq
        , EXC_RAT_VAL 	as excRatVal
        , INTR_RAT_VAL	as intrRatVal
        , STC_PRIC_VAL	as stcPricVal
        , OIL_PRIC_VAL	as oilPricVal
        , DATE_FORMAT(REG_DT, "%Y.%m.%d")		as regDt
    FROM TB_REC
    WHERE USE_YN = 'Y'
    AND USER_SEQ = '${userSeq}'
    ORDER BY REC_SEQ DESC;
  `

  return selectSQL(sql);
}

/**
 * 다이어리 아이템 조회
 * @param recSeq 
 */
export const getDiaryItem = (recSeq: string) => {
  const sql = `
    SELECT EXC_RAT_NAT		as excRatNat
          , EXC_RAT_VAL	  as excRatVal
          , EXC_RAT_FLU	  as excRatFlu
          , EXC_RAT_MEMO	as excRatMemo
          , INTR_RAT_SRT	as intrRatSrt
          , INTR_RAT_VAL	as intrRatVal
          , INTR_RAT_FLU	as intrRatFlu
          , INTR_RAT_MEMO	as intrRatMemo
          , STC_PRIC_SRT	as stcPricSrt
          , STC_PRIC_VAL	as stcPricVal
          , STC_PRIC_FLU	as stcPricFlu
          , STC_PRIC_MEMO	as stcPricMemo
          , OIL_PRIC_SRT	as oilPricSrt
          , OIL_PRIC_VAL	as oilPricVal
          , OIL_PRIC_FLU	as oilPricFlu
          , OIL_PRIC_MEMO	as oilPricMemo
          , REC_GENR_REVW	as recGenrRevw
          , (SELECT GROUP_CONCAT(ARTC_ADDR) AS artcAddrs FROM TB_REC_ARTCS B WHERE B.REC_SEQ = A.REC_SEQ) as artcAddrArr
          , DATE_FORMAT(REG_DT, "%Y.%m.%d")  	as regDt
          , DATE_FORMAT(MOD_DT, "%Y.%m.%d")	  as modDt
    FROM TB_REC A
    WHERE REC_SEQ = ${recSeq};
  `

  return selectSQL(sql);
}

export const getArtcCnt = (recSeq: string) => {
  const sql = `
    SELECT COUNT(*) as cnt
    FROM TB_REC_ARTCS
    WHERE REC_SEQ = ${recSeq};
  `

  return selectSQL(sql);
}

/**
 * 다이어리 기사 조회
 * @param recSeq 
 * @returns 
 */
export const getArtcAddr = (recSeq: string) => {
  const sql = `
    SELECT  ARTC_SEQ
          , ARTC_ADDR
    FROM    TB_REC_ARTCS
    WHERE   REC_SEQ = ${recSeq};
  `;

  return selectSQL(sql);
}

/**
 * 다이어리 아이템 등록
 * @param params 
 */
export const insDiaryItem = (params: DiaryDtoInterface) => {
  const sql = `
    INSERT INTO TB_REC (
      EXC_RAT_NAT,
      EXC_RAT_VAL,
      EXC_RAT_FLU,
      EXC_RAT_MEMO,
      INTR_RAT_SRT,
      INTR_RAT_VAL,
      INTR_RAT_FLU,
      INTR_RAT_MEMO,
      STC_PRIC_SRT,
      STC_PRIC_VAL,
      STC_PRIC_FLU,
      STC_PRIC_MEMO,
      OIL_PRIC_SRT,
      OIL_PRIC_VAL,
      OIL_PRIC_FLU,
      OIL_PRIC_MEMO,
      REC_GENR_REVW,
      REG_DT
    ) VALUES (
      '${params.excRatNat}',
      '${params.excRatVal}',
      '${params.excRatFlu}',
      '${params.excRatMemo}',
      '${params.intrRatSrt}',
      '${params.intrRatVal}',
      '${params.intrRatFlu}',
      '${params.intrRatMemo}',
      '${params.stcPricSrt}',
      '${params.stcPricVal}',
      '${params.stcPricFlu}',
      '${params.stcPricMemo}',
      '${params.oilPricSrt}',
      '${params.oilPricVal}',
      '${params.oilPricFlu}',
      '${params.oilPricMemo}',
      '${params.recGenrRevw}',
      '${params.date}'
    )
  `

  return selectSQL(sql);
}

/**
 * 다이어리 기사 등록
 * @param artcAddr 
 * @returns 
 */
export const insArtcAddrs = (artcAddr: string) => {
  const sql = `
    INSERT INTO TB_REC_ARTCS (
      REC_SEQ,
      ARTC_ADDR,
      REB_DT
    ) VALUES (
      (SELECT REC_SEQ FROM TB_REC ORDER BY REC_SEQ DESC LIMIT 1),
      '${artcAddr}',
      CURRENT_TIMESTAMP
    )
  `;

  return selectSQL(sql);
}

/**
 * 다이어리 아이템 수정
 */
export const updateDiaryItem = (recSeq: string, params: DiaryDtoInterface) => {
  const sql = `
    UPDATE  TB_REC
    SET     EXC_RAT_NAT = '${params.excRatNat}',
            EXC_RAT_VAL = '${params.excRatVal}',
            EXC_RAT_FLU = '${params.excRatFlu}',
            EXC_RAT_MEMO = '${params.excRatMemo}',
            INTR_RAT_SRT = '${params.intrRatSrt}',
            INTR_RAT_VAL = '${params.intrRatVal}',
            INTR_RAT_FLU = '${params.intrRatFlu}',
            INTR_RAT_MEMO = '${params.excRatMemo}',
            STC_PRIC_SRT = '${params.stcPricSrt}',
            STC_PRIC_VAL = '${params.stcPricVal}',
            STC_PRIC_FLU = '${params.stcPricFlu}',
            STC_PRIC_MEMO = '${params.stcPricMemo}',
            OIL_PRIC_SRT = '${params.oilPricSrt}',
            OIL_PRIC_VAL = '${params.oilPricVal}',
            OIL_PRIC_FLU = '${params.oilPricFlu}',
            OIL_PRIC_MEMO = '${params.oilPricMemo}',
            REC_GENR_REVW = '${params.recGenrRevw}',
            MOD_DT = CURRENT_TIMESTAMP,
            USE_YN = 'Y'
    WHERE   REC_SEQ = ${recSeq}
  `;

  return selectSQL(sql);
}

export const updateAtrcAddrs = (recSeq: string, artcAddr: string) => {
  const sql = `
    UPDATE  TB_REC_ARTCS  
    SET     ARTC_ADDR = '${artcAddr}',
            MOD_DT = CURRENT_TIMESTAMP
    WHERE   REC_SEQ = ${recSeq}
  `;

  return selectSQL(sql);
}

/**
 * 다이어리 아이템 삭제
 */
export const deleteDiaryItem = (recSeq: string) => {
  const sql = `
    UPDATE  TB_REC
    SET     USE_YN = 'N'
    WHERE   REC_SEQ = ${recSeq}
  `;

  return selectSQL(sql);
}
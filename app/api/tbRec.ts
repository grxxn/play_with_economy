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
export const getDiaryList = () => {
  const sql = `
    SELECT REC_SEQ			as recSeq
        , EXC_RAT_VAL 	as excRatVal
        , INTR_RAT_VAL	as intrRatVal
        , STC_PRIC_VAL	as stcPricVal
        , OIL_PRIC_VAL	as oilPricVal
        , DATE_FORMAT(REG_DT, "%Y.%m.%d")		as regDt
    FROM TB_REC ORDER BY REC_SEQ DESC;
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

/**
 * 다이어리 아이템 등록
 * @param params 
 */
export const setDiaryItem = (params: TbRecInterface) => {
  const date = new Date();

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
      REG_DT,
      MOD_DT
    ) VALUES (
      ${params.excRatNat},
      ${params.excRatVal},
      ${params.excRatFlu},
      ${params.excRatMemo},
      ${params.intrRatSrt},
      ${params.intrRatVal},
      ${params.intrRatFlu},
      ${params.intrRatMemo},
      ${params.stcPricSrt},
      ${params.stcPricVal},
      ${params.stcPricFlu},
      ${params.stcPricMemo},
      ${params.oilPricSrt},
      ${params.oliPricVal},
      ${params.oilPricFlu},
      ${params.oilPricMemo},
      ${params.recGenrRevw},
      ${params.oilPricFlu},
      ${date},
      ${date},
    )
  `
}
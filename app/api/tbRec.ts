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

export const getDiaryItem = (recSeq: string) => {
  const sql = `
    SELECT * FROM TB_REC WHERE REC_SEQ = ${recSeq};
  `
}

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
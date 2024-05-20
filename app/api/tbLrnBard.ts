import { selectSQL } from "../_lib/db"
import { LrnDetailDtoType } from "../learn/[id]/page";

/**
 * Learn 게시판 리스트 조회
 * @returns 
 */
export const getLrnBardList = (currItemCnt: number) => {
  const sql = `
    SELECT LRN_BARD_SEQ			  as lrnBardSeq
        , LRN_BARD_TITL 	    as lrnBardTitl
        , LRN_BARD_SUB_TITL 	as lrnBardSubTitl
        , LRN_BARD_THUM_PATH   as lrnBardThumPath
        , DATE_FORMAT(REG_DT, "%Y.%m.%d")		as regDt
        , DATE_FORMAT(UPD_DT, "%Y.%m.%d")   as updDt
    FROM TB_LRN_BARD
    WHERE USE_YN = 'Y'
    ORDER BY LRN_BARD_SEQ DESC
    LIMIT ${currItemCnt}, 8;
  `;

  return selectSQL(sql);
}

/**
 * Learn 게시판 글 갯수 조회
 * @returns 
 */
export const getLrnBardTotAmt = () => {
  const sql = `
    SELECT COUNT(*) as totAmt
    FROM TB_LRN_BARD
    WHERE USE_YN = 'Y'
  `;

  return selectSQL(sql);
}

/**
 * Learn 게시글 상세 조회
 * @returns 
 */
export const getLrnDetail = (seq: string) => {
  const sql = `
    SELECT LRN_BARD_TITL          as lrnBardTitl
          , LRN_BARD_SUB_TITL     as lrnBardSubTitl
          , LRN_BARD_THUM_PATH    as lrnBardThumPath
          , LRN_BARD_CONT         as lrnBardCont
          , DATE_FORMAT(REG_DT, "%Y.%m.%d")    as regDt
          , DATE_FORMAT(UPD_DT, "%Y.%m.%d")    as updDt
    FROM TB_LRN_BARD
    WHERE LRN_BARD_SEQ = ${seq}
  `;

  return selectSQL(sql);
}

/**
 * Learn 게시글 최근 SEQ 조회
 * @returns 
 */
export const getLrnLatestSeq = () => {
  const sql = `
    SELECT (LRN_BARD_SEQ + 1) as latestSeq
    FROM TB_LRN_BARD
    ORDER BY LRN_BARD_SEQ DESC
    LIMIT 1
  `;

  return selectSQL(sql);
}

/**
 * Learn 게시글 등록
 * @param params 
 * @returns 
 */
export const insLrnItem = (params: LrnDetailDtoType) => {
  const sql = `
    INSERT INTO TB_LRN_BARD (
      LRN_BARD_TITL,
      LRN_BARD_SUB_TITL,
      LRN_BARD_CONT,
      LRN_BARD_THUM_PATH,
      REG_DT,
      REG_SEQ
    ) VALUES (
      '${params.lrnBardTitl}',
      '${params.lrnBardSubTitl}',
      '${params.lrnBardCont}',
      '${params.lrnBardThumPath}',
      CURRENT_TIMESTAMP,
      '${params.regSeq}'
    )
  `;

  return selectSQL(sql);
}
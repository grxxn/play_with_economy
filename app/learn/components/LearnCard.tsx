import Image from "next/image";
import styles from "./card.module.scss";
import learnCardImg from "/app/server/images/10_KakaoTalk_Photo_2024-05-18-15-45-22_001.jpeg";
import Link from "next/link";

export type LearnCardType = {
  lrnBardSeq: string
  lrnBardTitl: string
  lrnBardSubTitl: string
  lrnBardThumPath: string
  regDt: string
  updDt?: string
}

/**
 * 학습 카드 컴포넌트
 * 
 * @author yjjeon
 * @returns 
 */
export default function LearnCard({ lrnBardSeq, lrnBardTitl, lrnBardSubTitl, lrnBardThumPath, regDt }: LearnCardType) {
  // ======================== 변수 선언 ========================

  // ======================== 함수 선언 ========================

  // ======================== 이벤트 선언 ========================

  return (
    <Link className={styles.cardContainer} href={'/learn/' + lrnBardSeq}>
      <div className={styles.imgBox}>
        <Image src={require(`/app/server/images/${lrnBardThumPath}`)} alt="썸네일 이미지" width={258} height={221} />
      </div>
      <h3>{lrnBardTitl}</h3>
      <p>{lrnBardSubTitl}</p>
      <p>{regDt}</p>
    </Link>
  )
}
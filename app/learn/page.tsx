import Link from "next/link";
import LearnCard from "./components/LearnCard";
import styles from "./components/learn.module.scss";

/**
 * 학습 게시판
 * 
 * @author yjjeon
 * @returns 
 */
export default function LearnCardList() {
  // ======================== 변수 선언 ========================

  // ======================== 함수 선언 ========================

  // ======================== 이벤트 선언 ========================


  // 페이지를 하단까지 내리면 게시글을 더 로드!!

  return (
    <div className={styles.container}>
      <button type="button">
        <Link href={'/learn/write'}>글쓰기</Link>
      </button>

      <div className={styles.cardList}>
        <LearnCard />
        <LearnCard />
        <LearnCard />
        <LearnCard />
        <LearnCard />
        <LearnCard />
      </div>

    </div>
  )
}
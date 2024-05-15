import LearnCard from "./components/LearnCard";
import styles from "./components/learn.module.scss";

/**
 * 학습 게시판
 * 
 * @author yjjeon
 * @returns 
 */
export default function LearnCardList() {

  // 페이지를 하단까지 내리면 게시글을 더 로드!!

  return (
    <div className={styles.container}>

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
import styles from '../components/learnDetail.module.scss';

type LearnParamsType = {
  params: { id: string };
}
/**
 * 학습 게시물 상세페이지
 * 
 * @author yjjeon
 * @return
 */
export default function LearnDetail({ params: { id } }: LearnParamsType) {
  // ======================== 변수 선언 ========================

  // ======================== 함수 선언 ========================

  // ======================== 이벤트 선언 ========================

  return (
    <div className={styles.container}>
      Learn Number: {id}
    </div>
  )
}
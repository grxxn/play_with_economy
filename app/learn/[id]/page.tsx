import styles from '../components/learnDetail.module.scss';

/**
 * 학습 게시물 상세페이지
 * 
 * @author yjjeon
 * @return
 */
export default function LearnDetail({ param }: any) {

  return (
    <div className={styles.container}>
      Learn Number: {param}
    </div>
  )
}
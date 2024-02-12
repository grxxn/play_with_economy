import styles from '../components/record.module.scss';
import Link from "next/link";

export default function Record() {

  return (
    <div className={styles.container}>
      <h1>
        2024.02.05 (월)
      </h1>
      <div className={styles.ecnmValWrapper}>
        <div className={styles.ecnmValBox}>
          <h3>환율</h3>
          <div>
            <label>국가</label>
            <input type="text" />
            <label>수치</label>
            <input type="text" />
            <label>등락</label>
            <input type="text" />
          </div>
          <textarea />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>금리</h3>
          <div>
            <label>종류</label>
            <input type="text" />
            <label>수치</label>
            <input type="text" />
            <label>등락</label>
            <input type="text" />
          </div>
          <textarea />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>주가</h3>
          <div>
            <label>종류</label>
            <input type="text" />
            <label>수치</label>
            <input type="text" />
            <label>등락</label>
            <input type="text" />
          </div>
          <textarea />
        </div>
        <div className={styles.ecnmValBox}>
          <h3>유가</h3>
          <div>
            <label>종류</label>
            <input type="text" />
            <label>수치</label>
            <input type="text" />
            <label>등락</label>
            <input type="text" />
          </div>
          <textarea />
        </div>
      </div>
      <div className={styles.articleWrapper}>
        <div>
          <h3>오늘의 기사</h3>
          <button type="button">추가하기</button>
        </div>
        <ul>
          <li>
            <Link href={'https://n.news.naver.com/mnews/article/119/0002796553?sid=101'} >https://n.news.naver.com/mnews/article/119/0002796553?sid=101</Link>
          </li>
        </ul>
      </div>
      <div className={styles.genrRevwWrapper}>
        <h3>오늘의 경제 총평 및 정리</h3>
        <textarea />
      </div>
      <div className={styles.btnWrapper}>
        <button type="button">
          <Link href={'/diary'}>목록으로</Link>
        </button>
        <button type="button">기록하기</button>
      </div>
    </div>
  )
}
import styles from './components/list.module.scss';
import DiaryCard from "./components/DiaryCard";
import Link from 'next/link';

export default function DiaryList() {

  return (
    <div className={styles.container}>
      <h1>경제야 놀자</h1>

      <div className={styles.cardWrapper}>
        <DiaryCard
          date="2024.02.05(월)"
          excRattVal="1,333.50원"
          intrRatVal="3.50%"
          stcPricVal="4,958.61"
          oilPricVal="72.28"
        />
      </div>

      <button type='button'>
        <Link href={'/diary/record'}>기록하기</Link>
      </button>
    </div>
  )
}
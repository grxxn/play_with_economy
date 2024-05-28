import Image from "next/image";
import styles from "./home.module.scss";
import mainImg from '../public/assets/images/main1_icon.png';
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainSection}>
        <h1>
          쉽게 시작하는<br />
          경제 공부
        </h1>
        <p>
          경제야 놀자와 함께 시작하세요!
        </p>
        <button type="button">
          <Link href={'/howtouse'}>기능 살펴보기</Link>
        </button>
        <div className={styles.mainDescImgBox}>
          <p>화면 속에서 스크롤 해보세요!</p>
          <div>
            <img src='/assets/images/playwitheconomy_info.jpg' alt="dd" />
          </div>
        </div>
      </div>

      <div className={styles.section1}>
        {/* <p>🏃‍♀️‍➡️경제를 놀이처럼, 제태크에 대해 얘기를 나눌 수 있는 '놀자'</p> */}
        <h2>📝 경제 다이러리를 작성하여 오늘의 경제 상황을 살펴볼 수 있는 <b>'쓰자'</b></h2>
      </div>

      <div className={styles.section2}>
        <h2>💁‍♀️ 경제 초보도 괜찮아. 경제 기초상식부터 알려주는 <b>'하자'</b></h2>
      </div>

      <div className={styles.section3}>
        <h2>🔎 날마다 올라오는 경제 기사, 모아보기 귀찮다면 경제 기사를 볼 수 있는 <b>'보자'</b></h2>

      </div>
    </div>
  );
}

import Image from "next/image";
import styles from "./home.module.scss";
import mainImg from '../public/assets/images/main1_icon.png';
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.mainWrapper}>
      {/* <Image src={mainImg} alt="경제야 놀자" width={575} height={588} />
      <div className={styles.mainContsWrapper}>
        <h1>경제야 놀자💰</h1>
        <div className={styles.mainConts}>
          <p>
            경제공부 돈공부가 막막할 땐
          </p>
          <p>
            경제야 놀자와 함께<br />
            흐름 파악하고 경제 마스터하기<br />
            로그인 후 바로 시작할 수 있습니다!
          </p>
        </div>
        <div className={styles.mainBtns}>
          <div>
            <button type="button">
              <Link href={'/login'}>로그인</Link>
            </button>
            <button type="button">
              <Link href={'/register'}>회원가입</Link>
            </button>
          </div>
          <button type="button">
            <Link href={'/howtouse'}>경놀 다이어리 사용방법 살펴보기</Link>
          </button>
        </div>
      </div> */}
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
      </div>

      <div className={styles.section1}>
        {/* <p>🏃‍♀️‍➡️경제를 놀이처럼, 제태크에 대해 얘기를 나눌 수 있는 '놀자'</p> */}
        <p>📝 경제 다이러리를 작성하여 오늘의 경제 상황을 살펴볼 수 있는 '쓰자'</p>
        <p>💁‍♀️ 경제 초보도 괜찮아. 경제 기초상식부터 알려주는 '하자'</p>
        <p>🔎 날마다 올라오는 경제 기사, 모아보기 귀찮다면 경제 기사를 볼 수 있는 '보자'</p>
      </div>
    </div>
  );
}

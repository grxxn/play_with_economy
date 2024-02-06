import Image from "next/image";
import styles from "./home.module.scss";
import mainImg from '../public/assets/images/main1_icon.png';
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.mainWrapper}>
      <Image src={mainImg} alt="경제야 놀자" width={575} height={588} />
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
              <Link href={'/Login'}>로그인</Link>
            </button>
            <button type="button">
              <Link href={'/Register'}>회원가입</Link>
            </button>
          </div>
          <button type="button">경놀 다이어리 사용방법 살펴보기</button>
        </div>
      </div>
    </div>
  );
}

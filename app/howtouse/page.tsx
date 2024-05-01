import Link from 'next/link';
import styles from './components/howtouse.module.scss';

export default function howToUse() {

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.mainConts}>
          <h1>
            <Link href={'/'}>경제야 놀자</Link>
          </h1>
          <p>다이어리 사용 설명서</p>
          <p>
            경제야 놀자에 오신 여러분 환영합니다!<br />
            경제에 관심은 있지만 어떻게 시작해야 할 지 모르시겠나요?<br /><br />
            경제야 놀자에서 매일매일 <span>경제 다이어리</span>를 작성하며<br />
            경제 흐름을 파악할 수 있습니다.<br /><br />
            그렇게 하루하루 기록하다 보면 어느새 나도 경제 마스터!
          </p>
        </div>
        <img alt="how to use this page" src="/assets/images/howtouse_main.png" />
      </div>
      <div className={styles.descWrapper}>
        <div className={styles.descBox}>
          <img src="/assets/images/howtouse_desc01.png" alt="howtouse description" />
          <p className={styles.descSubTitle}>
            오늘 경제의 흐름에 대해 기록하세요!
          </p>
          <p className={styles.descConts}>
            각종 시장지표와 수치를 작성하며 오늘의 경제상황을 파악할 수 있습니다.<br />
            하단에는 자신의 의견을 작성해 주세요.<br />
            시장 지표에 대한 의견을 기록하면 단순히 받아 적을 때보다 더 오래 기억하실 수 있습니다.<br />
          </p>
        </div>
        <div className={styles.descBox}>
          <img src="/assets/images/howtouse_desc02.png" alt="howtouse description" />
          <p className={styles.descSubTitle}>
            오늘 인상깊었던 경제뉴스를 저장하세요!
          </p>
          <p className={styles.descConts}>
            오늘 가장 이슈가 됐던 뉴스 또는 기억해야 할 뉴스의 링크를 저장할 수 있습니다.<br />
            경제의 흐름을 파악하기 위해서는 세상의 흐름을 알아야 하는 법!<br />
            매일 뉴스를 보다보면 점점 더 알아들을 수 있는 말이 많아질 수도?!🔍🧐<br />
          </p>
        </div>
        <div className={styles.descBox}>
          <img src="/assets/images/howtouse_desc03.png" alt="howtouse description" />
          <p className={styles.descSubTitle}>
            오늘 경제에 대해 총평해보세요!
          </p>
          <p className={styles.descConts}>
            오늘의 뉴스와 오늘의 시장 지표에 대해 총평을 할 수 있습니다.
            기록 후에도 한눈에 알아 볼 수 있게 정리해 주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
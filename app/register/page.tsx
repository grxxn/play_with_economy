import styles from './components/register.module.scss';
import Link from "next/link";

export default function register() {
  return (
    <div className={styles.container}>
      <h1>
        <Link href={'/'}>경제야 놀자</Link>
      </h1>
      <h3>회원가입</h3>
      <div className={styles.registerWrapper}>
        <label>아이디</label>
        <input type="text" />
        <label>비밀번호</label>
        <input type="password" />
        <label>비밀번호 확인</label>
        <input type="password" />
      </div>
      <button type='submit' className={styles.submitBtn}>회원가입</button>
    </div>
  )
}
import Link from "next/link";
import styles from "./components/login.module.scss";

export default function login() {

  return (
    <div className={styles.loginWrapper}>
      <h1>
        <Link href={'/'}>경제야 놀자</Link>
      </h1>
      <div className={styles.logionBox}>
        <p>로그인</p>
        <div>
          <label>아이디</label>
          <input type="text" />
          <label>비밀번호</label>
          <input type="password" />
          <label>
            <input type="checkbox" />
            <span>아이디 기억하기</span>
          </label>
        </div>
        <button type="button">로그인</button>
        <button type="button">
          <Link href={'/register'}>회원가입</Link>
        </button>
      </div>
    </div>
  );
};

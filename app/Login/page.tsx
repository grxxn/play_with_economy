"use client";

import Link from "next/link";
import styles from "./components/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginType {
  userId: string;
  userPw: string;
}

export default function login() {
  // ======================== 변수 선언 ========================
  const [loginInptVal, setLoginInptVal] = useState<LoginType>({ userId: '', userPw: '' });

  const router = useRouter();

  // ======================== 함수 선언 ========================

  // ======================== 이벤트 선언 ========================

  const inptOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInptVal({ ...loginInptVal, [e.target.name]: e.target.value });
  }

  /**
   * 로그인 버튼 클릭 이벤트
   */
  const loginOnClick = () => {
    // fetch('/api/login')
    //   .then(res => res.json())
    //   .then(data => console.log(data));

    router.push('/diary')
  }

  return (
    <div className={styles.loginWrapper}>
      <h1>
        <Link href={'/'}>경제야 놀자</Link>
      </h1>
      <div className={styles.logionBox}>
        <p>로그인</p>
        <div>
          <label>아이디</label>
          <input type="text" name="userId" onChange={inptOnChange} />
          <label>비밀번호</label>
          <input type="password" name="userPw" onChange={inptOnChange} />
          <label>
            <input type="checkbox" />
            <span>아이디 기억하기</span>
          </label>
        </div>
        <button type="button" onClick={loginOnClick}>로그인</button>
        <button type="button">
          <Link href={'/register'}>회원가입</Link>
        </button>
      </div>
    </div>
  );
};

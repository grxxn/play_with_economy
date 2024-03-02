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
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInptVal)
    })
      .then(res => {

        return res.json()
      })
      .then(data => {
        // 세션 설정
        if (data.length > 0) {

          // router.push('/diary');
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(err => {
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
      });
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

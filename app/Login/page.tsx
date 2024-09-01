"use client";

import Link from "next/link";
import styles from "./components/login.module.scss";
import React, { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface LoginType {
  userId: string;
  userPw: string;
  rememberMe: boolean;
}

/**
 * 로그인 페이지
 * 
 * @author yjjeon
 * @returns 
 */
export default function Login() {
  // ======================== 변수 선언 ========================
  const [loginInptVal, setLoginInptVal] = useState<LoginType>({ userId: '', userPw: '', rememberMe: false });
  const pwInptRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // ======================== 함수 선언 ========================

  // ======================== 이벤트 선언 ========================

  /**
   * input change event
   * @param e 
   */
  const inptOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'rememberMe') {
      setLoginInptVal({ ...loginInptVal, rememberMe: !loginInptVal.rememberMe });
    } else {
      setLoginInptVal({ ...loginInptVal, [e.target.name]: e.target.value });
    }
  }

  /**
   * 비밀번호 엔터키 이벤트
   */
  const pwOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 비밀번호 input에서 enter 시 로그인 실행
    if (e.code === 'Enter') loginOnClick();
  }

  /**
   * 로그인 버튼 클릭 이벤트
   */
  const loginOnClick = () => {

    if (loginInptVal.userId.length === 0 || loginInptVal.userPw.length === 0) {
      // login validation
      alert('아이디 또는 비밀번호를 입력해 주세요.');
    } else {
      // 아이디 기억하기
      if (loginInptVal.rememberMe) {
        localStorage.setItem('id', loginInptVal.userId);
      } else {
        localStorage.removeItem('id');
      }

      // 로그인 통신
      fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=' + loginInptVal.userId + '&password=' + loginInptVal.userPw
      })
        .then(res => res.json())
        .then(data => {

          localStorage.setItem('accessToken', data.principal.userSeq);
          localStorage.setItem('id', data.principal.id);
          localStorage.setItem('role', data.principal.role);

          // 메인 페이지로 이동
          router.push('/');
        })
        .catch((err) => {
          console.error(err)
          alert('오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
          setLoginInptVal({ ...loginInptVal, userPw: '' });
          if (pwInptRef.current) pwInptRef.current.focus();
        });
    }
  }


  useEffect(() => {
    // 아이디 기억하기 - 로컬스토리지 확인
    const userId = localStorage.getItem('id');
    if (userId) {
      setLoginInptVal({ ...loginInptVal, userId: userId, rememberMe: true });
    }
  }, [])

  return (
    <div className={styles.loginWrapper}>
      <h1>
        <Link href={'/'}>경제야 놀자</Link>
      </h1>
      <div className={styles.logionBox}>
        <p>로그인</p>
        <div>
          <label>아이디</label>
          <input type="text" name="userId" value={loginInptVal.userId} onChange={inptOnChange} />
          <label>비밀번호</label>
          <input type="password" name="userPw" value={loginInptVal.userPw} ref={pwInptRef} onChange={inptOnChange} onKeyUp={pwOnKeyUp} />
          <label>
            <input type="checkbox" name="rememberMe" checked={loginInptVal.rememberMe} onChange={inptOnChange} />
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

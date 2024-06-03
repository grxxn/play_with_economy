"use client";

import React, { useEffect, useState } from 'react';
import styles from './header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Header component 
 * 
 * @author yjjeon
 * @returns 
 */
const Header = () => {
  // ======================== 변수 선언 ========================
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  // ======================== 함수 선언 ========================


  // ======================== 이벤트 선언 ========================

  /**
   * 로그아웃 버튼 클릭 이벤트
   */
  const logoutClickHandler = () => {
    // 로그아웃 -> 첫 페이지로 이동 + localStorage 로그인정보 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userSeq');
    setIsLogin(false);

    router.push('/');
  }

  useEffect(() => {
    // 로그인 데이터 확인
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && accessToken.length > 0) setIsLogin(true);
  }, [isLogin])

  return (
    <header className={styles.headerWrapper}>
      <h1>
        <Link href={'/'}>💸 경제야 놀자 💸</Link>
      </h1>
      <div className={styles.gnb}>
        {/* <Link href={'/'}>놀자</Link> */}
        <Link href={'/diary'}>쓰자</Link>
        <Link href={'/learn'}>하자</Link>
        <Link href={'/article'}>보자</Link>
      </div>
      {
        isLogin
          ? <button type='button' onClick={logoutClickHandler}>로그아웃</button>
          : <Link href={'/login'}>로그인</Link>
      }
    </header>
  );
};

export default Header;
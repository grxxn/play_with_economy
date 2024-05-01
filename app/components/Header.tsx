import React from 'react';
import styles from './header.module.scss';
import Link from 'next/link';

/**
 * Header component 
 * 
 * @author yjjeon
 * @returns 
 */
const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <h1>
        <Link href={'/'}>💸 경제야 놀자 💸</Link>
      </h1>
      <Link href={'/login'}>로그인</Link>
    </div>
  );
};

export default Header;
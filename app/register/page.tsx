'use client';

import React, { useState } from 'react';
import styles from './components/register.module.scss';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { isExistNumber, isExistUpperCase } from '../_lib/common';

type registerDtoType = {
  id: string;
  pw: string;
  pwCheck: string;
}

/**
 * 회원가입 페이지
 * 
 * @author yjjeon
 * @returns 
 */
export default function Register() {
  // ======================== 변수 선언 ========================
  const [registerDto, setRegisterDto] = useState<registerDtoType>({ id: '', pw: '', pwCheck: '' });

  const router = useRouter();

  // ======================== 함수 선언 ========================

  /**
   * 회원가입 validation
   * @returns boolean
   */
  const registerValidation = () => {
    const regexId = /^[a-z]+[a-z0-9]{5,19}$/g;
    const regexPw = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/;
    const specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (registerDto.id.length === 0) {
      alert('아이디를 입력해 주세요.');
      return false;
    } else if (registerDto.pw.length === 0) {
      alert('비밀번호를 입력해 주세요.');
      return false;
    } else if (registerDto.pwCheck.length === 0) {
      alert('비밀번호 확인을 입력해 주세요.');
      return false;
    } else if (!regexId.test(registerDto.id)) {
      alert('아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.');
      return false;
    } else if (specialCheck.test(registerDto.id)) {
      alert('아이디는 특수문자를 포함할 수 없습니다.');
      return false;
    } else if (!regexPw.test(registerDto.pw)) {
      alert('비밀번호는 8~16자의 영문, 숫자, 특수문자를 사용해 주세요.');
      return false;
    } else if (registerDto.pw !== registerDto.pwCheck) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return false;
    } else {
      return true;
    }
  }

  // ======================== 이벤트 선언 ========================

  /**
   * input change 이벤트
   */
  const regiInptOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterDto({ ...registerDto, [e.target.name]: e.target.value });
  }

  /**
   * 회원가입 버튼 클릭 이벤트
   */
  const registerBtnOnclick = () => {
    // 순서: validation -> 아이디 중복확인 -> 회원가입
    if (registerValidation()) {
      fetch('api/register/isDupId', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: registerDto.id
        })
      })
        .then(res => res.json())
        .then((data) => {
          if (data.isDupUserId.length > 0) {
            alert('사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.');
          } else {
            fetch('/api/register/signUp', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(registerDto)
            })
              .then(res => res.json())
              .then((data) => {
                if (data && data.statusText === 'Success') {
                  alert('회원가입이 완료되었습니다. 로그인 후 이용해 주세요.');
                  router.push('/Login');
                } else {
                  alert('[ERR: REG01] 회원가입이 실패하였습니다. 잠시 후 다시 시도해 주세요.');
                }
              })
              .catch(error => {
                alert('[ERR: REG01] 회원가입이 실패하였습니다. 잠시 후 다시 시도해 주세요.');
              })
          }
        })
        .catch(() => {
          alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
        })

    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h3>회원가입</h3>
        <div className={styles.registerFormWrapper}>
          <input
            type="text"
            name='id'
            placeholder='아이디'
            value={registerDto.id}
            onChange={regiInptOnChange}
          />
          <input
            type="password"
            name='pw'
            placeholder='비밀번호'
            value={registerDto.pw}
            onChange={regiInptOnChange}
          />
          <input
            type="password"
            name='pwCheck'
            placeholder='비밀번호 확인'
            value={registerDto.pwCheck}
            onChange={regiInptOnChange}
          />
        </div>
        <button
          type='submit'
          className={styles.submitBtn}
          onClick={registerBtnOnclick}>회원가입</button>
      </div>
    </div>
  )
}
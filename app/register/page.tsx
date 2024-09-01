'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './components/register.module.scss';
import { useRouter } from 'next/navigation';

type registerDtoType = {
  id: string;
  password: string;
  pwCheck: string;
  nickname: string;
}

/**
 * 회원가입 페이지
 * 
 * @author yjjeon
 * @returns 
 */
export default function Register() {
  // ======================== 변수 선언 ========================
  const [registerDto, setRegisterDto] = useState<registerDtoType>({ id: 'abc111', password: 'P@ssw0rd', pwCheck: 'P@ssw0rd', nickname: '가나다' });
  const regiInptRefs = useRef<HTMLInputElement[]>([]);
  const [inptWrongArr, setInptWrongArr] = useState<boolean[]>(new Array(4).fill(false))
  const [idWrongMsg, setIdWrongMsg] = useState<string>('');
  const [pwWrongMsg, setPwWrongMsg] = useState<string>('');
  const [pwChkWrongMsg, setPwChkWrongMsg] = useState<string>('');

  const router = useRouter();

  // ======================== 함수 선언 ========================

  /**
   * 회원가입 validation
   * @returns boolean
   */
  const registerValidation = () => {
    const regexId = /^[a-z]+[a-z0-9]{5,19}$/g;
    const regexPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (registerDto.id.length === 0 || registerDto.id === '') {
      alert('아이디를 입력해 주세요.');

      regiInptRefs.current[0].focus();
      const tempWrongArr = [...inptWrongArr];
      tempWrongArr[0] = true;
      setInptWrongArr(tempWrongArr);
      setIdWrongMsg('아이디를 입력해주세요');

      return false;
    } else if (registerDto.nickname.length === 0 || registerDto.nickname === '') {
      alert('닉네임을 입력해 주세요.');

      regiInptRefs.current[1].focus();
      const tempWrongArr = [...inptWrongArr];
      tempWrongArr[1] = true;
      setInptWrongArr(tempWrongArr);

      return false;
    } else if (registerDto.password.length === 0 || registerDto.password === '') {
      alert('비밀번호를 입력해 주세요.');

      regiInptRefs.current[2].focus();
      const tempWrongArr = [...inptWrongArr];
      tempWrongArr[2] = true;
      setInptWrongArr(tempWrongArr);
      setPwWrongMsg('비밀번호를 입력해 주세요');

      return false;
    } else if (registerDto.pwCheck.length === 0 || registerDto.pwCheck === '') {
      alert('비밀번호 확인을 입력해 주세요.');

      regiInptRefs.current[3].focus();
      const tempWrongArr = [...inptWrongArr];
      tempWrongArr[3] = true;
      setInptWrongArr(tempWrongArr);

      return false;
    } else if (!regexId.test(registerDto.id)) {
      alert('아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다.');
      regiInptRefs.current[0].focus();
      const tempWrongArr = [...inptWrongArr];
      tempWrongArr[0] = true;
      setInptWrongArr(tempWrongArr);
      setIdWrongMsg('아이디는 5~20자의 영문 소문자, 숫자만 사용 가능합니다');

      return false;
    } else if (specialCheck.test(registerDto.id)) {
      alert('아이디는 특수문자를 포함할 수 없습니다.');
      regiInptRefs.current[0].focus();
      const tempWrongArr = [...inptWrongArr];
      tempWrongArr[0] = true;
      setInptWrongArr(tempWrongArr);
      setIdWrongMsg('아이디는 특수문자를 포함할 수 없습니다');

      return false;
    } else if (!regexPw.test(registerDto.password)) {
      alert('비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다.');
      regiInptRefs.current[2].focus();
      const tempWrongArr = [...inptWrongArr];
      tempWrongArr[2] = true;
      setInptWrongArr(tempWrongArr);
      setPwWrongMsg('비밀번호는 8~16자의 영문, 숫자, 특수문자를 포함해야 합니다');

      return false;
    } else if (registerDto.password !== registerDto.pwCheck) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      regiInptRefs.current[3].focus();
      const tempWrongArr = [...inptWrongArr];
      tempWrongArr[3] = true;
      setInptWrongArr(tempWrongArr);
      setPwChkWrongMsg('비밀번호 확인이 일치하지 않습니다');

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
    setInptWrongArr(new Array(4).fill(false));
    setRegisterDto({ ...registerDto, [e.target.name]: e.target.value });
  }

  /**
   * 회원가입 버튼 클릭 이벤트
   */
  const registerBtnOnclick = () => {
    // 순서: validation -> 회원가입
    if (registerValidation()) {
      fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerDto)
      })
        .then(res => res.json())
        .then((data) => {

          if (data.message.indexOf('Fail') > -1) {
            alert(data.detailMsg);
          } else {
            alert(data.detailMsg);
            router.push('/login');
          }

        })
        .catch(error => {
          console.error(error);
          alert('[ERR: REG01] 회원가입이 실패하였습니다. 잠시 후 다시 시도해 주세요.');
        })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.registerBox}>
        <h3>회원가입</h3>
        <div className={styles.formItem}>
          <label>아이디</label>
          <input
            type="text"
            name='id'
            placeholder='아이디'
            value={registerDto.id}
            onChange={regiInptOnChange}
            className={inptWrongArr[0] ? styles.wrong : ''}
            ref={(elem: HTMLInputElement) => regiInptRefs.current[0] = elem}
          />
          <span>
            {
              inptWrongArr[0]
                ? idWrongMsg
                : ''
            }
          </span>
        </div>
        <div className={styles.formItem}>
          <label>닉네임</label>
          <input
            type='text'
            name='nickname'
            placeholder='닉네임'
            value={registerDto.nickname}
            onChange={regiInptOnChange}
            className={inptWrongArr[1] ? styles.wrong : ''}
            ref={(elem: HTMLInputElement) => regiInptRefs.current[1] = elem}
          />
          <span>
            {
              inptWrongArr[1]
                ? '닉네임을 입력해주세요'
                : ''
            }
          </span>
        </div>
        <div className={styles.formItem}>
          <label>비밀번호</label>
          <input
            type="password"
            name='password'
            placeholder='비밀번호'
            value={registerDto.password}
            onChange={regiInptOnChange}
            className={inptWrongArr[2] ? styles.wrong : ''}
            ref={(elem: HTMLInputElement) => regiInptRefs.current[2] = elem}
          />
          <span>
            {
              inptWrongArr[2]
                ? pwWrongMsg
                : ''
            }
          </span>
        </div>
        <div className={styles.formItem}>
          <label>비밀번호 확인</label>
          <input
            type="password"
            name='pwCheck'
            placeholder='비밀번호 확인'
            value={registerDto.pwCheck}
            onChange={regiInptOnChange}
            className={inptWrongArr[3] ? styles.wrong : ''}
            ref={(elem: HTMLInputElement) => regiInptRefs.current[3] = elem}
          />
          <span>
            {
              inptWrongArr[3]
                ? pwChkWrongMsg
                : ''
            }
          </span>
        </div>
        <button
          type='submit'
          className={styles.submitBtn}
          onClick={registerBtnOnclick}>회원가입</button>
      </div>
    </div>
  )
}
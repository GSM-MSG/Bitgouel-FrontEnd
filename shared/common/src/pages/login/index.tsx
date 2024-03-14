'use client'

import { usePostLogin } from '@bitgouel/api'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { ValueInput } from '../../components'
import * as S from './style'

import { EmailErrorText, Page, Page1Obj, Page2Obj, Page3Obj, PasswordErrorText } from '../../atoms'
import { theme } from '../../styles'

const LoginPage = ({ isAdmin }: { isAdmin: boolean }) => {
  const [emailValue, setEmailValue] = useState<string>(
    isAdmin ? 's11111@gsm.hs.kr' : ''
  )
  const [emailErrorText, setEmailErrorText] = useRecoilState(EmailErrorText)
  const [passwordValue, setPasswordValue] = useState<string>(
    isAdmin ? '12345678a@' : ''
  )
  const [passwordErrorText, setPasswordErrorText] = useRecoilState(PasswordErrorText)

  const resetPage = useResetRecoilState(Page)
  const resetPage1Obj = useResetRecoilState(Page1Obj)
  const resetPage2Obj = useResetRecoilState(Page2Obj)
  const resetPage3Obj = useResetRecoilState(Page3Obj)

  const router = useRouter()
  const { mutate, isLoading } = usePostLogin()

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    setEmailValue(e.target.value)
    if (e.target.value === '') {
      setEmailErrorText('')
    } else if (!emailRegex.test(e.target.value)) {
      setEmailErrorText('잘못된 이메일입니다.')
    } else {
      setEmailErrorText('')
    }
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = new RegExp(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,24}$/
    )
    setPasswordValue(e.target.value)
    if (e.target.value === '') {
      setPasswordErrorText('')
    } else if (!passwordRegex.test(e.target.value)) {
      setPasswordErrorText('잘못된 비밀번호입니다.')
    } else {
      setPasswordErrorText('')
    }
  }

  return (
    <S.LoginWrapper>
      <S.TitleWrapper>
        <S.TitleContainer>
          <S.TitleItemWrapper>
            <S.TitleItem>빛고을</S.TitleItem>
            <S.TitleItem>직업교육</S.TitleItem>
            <S.TitleItem>혁신지구</S.TitleItem>
          </S.TitleItemWrapper>
        </S.TitleContainer>
      </S.TitleWrapper>
      <S.InputWrapper>
        <S.InputContainer>
          <ValueInput
            placeholder='이메일'
            onClear={() => setEmailValue('')}
            type='text'
            value={emailValue}
            length={emailValue.length}
            onChange={onEmailChange}
            errorText={emailErrorText}
            isLoading={isLoading}
          />
          <ValueInput
            placeholder='비밀번호'
            type='password'
            value={passwordValue}
            length={passwordValue.length}
            onClear={() => setPasswordValue('')}
            onChange={onPasswordChange}
            style={{
              border: passwordErrorText
                ? `0.0625rem solid ${theme.color.error}`
                : `0.0625rem solid ${theme.color.gray['700']}`,
              color: passwordErrorText
                ? `${theme.color.error}`
                : isLoading
                ? `${theme.color.gray['700']}`
                : `${theme.color.black}`,
            }}
            isLoading={isLoading}
          />
        </S.InputContainer>
        <S.PasswordContainer>
          <S.MenuItem isError={passwordErrorText ? true : false}>
            {passwordErrorText ? passwordErrorText : '비밀번호를 잊으셨나요?'}
          </S.MenuItem>
          <S.PasswordSearch>비밀번호 찾기</S.PasswordSearch>
        </S.PasswordContainer>
      </S.InputWrapper>
      <S.LoginButtonWrapper>
        <S.LoginButton
          disabled={isLoading || emailValue === '' || passwordValue === ''}
          isAble={!isLoading && emailValue !== '' && passwordValue !== ''}
          onClick={() => mutate({ email: emailValue, password: passwordValue })}
        >
          로그인
        </S.LoginButton>
      </S.LoginButtonWrapper>
      <S.JoinWrapper>
        <S.JoinContainer>
          <S.MenuItem>또는</S.MenuItem>
          <div>
            <S.NoAccountItem>계정이 없으신가요?</S.NoAccountItem>
            <S.UserJoinItem
              onClick={() => {
                resetPage()
                resetPage1Obj()
                resetPage2Obj()
                resetPage3Obj()
                router.push('/auth/signUp')
              }}
            >
              회원가입
            </S.UserJoinItem>
          </div>
        </S.JoinContainer>
      </S.JoinWrapper>
    </S.LoginWrapper>
  )
}

export default LoginPage

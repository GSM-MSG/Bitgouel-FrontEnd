'use client'

import { useState } from 'react'
import * as S from './style'
import { Bg5 } from '@bitgouel/common'

const InquiryAnswerPage = () => {
  const MAXLENGTH: number = 1000 as const

  const [answerTitle, setAnswerTitle] = useState<string>('')
  const [answerContent, setAnswerContent] = useState<string>('')

  const saveAnswerTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerTitle(event.target.value)
  }

  const saveAnswerMainText = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswerContent(event.target.value)
  }

  return (
    <div>
      <S.SlideBg url={Bg5}>
        <S.BgContainer>
          <S.CreateTitle>문의 답변</S.CreateTitle>
        </S.BgContainer>
      </S.SlideBg>
      <S.DocumentInputContainer>
        <S.DocumentInput>
          <S.InputTitle
            placeholder='답변 제목(100자 이내)'
            maxLength={100}
            onChange={saveAnswerTitle}
          />
          <S.InputMainText
            maxLength={MAXLENGTH}
            placeholder='본문 입력 (1000자 이내)'
            onChange={saveAnswerMainText}
          />
          <S.ButtonContainer>
            <S.CreateButton
              isAble={answerTitle !== '' && answerContent !== '' ? true : false}
            >
              문의 답변하기
            </S.CreateButton>
          </S.ButtonContainer>
        </S.DocumentInput>
      </S.DocumentInputContainer>
    </div>
  )
}

export default InquiryAnswerPage

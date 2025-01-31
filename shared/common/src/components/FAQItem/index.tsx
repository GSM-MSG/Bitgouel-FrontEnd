'use client'

import { useState } from 'react'
import * as S from './style'
import { FAQTypes } from '@bitgouel/types'

const FAQItem = ({ question, answer }: Omit<FAQTypes, 'id'>) => {
  const [answerStatus, setAnswerStatus] = useState<boolean>(false)

  return (
    <S.FAQItemWrapper onClick={() => setAnswerStatus(!answerStatus)}>
      <S.TitleBox>
        <S.QMark>Q.</S.QMark>
        <span>{question}</span>
      </S.TitleBox>
      <S.AnswerBox answerStatus={answerStatus}>
        <S.QMark>A.</S.QMark>
        <S.Answer>{answer}</S.Answer>
      </S.AnswerBox>
    </S.FAQItemWrapper>
  )
}
export default FAQItem

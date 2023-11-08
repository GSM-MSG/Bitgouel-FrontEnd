import React from 'react'
import * as S from './style'
import { Header, LectureList } from '../../components'
import Bg3 from '../../assets/png/mainBg3.png'
import { Filter, Plus } from '../../assets/'

const LecturePage = () => {
  return (
    <S.LectureWrraper>
      <Header />
      <S.SlideBg url={Bg3}>
        <S.BgContainer>
          <S.LectureTitle>강의 목록</S.LectureTitle>
          <S.ButtonContainer>
            <S.LectureButton>
              <Plus />
              <span>개설 신청하기</span>
            </S.LectureButton>
            <S.LectureButton>
              <Filter />
              <span>필터</span>
            </S.LectureButton>
          </S.ButtonContainer>
        </S.BgContainer>
      </S.SlideBg>
      <S.ListWrraper>
        <S.ListContainer>
          <LectureList />
        </S.ListContainer>
      </S.ListWrraper>
    </S.LectureWrraper>
  )
}

export default LecturePage

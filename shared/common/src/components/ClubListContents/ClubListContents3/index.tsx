'use client'

import * as S from '../style'
import { Banner3 } from '@bitgouel/common'

const schoolList: string[] = [
  '동일미래과학고등학교',
  '광주전자공업고등학교',
  '송원여자상업고등학교',
  '전남공업고등학교',
]

const clubList: string[][] = [
  ['커리어브릿지', '커리어플래너'],
  ['발자국'],
  ['미용서비스', '뷰티아트', '건강지킴이'],
  ['라온하제'],
]

const ClubListContents3 = () => {
  return (
    <S.ClubListBanner url={Banner3}>
      <S.ClubListContents>
        <S.ClubValueTitle>의료•헬스케어</S.ClubValueTitle>
        <S.ClubMainTextArea>
          <S.ClubLeftTextArea>
            {schoolList.map((school, idx) => (
              <S.ClubLeftText key={idx}>{school}</S.ClubLeftText>
            ))}
          </S.ClubLeftTextArea>
          <S.ClubRightTextArea>
            {clubList.map((club, idx) => (
              <S.ClubRightTextLine key={idx}>
                {club.map((value, idx2) => (
                  <S.ClubRightText key={idx2}>{value}</S.ClubRightText>
                ))}
              </S.ClubRightTextLine>
            ))}
          </S.ClubRightTextArea>
        </S.ClubMainTextArea>
      </S.ClubListContents>
    </S.ClubListBanner>
  )
}

export default ClubListContents3

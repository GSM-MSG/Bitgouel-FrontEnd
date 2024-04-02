'use client'

import { InClubArrow } from '@bitgouel/common'
import { useRouter } from 'next/navigation'
import * as S from './style'

const ClubItem = ({
  clubId,
  clubName,
}: {
  clubId: string
  clubName: string
}) => {
  const { push } = useRouter()
  return (
    <S.ClubListItemBox>
      <S.ClubName>{clubName}</S.ClubName>
      <S.InClubArrowButton onClick={() => push(`/main/club/${clubId}`)}>
        <span>내부인원보기</span>
        <InClubArrow />
      </S.InClubArrowButton>
    </S.ClubListItemBox>
  )
}

export default ClubItem

'use client'

import { useDeleteUserWithdraw, useGetWithDrawUserList } from '@bitgouel/api'
import {
  AppropriationModal,
  Bg6,
  Check,
  FilterComponent,
  FilterOut,
  PeopleCircle,
  Plus,
  UserItem,
  useModal,
} from '@bitgouel/common'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { TopContainer } from '../NewUserListPage/style'
import { UserListContainer } from '../UserListPage/style'
import * as S from './style'

type cohortTypes = '1' | '2' | '3' | '4'

const WithdrawUserListPage = () => {
  const { push } = useRouter()
  const [userIds, setUserIds] = useState<string[]>([])
  const [cohorts, setCohorts] = useState([
    { text: '1기', item: '1', checked: true },
    { text: '2기', item: '2', checked: false },
    { text: '3기', item: '3', checked: false },
    { text: '4기', item: '4', checked: false },
  ])
  const [cohort, setCohort] = useState<cohortTypes>('1')
  const { data, refetch } = useGetWithDrawUserList(cohort)
  const { mutate } = useDeleteUserWithdraw(userIds)
  const [isFilter, setIsFilter] = useState<boolean>(false)
  const { openModal } = useModal()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCohorts((prev) =>
      prev.map((cohort) =>
        cohort.item === e.target.id
          ? { ...cohort, checked: true }
          : { ...cohort, checked: false }
      )
    )
    if (e.target.checked) setCohort(e.target.id as cohortTypes)
  }
  const handleSelectUsers = (
    e: ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    if (e.target.checked) setUserIds((prev) => [...prev, userId])
    else setUserIds((prev) => prev.filter((listId) => listId !== userId))
  }
  const onAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setUserIds(data?.data.students.map((student) => student.userId))
    else setUserIds([])
  }
  const onWithdrawModal = () => {
    if (userIds.length === 0) return
    openModal(
      <AppropriationModal
        isApprove={false}
        question='탈퇴를 승인하시겠습니까?'
        purpose='승인하기'
        title=''
        onAppropriation={() => mutate()}
      />
    )
  }

  useEffect(() => {
    refetch()
  }, [cohort])

  return (
    <div>
      <S.SlideBg url={Bg6}>
        <S.BgContainer>
          <S.ClubTitle>탈퇴 예정자 명단</S.ClubTitle>
          <S.ButtonContainer>
            <S.ButtonBox onClick={() => push('/main/admin')}>
              <PeopleCircle />
              <span>사용자 명단</span>
            </S.ButtonBox>
            <S.ButtonBox onClick={() => push('/main/admin/new')}>
              <Plus />
              <span>신규 가입자 명단</span>
            </S.ButtonBox>
          </S.ButtonContainer>
        </S.BgContainer>
      </S.SlideBg>
      <S.UserListWrapper>
        <TopContainer>
          <S.RemarkBox>
            <span>선택</span>
            <span style={{ marginLeft: '1.5rem' }}>이름</span>
          </S.RemarkBox>
          <S.WithdrawButtonContainer>
            <S.FilterContainer>
              <S.FilterBox onClick={() => setIsFilter((prev) => !prev)}>
                <FilterOut />
                필터
              </S.FilterBox>
              {isFilter && (
                <FilterComponent
                  title='기수'
                  filterList={cohorts}
                  onChange={onChange}
                />
              )}
            </S.FilterContainer>
            <S.AllWithdrawBox htmlFor='allWithdraw'>
              <input type='checkbox' id='allWithdraw' onChange={onAll} />
              <PeopleCircle />
              전체 선택
            </S.AllWithdrawBox>
            <S.SelectWithdrawBox onClick={onWithdrawModal}>
              <Check />
              선택 탈퇴
            </S.SelectWithdrawBox>
          </S.WithdrawButtonContainer>
        </TopContainer>
        <UserListContainer>
          {data?.data.students.map((user) => (
            <UserItem
              key={user.withdrawId}
              id={user.userId}
              name={user.studentName}
              status='request'
              handleSelectUsers={handleSelectUsers}
              userIds={userIds}
            />
          ))}
        </UserListContainer>
      </S.UserListWrapper>
    </div>
  )
}

export default WithdrawUserListPage

import { useDeleteUserWithdraw, useGetWithDrawUserList } from '@bitgouel/api'
import {
  AppropriationModal,
  CompoundListItemComponent,
  NoneResult,
  WaitingAnimation,
  handleSelect,
  insertHyphen,
  roleToKor,
  useFilterSelect,
  useModal,
} from '@bitgouel/common'
import { ChangeEvent, useEffect, useState } from 'react'
import { WithdrawDisplayInfo } from '../../AdminDisplayInfo'
import { AdminItemListContainer } from '../style'

const defaultFilterList = [
  { text: '1기', item: '1', checked: true },
  { text: '2기', item: '2', checked: false },
  { text: '3기', item: '3', checked: false },
  { text: '4기', item: '4', checked: false },
]

const filterTitle: string = '기수' as const

type cohortTypes = '1' | '2' | '3' | '4'

const WithdrawUserList = () => {
  const [userIds, setUserIds] = useState<string[]>([])
  const [cohort, setCohort] = useState<cohortTypes>('1')
  const { data, refetch, isLoading } = useGetWithDrawUserList(cohort)
  const { mutate } = useDeleteUserWithdraw(userIds, {
    onSuccess: () => refetch(),
  })
  const { filterList, onSelected } = useFilterSelect({
    title: filterTitle,
    defaultFilterList,
    setFilterPayload: setCohort,
  })
  const { openModal } = useModal()

  const handleSelectUsers = (checked: boolean, userId: string) =>
    handleSelect({ checked, id: userId, setIds: setUserIds })

  const onAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setUserIds(data?.students.map((student) => student.userId))
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
        onAppropriation={(callbacks) => mutate(undefined, callbacks)}
      />
    )
  }

  useEffect(() => {
    refetch()
  }, [cohort])

  return (
    <>
      <WithdrawDisplayInfo
        filterTitle={filterTitle}
        filterList={filterList}
        onSelected={onSelected}
        onAll={onAll}
        onWithdrawModal={onWithdrawModal}
      />
      <AdminItemListContainer>
        {isLoading && <WaitingAnimation title={'탈퇴 예정자 명단을'} />}
        {data?.students.length <= 0 ? (
          <NoneResult title={'탈퇴 예정자 명단이'} />
        ) : (
          data?.students.map((user) => {
            const userItemList: { width: string; text: string }[] = [
              { width: '8.25rem', text: roleToKor[user.authority] },
              { width: '9rem', text: insertHyphen(user.phoneNumber) },
              { width: 'auto', text: user.email },
            ]

            return (
              <CompoundListItemComponent key={user.withdrawId}>
                <CompoundListItemComponent.AdminCheckboxItemContainer>
                  <CompoundListItemComponent.AdminItemCheckboxName
                    checkList={userIds}
                    checkItem={user.userId}
                    handleSelectCheck={handleSelectUsers}
                    name={user.studentName}
                    nameWidth='6rem'
                  />
                  {userItemList.map((item) => (
                    <CompoundListItemComponent.OtherItem
                      key={item.text}
                      width={item.width}
                      text={item.text}
                    />
                  ))}
                </CompoundListItemComponent.AdminCheckboxItemContainer>
              </CompoundListItemComponent>
            )
          })
        )}
      </AdminItemListContainer>
    </>
  )
}

export default WithdrawUserList

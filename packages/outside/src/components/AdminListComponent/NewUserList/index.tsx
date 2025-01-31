import {
  useDeleteUserReject,
  useGetUserList,
  usePatchUserApprove,
} from '@bitgouel/api'
import {
  AppropriationModal,
  CompoundListItemComponent,
  NoneResult,
  WaitingAnimation,
  handleSelect,
  insertHyphen,
  roleToKor,
  useModal,
} from '@bitgouel/common'
import { AppropriationModalProps } from '@bitgouel/types'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { NewDisplayInfo } from '../../AdminDisplayInfo'
import { AdminItemListContainer } from '../style'

type messageType = '가입을 수락하였습니다' | '가입을 거절하였습니다'

const NewUserList = () => {
  const [userIds, setUserIds] = useState<string[]>([])
  const { data, refetch, isLoading } = useGetUserList({
    keyword: '',
    authority: 'ROLE_USER',
    approveStatus: 'PENDING',
  })
  const { openModal, closeModal } = useModal()

  const onSuccess = (message: messageType) => {
    closeModal()
    refetch()
    toast.success(message)
  }

  const { mutate: approve } = usePatchUserApprove(userIds, {
    onSuccess: () => onSuccess('가입을 수락하였습니다'),
  })
  const { mutate: reject } = useDeleteUserReject(userIds, {
    onSuccess: () => onSuccess('가입을 거절하였습니다'),
  })

  const handleOpenModal = (type: 'approve' | 'reject') => {
    if (userIds.length === 0) return toast.info('사용자를 선택해주세요')

    const ModalParameter: AppropriationModalProps = {
      isApprove: type === 'approve' ? true : false,
      question:
        type === 'approve'
          ? '가입을 수락하시겠습니까?'
          : '가입을 거부하시겠습니까?',
      title: '',
      purpose: type === 'approve' ? '수락하기' : '거부하기',
      onAppropriation: (callbacks) =>
        type === 'approve'
          ? approve(undefined, callbacks)
          : reject(undefined, callbacks),
    }

    openModal(
      <AppropriationModal
        isApprove={ModalParameter.isApprove}
        question={ModalParameter.question}
        title={ModalParameter.title}
        purpose={ModalParameter.purpose}
        onAppropriation={ModalParameter.onAppropriation}
      />
    )
  }

  const onAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setUserIds(data?.users.map((user) => user.id))
    else setUserIds([])
  }

  const handleSelectUsers = (checked: boolean, userId: string) =>
    handleSelect({ checked, id: userId, setIds: setUserIds })

  return (
    <>
      <NewDisplayInfo onAll={onAll} handleOpenModal={handleOpenModal} />
      <AdminItemListContainer>
        {isLoading && <WaitingAnimation title={'신규 가입자 명단을'} />}
        {data?.users.length <= 0 ? (
          <NoneResult title={'신규 가입자 명단이'} />
        ) : (
          data?.users.map((user) => {
            const otherItemList: { width: string; text: string }[] = [
              { width: '8.25rem', text: roleToKor[user.authority] },
              { width: '9rem', text: insertHyphen(user.phoneNumber) },
              { width: 'auto', text: user.email },
            ]

            return (
              <CompoundListItemComponent key={user.id}>
                <CompoundListItemComponent.AdminCheckboxItemContainer>
                  <CompoundListItemComponent.AdminItemCheckboxName
                    checkList={userIds}
                    checkItem={user.id}
                    handleSelectCheck={handleSelectUsers}
                    name={user.name}
                    nameWidth='6rem'
                  />
                  {otherItemList.map((item) => (
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

export default NewUserList

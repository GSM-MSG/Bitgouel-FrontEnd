'use client'

import {
  lectureQueryKeys,
  useGetLectureApplyList,
  usePatchApplyCancel,
} from '@bitgouel/api'
import {
  ApplyDetailModal,
  AppropriationModal,
  CompoundListItemComponent,
  handleSelect,
  NoneResult,
  useModal,
  WaitingAnimation,
} from '@bitgouel/common'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import * as S from '../style'
import CompleteDisplayInfo from './LectureApplyList/CompleteDisplayInfo'

const LectureCompleteList = ({ lectureId }: { lectureId: string }) => {
  const { data, refetch, isLoading } = useGetLectureApplyList(lectureId, true)
  const [studentIds, setStudentIds] = useState<string[]>([])
  const { openModal, closeModal } = useModal()
  const queryClient = useQueryClient()

  const { mutate } = usePatchApplyCancel(lectureId, studentIds, {
    onSuccess: () => {
      refetch()
      queryClient.invalidateQueries(
        lectureQueryKeys.getLectureApplyList(lectureId, false)
      )
      closeModal()
      toast.success('이수를 취소하였습니다.')
    },
  })

  const handleOpenModal = () => {
    if (studentIds.length === 0) return toast.info('학생을 선택해주세요.')

    openModal(
      <AppropriationModal
        isApprove={false}
        question='이수를 취소하시겠습니까?'
        title=''
        purpose='취소하기'
        onAppropriation={(callbacks) => mutate(undefined, callbacks)}
      />
    )
  }

  const onAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setStudentIds(data?.students.map((student) => student.id) || [])
    else setStudentIds([])
  }

  const handleSelectStudents = (checked: boolean, userId: string) =>
    handleSelect({ checked, id: userId, setIds: setStudentIds })

  const onDetailModal = (studentId: string) => {
    openModal(<ApplyDetailModal lectureId={lectureId} studentId={studentId} />)
  }

  return (
    <>
      <CompleteDisplayInfo onAll={onAll} handleOpenModal={handleOpenModal} />
      <S.ApplyListContainer>
        {isLoading && <WaitingAnimation title={'강의 이수 명단을'} />}
        {!isLoading && data?.students && data.students.length <= 0 && (
          <NoneResult title={'강의 이수 명단이'} />
        )}
        {data?.students.map((student) => {
          const otherItemList: { width: string; text: string }[] = [
            { width: '15rem', text: student.school },
            {
              width: '5rem',
              text: `${student.grade}학년 ${student.classNumber}반`,
            },
            { width: 'auto', text: student.clubName },
          ]

          return (
            <CompoundListItemComponent>
              <CompoundListItemComponent.AdminCheckboxItemContainer
                onClick={() => onDetailModal(student.id)}
              >
                <CompoundListItemComponent.AdminItemCheckboxName
                  checkList={studentIds}
                  checkItem={student.id}
                  handleSelectCheck={handleSelectStudents}
                  name={student.name}
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
        })}
      </S.ApplyListContainer>
    </>
  )
}

export default LectureCompleteList

'use client'

import {
  usePostActivityInformation,
  useGetActivityDetail,
  usePatchActivityModifyInformation,
} from '@bitgouel/api'
import {
  AppropriationModal,
  Bg2,
  Chevron,
  SelectCalendarModal,
  SelectScoreModal,
  useModal,
} from '@bitgouel/common'
import {
  StudentIdProps,
  ActivityDetailProps,
  ActivityDetailTypes,
  ActivityPayloadTypes,
} from '@bitgouel/types'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import * as S from './style'

const MAXTITLELENGTH: number = 100 as const
const MAXCONTENTLENGTH: number = 1000 as const

// const ActivityWritePage: React.FC<{ studentIdProps: StudentIdProps }> = ({
const ActivityWritePage = ({
  studentId,
  clubId,
  activityId,
}: {
  studentId?: string
  clubId?: string
  activityId?: string
}) => {
  const { openModal, closeModal } = useModal()
  const { push } = useRouter()

  const [isActivityDate, setIsActivityDate] = useState<boolean>(false)
  const [activityTaskDate, setActivityTaskDate] = useState<Date>(new Date())
  const [activityDateText, setActivityDateText] =
    useState<string>('활동 날짜 선택')
  const [isScore, setIsScore] = useState<boolean>(false)
  const [scoreText, setScoreText] = useState<string>('학점 선택')

  const [activityTitle, setActivityTitle] = useState<string>('')
  const [activityContent, setActivityContent] = useState<string>('')

  const openSelectModal = (type: string) => {
    if (type === '학점 선택') {
      setIsActivityDate(false)
      setIsScore((prev) => !prev)
    } else if (type === '활동 날짜 선택') {
      setIsActivityDate((prev) => !prev)
      setIsScore(false)
    }
  }

  const { data, refetch, isSuccess } = useGetActivityDetail(activityId || '', {
    enabled: !!studentId,
    refetchOnWindowFocus: false,
  })
  const { title, content, activityDate, credit } = data?.data || {}

  const { mutate: createActivity } = usePostActivityInformation({
    onSuccess: () => {
      closeModal()
      push(`/main/club/${clubId}/student/${studentId}/activity`)
      toast.success('활동을 추가하였습니다.')
    },
  })

  const { mutate: modifyActivity } = usePatchActivityModifyInformation(
    activityId || '',
    {
      onSuccess: () => {
        closeModal()
        push(`/main/club/${clubId}/student/${studentId}/activity`)
        toast.success('수정하였습니다.')
        refetch()
      },
    }
  )

  const onSubmit = () => {
    if (studentId && clubId && activityId) {
      openModal(
        <AppropriationModal
          isApprove={true}
          question='게시글을 수정하시겠습니까?'
          title={activityTitle || ''}
          purpose='수정하기'
          onAppropriation={() =>
            modifyActivity({
              title: activityTitle,
              content: activityContent,
              credit: Number(scoreText?.slice(0, 1)),
              activityDate: `${activityTaskDate.getFullYear()}-${(
                activityTaskDate.getMonth() + 1
              )
                .toString()
                .padStart(2, '0')}-${activityTaskDate
                .getDate()
                .toString()
                .padStart(2, '0')}`,
            })
          }
        />
      )
    } else {
      openModal(
        <AppropriationModal
          isApprove={true}
          question='게시글을 추가하시겠습니까?'
          title={activityTitle || ''}
          purpose='추가하기'
          onAppropriation={() =>
            createActivity({
              title: activityTitle,
              content: activityContent,
              credit: +scoreText.slice(0, 1),
              activityDate: `${activityTaskDate.getFullYear()}-${(
                activityTaskDate.getMonth() + 1
              )
                .toString()
                .padStart(2, '0')}-${activityTaskDate
                .getDate()
                .toString()
                .padStart(2, '0')}`,
            })
          }
        />
      )
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setActivityTitle(title || '')
      setActivityContent(content || '')
      setScoreText(credit + '점' || '')
      setActivityDateText(
        `${activityDate?.slice(0, 4)}.${activityDate?.slice(
          5,
          7
        )}.${activityDate?.slice(8)}` || ''
      )
    }
  }, [data])

  return (
    <div>
      <S.SlideBg url={Bg2}>
        <S.BgContainer>
          <S.CreateTitle>활동 {studentId ? '수정' : '추가'}</S.CreateTitle>
          <S.ButtonContainer></S.ButtonContainer>
        </S.BgContainer>
      </S.SlideBg>
      <S.DocumentInputContainer>
        <S.DocumentInput>
          <S.InputTitle
            value={activityTitle}
            placeholder='활동 제목(100자 이내)'
            maxLength={MAXTITLELENGTH}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setActivityTitle(e.target.value)
            }}
          />
          <S.InputMainText
            value={activityContent}
            maxLength={MAXCONTENTLENGTH}
            placeholder='본문 입력 (1000자 이내)'
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setActivityContent(e.target.value)
            }}
          />
          <S.ActivitySetting>
            <S.SettingTitle>활동 세부 설정</S.SettingTitle>
            <S.SettingSelectionContainer>
              <S.SettingSelection>
                <S.SelectModalContainer>
                  {isActivityDate && (
                    <SelectCalendarModal
                      date={activityTaskDate}
                      setDate={setActivityTaskDate}
                      setText={setActivityDateText}
                    />
                  )}
                  <S.SettingDateBox
                    onClick={() => openSelectModal('활동 날짜 선택')}
                  >
                    <Chevron />
                    <S.SettingButton>{activityDateText}</S.SettingButton>
                  </S.SettingDateBox>
                </S.SelectModalContainer>
              </S.SettingSelection>
              <S.SettingSelection>
                <S.SelectModalContainer>
                  {isScore && (
                    <SelectScoreModal
                      score={
                        Number.isInteger(Number(scoreText))
                          ? scoreText + '점'
                          : scoreText
                      }
                      setScore={setScoreText}
                      setIsScore={setIsScore}
                    />
                  )}
                  <S.SettingScoreBox
                    onClick={() => openSelectModal('학점 선택')}
                  >
                    <Chevron />
                    <S.SettingButton>{scoreText}</S.SettingButton>
                  </S.SettingScoreBox>
                </S.SelectModalContainer>
              </S.SettingSelection>
            </S.SettingSelectionContainer>
          </S.ActivitySetting>
          <S.ButtonContainer>
            <S.CreateButton
              onClick={() => {
                if (
                  title !== '' &&
                  content !== '' &&
                  activityDateText !== '활동 날짜 선택' &&
                  scoreText !== '학점 선택'
                ) {
                  onSubmit()
                }
              }}
              isAble={
                title !== '' &&
                content !== '' &&
                activityDateText !== '활동 날짜 선택' &&
                scoreText !== '학점 선택'
              }
            >
              {activityId ? '수정하기' : '추가하기'}
            </S.CreateButton>
          </S.ButtonContainer>
        </S.DocumentInput>
      </S.DocumentInputContainer>
    </div>
  )
}
export default ActivityWritePage

'use client'

import * as S from './style'
import { useRouter } from 'next/navigation'
import { ApproveStatusEnum } from '@bitgouel/api'
import { lectureStatusToKor } from '../../constants'
import { match } from 'ts-pattern'

interface ActivityItemType {
  activityId: string
  title: string
  userId: string
  activityDate: string
  userName: string
  approveStatus: ApproveStatusEnum
}

interface ActivityItemProps {
  item: ActivityItemType
}

const ActivityItem = ({ item }: ActivityItemProps) => {
  const router = useRouter()

  return (
    <S.ActivityItemWrapper
      onClick={() => router.push('/main/club/student/activity/detail')}
    >
      <div>
        <div>
          <S.AcitivTitle>
            {item.title.length > 10
              ? `${item.title.slice(0, 12)}...`
              : item.title}
          </S.AcitivTitle>
        </div>
        <div>
          <S.Date>{`${item.activityDate.slice(
            0,
            4
          )}년 ${item.activityDate.slice(5, 7)}월 ${item.activityDate.slice(
            8,
            10
          )}일 ${item.activityDate.slice(11, 16)}`}</S.Date>
        </div>
        <div>
          <S.Uploader>{item.userName}</S.Uploader>
        </div>
      </div>
      <S.StatusContainer>
        <S.ApproveStatus
          approveColor={match(item.approveStatus)
            .with('APPROVED', () => true)
            .otherwise(() => false)}
        >
          {lectureStatusToKor[item.approveStatus]}
        </S.ApproveStatus>
      </S.StatusContainer>
    </S.ActivityItemWrapper>
  )
}
export default ActivityItem

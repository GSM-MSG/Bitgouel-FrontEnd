import React, { useEffect, useState } from 'react'
import {
  MainStyle,
  NoneResult,
  PostItem,
  WaitingAnimation,
  useIntersectionObserver,
} from '@bitgouel/common'
import { ObserverLine } from '../PostList/style'
import { useGetPostList } from '@bitgouel/api'
import { PostItemTypes } from '@bitgouel/types'

const NoticeList = () => {
  const [noticeSequence, setNoticeSequence] = useState<number | null>(null)
  const { data, refetch, isLoading } = useGetPostList({
    type: 'NOTICE',
    postSequence: noticeSequence,
    size: 10,
  })
  const [noticeList, setNoticeList] = useState<PostItemTypes[]>([])
  const [scrollTarget] = useIntersectionObserver({
    listData: data?.posts || [],
    setSequence: setNoticeSequence,
    setList: setNoticeList,
  })

  useEffect(() => {
    refetch()
  }, [noticeSequence])

  return (
    <>
      <MainStyle.MainContainer>
        {isLoading && <WaitingAnimation title={'공지사항을'} />}
        {!isLoading && noticeList.length <= 0 ? (
          <NoneResult title={'공지사항이'} />
        ) : (
          noticeList.map((notice) => <PostItem key={notice.id} item={notice} />)
        )}
      </MainStyle.MainContainer>
      <ObserverLine ref={scrollTarget} />
    </>
  )
}

export default NoticeList

'use client'

import { TokenManager, useDeletePost, useGetPostDetail } from '@bitgouel/api'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bg1 } from '../../../assets'
import { useModal } from '../../../hooks'
import { AppropriationModal } from '../../../modals'
import * as S from './style'

const PostDetailPage = ({ postId }: { postId: string }) => {
  const { data } = useGetPostDetail(postId)
  const { mutate } = useDeletePost(postId, '게시글')
  const { openModal } = useModal()
  const { push } = useRouter()
  const tokenManager = new TokenManager()

  return (
    <div>
      <S.SlideBg url={Bg1}>
        <S.BgContainer>
          <S.CreateTitle>게시글 상세</S.CreateTitle>
        </S.BgContainer>
      </S.SlideBg>
      <S.DocumentWrapper>
        <S.Document>
          <S.TitleContainer>
            <S.Title>{data?.data.title}</S.Title>
            <S.SubTitle>
              <S.NumberBox>
                <S.SubTitleBox>게시일</S.SubTitleBox>
                <span>
                  {`${data?.data.modifiedAt.slice(
                    0,
                    4
                  )}년 ${data?.data.modifiedAt.slice(
                    5,
                    7
                  )}월 ${data?.data.modifiedAt.slice(8, 10)}일`}
                </span>
              </S.NumberBox>
            </S.SubTitle>
          </S.TitleContainer>
          <S.MainText>{data?.data.content}</S.MainText>
          <S.SharedLine />
          <S.LinkTextBox>
            <div>
              <S.LinkTitle>관련 링크 보기</S.LinkTitle>
            </div>
            <S.LinkWrapper>
              {data?.data.links.map((link) => (
                <Link href={link} passHref legacyBehavior>
                  <a target='_blank' rel='noopener noreferrer'>
                    {link}
                  </a>
                </Link>
              ))}
            </S.LinkWrapper>
          </S.LinkTextBox>
          <S.ButtonWrapper>
            <S.ButtonContainer>
              {tokenManager.authority === 'ROLE_ADMIN' ||
                tokenManager.authority === 'ROLE_COMPANY_INSTRUCTOR' ||
                tokenManager.authority === 'ROLE_PROFESSOR' ||
                (tokenManager.authority === 'ROLE_GOVERNMENT' && (
                  <S.DeletePostButton
                    onClick={() =>
                      openModal(
                        <AppropriationModal
                          isApprove={false}
                          question='게시글을 삭제하시겠습니까?'
                          purpose='삭제하기'
                          title={data?.data.title as ''}
                          onAppropriation={() => mutate()}
                        />
                      )
                    }
                  >
                    삭제하기
                  </S.DeletePostButton>
                ))}
              <S.ModifyPostButton
                onClick={() => push(`/main/post/${postId}/modify`)}
              >
                수정하기
              </S.ModifyPostButton>
            </S.ButtonContainer>
          </S.ButtonWrapper>
        </S.Document>
      </S.DocumentWrapper>
    </div>
  )
}

export default PostDetailPage

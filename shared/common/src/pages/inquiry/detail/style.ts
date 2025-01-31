import styled from '@emotion/styled'

export const TitleContainer = styled.div`
  margin-top: 2rem;
`

export const SubTitle = styled.div`
  padding: 0.5rem 0;
  display: flex;
  span {
    ${({ theme }) => theme.typo.text_md.regular};
    color: ${({ theme }) => theme.color.gray['400']};
  }
`

export const ApproveStatus = styled.div<{ approveColor: boolean }>`
  background-color: ${({ theme, approveColor }) =>
    approveColor ? theme.color.blue['800'] : theme.color.red['800']};
  color: ${({ theme, approveColor }) =>
    approveColor ? theme.color.main : theme.color.error};
  ${({ theme }) => theme.typo.text_md.regular};
  text-align: center;
  padding: 0.5rem 1rem;
  border-radius: 1.125rem;
  margin-right: 2.5rem;
`

export const SemiTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2.5rem;
`

export const SubTitleBox = styled.div`
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.gray['700']};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
`

export const Title = styled.span`
  ${({ theme }) => theme.typo.title_md.semibold};
  color: ${({ theme }) => theme.color.black};
`

export const MainText = styled.div`
  color: ${({ theme }) => theme.color.gray['400']};
  ${({ theme }) => theme.typo.text_sm.regular};
  line-height: 1.625rem;
  margin-top: 2.25rem;
`

export const AnswerBox = styled.div<{ displayType: boolean }>`
  margin-top: 3rem;
  display: ${({ displayType }) => (displayType ? 'block' : 'none')};
`

export const AnswerTitleBox = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 1rem;
  }
`

export const AnswerTitle = styled.span`
  color: ${({ theme }) => theme.color.black};
  ${({ theme }) => theme.typo.title_sm.medium};
`

export const AnswerDate = styled.span`
  color: ${({ theme }) => theme.color.gray['400']};
  ${({ theme }) => theme.typo.text_md.regular};
`

export const AnswerText = styled.div`
  color: ${({ theme }) => theme.color.gray['400']};
  ${({ theme }) => theme.typo.text_md.regular};
  line-height: 1.625rem;
  margin-top: 1rem;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  bottom: 1.6rem;
  position: fixed;

  div {
    color: ${({ theme }) => theme.color.white};
    ${({ theme }) => theme.typo.text_lg.semibold};
    border-radius: 0.5rem;
    cursor: pointer;
    width: 11.25rem;
    height: 3.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const DeleteInquiryButton = styled.div`
  background-color: ${({ theme }) => theme.color.error};
  margin-right: 1rem;
`

export const AnswerInquiryButton = styled.div`
  background-color: ${({ theme }) => theme.color.main};
`

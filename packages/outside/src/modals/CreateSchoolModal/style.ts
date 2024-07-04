import styled from '@emotion/styled'

export const CreateSchoolModalWrapper = styled.div`
  min-height: 57.375rem;
  max-height: 66.75rem;
  height: auto;
  width: 47rem;
  background-color: ${({ theme }) => theme.color.white};
  overflow: auto;
`

export const CreateSchoolModalContainer = styled.div`
  padding: 1.5rem;
  flex-direction: column;
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.5625rem;
  height: 1.875rem;
  align-items: center;
  position: fixed;
  background-color: ${({ theme }) => theme.color.white};
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32rem;
  width: 100%;
  justify-content: space-between;
`

export const CancelIcon = styled.div`
  cursor: pointer;
`

export const Title = styled.span`
  color: ${({ theme }) => theme.color.black};
  ${({ theme }) => theme.typo.title_sm.semibold};
`
export const SelectWrapper = styled.div`
  margin-top: 4.375rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const SchoolContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Content = styled.span`
  ${({ theme }) => theme.typo.text_lg.semibold};
  color: ${({ theme }) => theme.color.black};
`

export const SchoolNameInput = styled.input`
  text-indent: 1.25rem;
  height: 3.375rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.gray['700']};
  outline: none;
`

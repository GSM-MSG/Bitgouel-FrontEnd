import styled from '@emotion/styled'

export const UserSearchContainer = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  height: 3.375rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.75rem;
`

export const UserSearchBox = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.0625rem solid ${({ theme }) => theme.color.gray['700']};
  padding: 1.0625rem 1.25rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.color.gray['400']};
`

export const UserSearchInput = styled.input`
  width: 64.25rem;
  border: none;
  outline: none;
`

export const UserSearchFilterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

export const UserSearchFilter = styled.div`
  width: 5.75rem;
  height: 3.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.0625rem solid ${({ theme }) => theme.color.gray['400']};
  border-radius: 0.5rem;
  ${({ theme }) => theme.typo.text_md.medium};
  color: ${({ theme }) => theme.color.gray['400']};
  fill: ${({ theme }) => theme.color.gray['400']};
  cursor: pointer;
  svg {
    margin-right: 0.5rem;
  }
  &:hover {
    border: 0.0625rem solid ${({ theme }) => theme.color.main};
    color: ${({ theme }) => theme.color.main};
    fill: ${({ theme }) => theme.color.main};
  }
`

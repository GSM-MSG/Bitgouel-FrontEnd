import styled from '@emotion/styled'
import { LoginWrapper } from '../Login/style'
import { theme } from '../../styles/theme'

export const SignUpWrapper = styled(LoginWrapper)``

export const TitleItemWrapper = styled.div`
  padding: 1.5rem 0 0 1.5rem;
  display: flex;
  flex-direction: column;
`

export const TitleItem = styled.span`
  ${theme.typo.title_sm};
  letter-spacing: -2px;
`

export const SubTitleItem = styled.span`
  ${theme.typo.text_sm};
  color: ${theme.color.gray[400]};
  margin-top: 0.3rem;
  margin-bottom: 1rem;
`

export const ShowPageCurrentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-right: 1.8rem;
  div {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }
`

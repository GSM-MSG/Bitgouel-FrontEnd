import Image from 'next/image'
import Simbol from '../../assets/png/simbol.png'
import * as S from './style'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const menuList = ['사업소개', '강의', '동아리', '게시글']
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <Image width={38} height={38} src={Simbol} alt='header simbol'></Image>
        <S.MenuWrapper>
          {menuList.map((menu, idx) => (
            <span key={idx}>{menu}</span>
          ))}
        </S.MenuWrapper>
        <S.LoginButton onClick={() => router.push('/auth/login')}>
          <span>로그인</span>
        </S.LoginButton>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}
export default Header

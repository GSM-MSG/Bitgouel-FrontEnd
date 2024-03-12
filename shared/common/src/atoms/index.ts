import { LectureSessionEnum, LectureTypeEnum } from '@bitgouel/types'
import { ReactNode } from 'react'
import { atom } from 'recoil'

export const Page = atom<number>({
  key: 'Page',
  default: 1,
})

export const IsModal = atom<ReactNode>({
  key: 'IsModal',
  default: null,
})

export const Page1Obj = atom<
  { value: string; placeholder: string; type: string }[]
>({
  key: 'Page1Obj',
  default: [
    { value: '', placeholder: '소속', type: 'text' },
    { value: '', placeholder: '직업', type: 'text' },
  ],
})

export const Page2Obj = atom({
  key: 'Page2Obj',
  default: [
    { value: '', placeholder: '학교 이름 선택', type: 'text' },
    { value: '', placeholder: '동아리 이름 선택', type: 'text' },
    { value: '', placeholder: '이름 입력', type: 'text', maxLength: 6 },
  ],
})

export const Page3Obj = atom({
  key: 'Page3Obj',
  default: [
    {
      value: '',
      placeholder: '전화번호 (- 제외)',
      type: 'number',
      maxLength: 11,
    },
    { value: '', placeholder: '이메일', type: 'email' },
    {
      value: '',
      placeholder: '비밀번호 (8~24자 이내의 영문 / 숫자, 특수문자 1개 이상)',
      type: 'password',
    },
    { value: '', placeholder: '비밀번호 확인', type: 'password' },
  ],
})

export const PhoneCertificate = atom<boolean>({
  key: 'PhoneCertificate',
  default: false,
})

export const PhoneCertificateText = atom<string>({
  key: 'PhoneCertificateText',
  default: '인증',
})

export const EmailCertificate = atom<boolean>({
  key: 'EmailCertificate',
  default: false,
})

export const EmailCertificateText = atom<string>({
  key: 'EmailCertificateText',
  default: '인증',
})

export const IsPasswordRgx = atom<boolean>({
  key: 'IsPasswordRgx',
  default: true,
})

export const IsValidate = atom<boolean>({
  key: 'IsValidate',
  default: true,
})

export const LectureTypeText = atom<string>({
  key: 'LectureTypeText',
  default: '상호학점인정교육과정',
})

export const LectureType = atom<LectureTypeEnum>({
  key: 'LectureType',
  default: 'MUTUAL_CREDIT_RECOGNITION_PROGRAM',
})

export const LectureSession = atom<LectureSessionEnum>({
  key: 'LectureSession',
  default: '1학년 2학기',
})

export const LectureStartDate = atom<number[]>({
  key: 'LectureStartDate',
  default: [0, 0, 0],
})
export const LectureEndDate = atom<number[]>({
  key: 'LectureEndDate',
  default: [0, 0, 0],
})
export const LectureStartTime = atom<number[]>({
  key: 'LectureStartTime',
  default: [0, 0],
})
export const LectureEndTime = atom<number[]>({
  key: 'LectureEndTime',
  default: [0, 0],
})
export const LectureProfessor = atom<string>({
  key: 'LectureProfessor',
  default: '',
})
export const SchoolFilterText = atom<string>({
  key: 'SchoolFilterText',
  default: '',
})
export const LectureMax = atom<string>({
  key: 'LectureMax',
  default: '',
})

export const EmailErrorText = atom<string>({
  key: 'EmailErrorText',
  default: '',
})

export const PasswordErrorText = atom<string>({
  key: 'PasswordErrorText',
  default: '',
})

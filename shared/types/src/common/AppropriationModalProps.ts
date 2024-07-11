export type questionTypes =
  | '수강 신청하시겠습니까?'
  | '강의를 개설하시겠습니까?'
  | '강의를 수정하시겠습니까?'
  | '자격증 정보를 수정하시겠습니까?'
  | '자격증 정보를 추가하시겠습니까?'
  | '활동을 삭제하시겠습니까?'
  | '활동을 추가하시겠습니까?'
  | '활동 추가를 거부하시겠습니까?'
  | '활동 추가를 승인하시겠습니까?'
  | '공지사항을 추가하시겠습니까?'
  | '공지사항을 수정하시겠습니까?'
  | '공지사항을 삭제하시겠습니까?'
  | '게시글을 추가하시겠습니까?'
  | '게시글을 삭제하시겠습니까?'
  | '게시글을 수정하시겠습니까?'
  | '문의하시겠습니까?'
  | '문의를 수정하시겠습니까?'
  | '문의를 삭제하시겠습니까?'
  | '문의를 답변하시겠습니까?'
  | '가입을 수락하시겠습니까?'
  | '가입을 거부하시겠습니까?'
  | '탈퇴를 승인하시겠습니까?'
  | '활동을 수정하시겠습니까?'
  | '로그아웃을 하시겠습니까?'
  | '회원탈퇴를 하시겠습니까?'
  | '강의를 삭제하시겠습니까?'
  | '대학을 수정하시겠습니까?'

export type purposeTypes =
  | '신청하기'
  | '추가하기'
  | '수정하기'
  | '승인하기'
  | '거부하기'
  | '삭제하기'
  | '문의하기'
  | '수락하기'
  | '개설하기'
  | '답변하기'
  | '로그아웃'
  | '탈퇴하기'

export interface CallbacksType {
  onSuccess: (data?: any) => any
  onError: (error: any) => any
}
export interface AppropriationModalProps {
  isApprove: boolean
  question: questionTypes
  title: string
  purpose: purposeTypes
  onAppropriation: (callbacks: CallbacksType) => void
}

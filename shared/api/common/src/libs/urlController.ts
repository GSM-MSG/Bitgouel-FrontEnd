import { LectureListOptionsTypes } from '../types'

export const authUrl = {
  auth: () => `/auth`,
  login: () => `/auth/login`,
  withdraw: () => `/auth/withdraw`,
  signUpStudent: () => `/auth/student`,
  signUpTeacher: () => `/auth/teacher`,
  signUpBbozzak: () => `/auth/bbozzak`,
  signUpPropessor: () => `/auth/professor`,
  signUpGovernment: () => `/auth/government`,
  signUpCompanyInstructor: () => `/auth/company-instructor`,
} as const

export const lectureUrl = {
  lecture: () => `/lecture`,
  lectureList: (options: LectureListOptionsTypes) =>
    `/lecture?page=${options.page}&size=${options.size}&status=${options.status}&type=${options.type}`,
  lectureDetail: (id: string) => `/lecture/${id}`,
  lectureApplication: (id: string) => `/lecture/${id}`,
  lectureApprove: (id: string) => `lecture/${id}/approve`,
  lectureReject: (id: string) => `lectre/${id}/reject`,
} as const

export const activityUrl = {
  activityInformation: () => `/activity`,
  activityCorrection: (activity_id: string) => `/activity/${activity_id}`,
  activityApprove: (activity_id: string) => `/activity/${activity_id}/approve`,
  activityReject: (activity_id: string) => `/activity/${activity_id}/reject`,
  activityInformationRemove: (activity_id: string) =>
    `/activity/${activity_id}`,
  activityMyselfList: () => `/activity/my`,
  activityList: (student_id: string) => `/activity/${student_id}`,
  activityInformationList: () => `/activity`,
  activityInformationDetail: (activity_id: string) =>
    `/activity/${activity_id}`,
}

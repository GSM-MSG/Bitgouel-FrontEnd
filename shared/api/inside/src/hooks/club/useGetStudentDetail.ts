import { clubQueryKeys, clubUrl, get } from '../../../../common'
import { MyClubResponseTypes } from '@bitgouel/types'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export const useGetStudentDetail = (
  club_id: string,
  student_id: string,
  options?: UseQueryOptions<AxiosResponse>
) =>
  useQuery<AxiosResponse<MyClubResponseTypes>, AxiosError<ApiError>>(
    clubQueryKeys.getStudentDetail(),
    () => get(clubUrl.studentDetail(club_id, student_id)),
    options
  )

import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { get, lectureQueryKeys, lectureUrl } from '../../libs'
import { DivisionsResponseTypes } from '@bitgouel/types'

export const useGetDivisions = (
  keyword: string,
  options?: UseQueryOptions<DivisionsResponseTypes>
) =>
  useQuery<DivisionsResponseTypes, AxiosError>(
    lectureQueryKeys.getDivisions(),
    () => get(lectureUrl.lectureDivision(keyword)),
    options
  )

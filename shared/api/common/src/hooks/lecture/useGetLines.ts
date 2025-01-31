import { get, lectureQueryKeys, lectureUrl } from '@bitgouel/api'
import { LinePayloadTypes, LineResponseTypes } from '@bitgouel/types'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useGetLines = (
  queryString: LinePayloadTypes,
  options?: UseQueryOptions<LineResponseTypes>
) =>
  useQuery<LineResponseTypes, AxiosError>(
    lectureQueryKeys.getLines(),
    () => get(lectureUrl.lectureLine(queryString)),
    options
  )

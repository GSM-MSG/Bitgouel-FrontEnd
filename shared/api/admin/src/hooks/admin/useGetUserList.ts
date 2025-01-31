import { adminQueryKeys, adminUrl, get } from '@bitgouel/api'
import { UserListOptionsTypes, UserListResponseTypes } from '@bitgouel/types'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

export const useGetUserList = (
  queryString: UserListOptionsTypes,
  options?: UseQueryOptions<UserListResponseTypes>
) =>
  useQuery<UserListResponseTypes, AxiosError>(
    adminQueryKeys.getUserList(),
    () => get(adminUrl.userList(queryString)),
    options
  )

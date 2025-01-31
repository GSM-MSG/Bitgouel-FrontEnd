'use client'

import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRecoilValue } from 'recoil'
import { IsModal } from '../atoms'
import { theme } from '../styles/theme'

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const isModal = useRecoilValue(IsModal)
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
        {isModal && <>{isModal}</>}
      </QueryClientProvider>
      <ToastContainer position='top-right' theme='light' autoClose={2000} />
    </ThemeProvider>
  )
}

export default GlobalLayout

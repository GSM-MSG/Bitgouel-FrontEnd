import type { Metadata } from 'next'
import { RecoilRoot } from 'recoil'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <html>
        <body>{children}</body>
      </html>
    </RecoilRoot>
  )
}

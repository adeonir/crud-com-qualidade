import type { ReactNode } from 'react'

import StyledJsxRegistry from './registry'

export const metadata = {
  title: 'Todo List',
  description: 'Projeto criado durante o curso CRUD com Qualidade, do Mario Souto',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  )
}

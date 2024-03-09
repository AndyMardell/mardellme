'use client'

import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from '@/styles/registry'
import { theme } from '@/styles/theme'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  )
}

'use client'

import { ThemeProvider } from 'styled-components'
import StyledComponentsRegistry from '@/styles/registry'
import { theme } from '@/styles/theme'

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  )
}

export default Providers

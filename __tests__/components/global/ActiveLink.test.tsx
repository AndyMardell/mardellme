import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ActiveLink from '@/components/global/ActiveLink'
import '@testing-library/jest-dom'

describe('ActiveLink', () => {
  it('renders correctly', () => {
    render(<ActiveLink href="/">Home</ActiveLink>)

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('adds active class if the link as currently active', () => {
    render(
      <ActiveLink
        href="/"
        active
      >
        Home
      </ActiveLink>
    )

    expect(screen.getByText('Home')).toHaveClass('active')
  })
})

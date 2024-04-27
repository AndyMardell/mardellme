import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Nav from '@/components/global/Nav'
import '@testing-library/jest-dom'

describe('Nav', () => {
  it('renders correctly', () => {
    render(
      <Nav
        links={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' }
        ]}
      />
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders a link with relopener noreferrer if external', () => {
    render(
      <Nav
        links={[
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about' },
          { name: 'GitHub', url: 'https://github.com', internal: false }
        ]}
      />
    )

    const githubLink = screen.getByText('GitHub')

    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

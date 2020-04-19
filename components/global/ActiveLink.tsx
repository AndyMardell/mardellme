import { withRouter } from 'next/router'
import { MouseEvent } from 'react'

const ActiveLink = ({ router, href, children }: any) => {
  ;(function prefetchPages() {
    if (typeof window !== 'undefined') {
      router.prefetch(router.pathname)
    }
  })()

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    router.push(href)
  }

  const isCurrentPath = router.pathname === href || router.asPath === href

  return (
    <a
      href={href}
      onClick={handleClick}
      className={isCurrentPath ? 'active' : undefined}
    >
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)

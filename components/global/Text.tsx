import { FunctionComponent } from 'react'

interface Props {
  maxWidth?: number
}

const Text: FunctionComponent<Props> = ({ maxWidth, children }) => {
  return (
    <div
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : 'auto',
      }}
    >
      {children}
    </div>
  )
}

export default Text

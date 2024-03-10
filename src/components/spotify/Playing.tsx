import styled from 'styled-components'

export default function Playing() {
  return (
    <Music>
      <Line className="line1" />
      <Line className="line2" />
      <Line className="line3" />
      <Line className="line4" />
    </Music>
  )
}

const Music = styled.div`
  position: relative;
  width: 35px;
  height: 25px;
  margin-right: 1rem;
  margin-bottom: 3px;
`

const Line = styled.span`
  position: absolute;
  width: 4px;
  min-height: 5px;
  transition: 0.5s;
  animation: equalize 4s 0s infinite;
  animation-timing-function: linear;
  vertical-align: middle;
  bottom: 0 !important;
  @include box-shadow;

  &.line1 {
    left: 0%;
    bottom: 0px;
    animation-delay: -1.9s;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &.line2 {
    left: 25%;
    height: 20px;
    bottom: -15px;
    animation-delay: -2.9s;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &.line3 {
    left: 50%;
    height: 10px;
    bottom: -1.5px;
    animation-delay: -3.9s;
    background-color: ${({ theme }) => theme.colors.white};
  }

  &.line4 {
    left: 75%;
    height: 15px;
    bottom: -16px;
    animation-delay: -4.9s;
    background-color: ${({ theme }) => theme.colors.white};
  }

  @keyframes equalize {
    0% {
      height: 24px;
    }
    4% {
      height: 21px;
    }
    8% {
      height: 20px;
    }
    12% {
      height: 15px;
    }
    16% {
      height: 10px;
    }
    20% {
      height: 15px;
    }
    24% {
      height: 20px;
    }
    28% {
      height: 5px;
    }
    32% {
      height: 20px;
    }
    36% {
      height: 24px;
    }
    40% {
      height: 10px;
    }
    44% {
      height: 20px;
    }
    48% {
      height: 24px;
    }
    52% {
      height: 15px;
    }
    56% {
      height: 5px;
    }
    60% {
      height: 15px;
    }
    64% {
      height: 24px;
    }
    68% {
      height: 15px;
    }
    72% {
      height: 24px;
    }
    76% {
      height: 10px;
    }
    80% {
      height: 24px;
    }
    84% {
      height: 19px;
    }
    88% {
      height: 24px;
    }
    92% {
      height: 10px;
    }
    96% {
      height: 24px;
    }
    100% {
      height: 24px;
    }
  }
`

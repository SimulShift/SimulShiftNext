import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'
import {keyframes} from '@emotion/react'

const enterKeyframe = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`
const StyledButton = styled(Button)`
  background-color: #5933a8;
  &:hover {
    background-color: #7348cc;
  }
  && .MuiTouchRipple-child {
    background-color: black;
  }
  && .MuiTouchRipple-rippleVisible {
    opacity: 0.5;
    animation-name: ${enterKeyframe};
    animation-duration: 550ms;
    animation-timing-function: ${({theme}) =>
      theme.transitions.easing.easeInOut};
  }
`
export default StyledButton

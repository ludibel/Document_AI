// import emotion
import styled from '@emotion/styled'
//import mui
import { Avatar, Box, Grid, Typography } from '@mui/material'

interface StyledBoxProps {
  isbot: boolean
}

export const StyledBox = styled(Box)({
  '@media (min-width: 1024px)': {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

export const StyledGridContainer = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isbot',
})<StyledBoxProps>(({ isbot }) => ({
  paddingBottom: 20,
  backgroundColor: isbot ? '#F7F7F8' : '#fff',
  paddingLeft: '1em',
  borderTop: '1px solid #0000001a',
}))
export const StyledTypoListText = styled(Typography)({
  fontSize: '1.2em',
  '@media (min-width: 1024px)': {
    fontSize: '1.3em',
  },
})
export const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'isbot',
})<StyledBoxProps>(({ theme, isbot }) => ({
  backgroundColor: isbot
    ? theme.palette.primary.main
    : theme.palette.secondary.main,
  color: '#fff',
}))
